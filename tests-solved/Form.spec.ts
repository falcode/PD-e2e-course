import { test, expect } from '@playwright/test';

const mockPreferences = {
  experienceLevels: [
    {
      id: 'beginner',
      label: 'Beginner',
      description: 'Welcome! We recommend starting with basic tutorials.',
      suggestedTopics: ['html', 'css', 'javascript'],
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      description: 'Great! You might enjoy building projects.',
      suggestedTopics: ['react', 'vue', 'angular'],
    },
    {
      id: 'advanced',
      label: 'Advanced',
      description: 'Awesome! You can contribute to open source or mentor others.',
      suggestedTopics: ['tdd', 'ddd', 'webgl'],
    },
  ],
  topics: [
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'javascript', label: 'Javascript' },
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
    { id: 'angular', label: 'Angular' },
    { id: 'tdd', label: 'Test-Driven Development' },
    { id: 'ddd', label: 'Domain-Driven Design' },
    { id: 'webgl', label: 'WebGL' },
  ],
};

test.describe('Loading state in User Preferences Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/preferences-options', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating slow internet
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockPreferences),
      });
    });

    await page.goto('/form');
  });

  test('should display loading indicator while fetching data', async ({ page }) => {
    await expect(page.getByTestId('loading')).toBeVisible();
    await expect(page.getByTestId('loading')).not.toBeVisible();
    await expect(page.getByLabel('Beginner')).toBeVisible();
  });
});

test.describe('User Preferences Form (extensive tests)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/preferences-options', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockPreferences),
      });
    });

    await page.goto('/form');
  });

  test('should display correct description and topics for each experience level', async ({ page }) => {
    for (const level of mockPreferences.experienceLevels) {
      await page.getByLabel(level.label).check();
      await expect(page.getByText(level.description)).toBeVisible();

      for (const topic of mockPreferences.topics) {
        if (level.suggestedTopics.includes(topic.id)) {
          await expect(page.getByLabel(topic.label)).toBeVisible();
        } else {
          await expect(page.getByLabel(topic.label)).not.toBeVisible();
        }
      }
    }
  });

  test('should allow toggling topic selection', async ({ page }) => {
    await page.getByLabel('Intermediate').check();

    const reactCheckbox = page.getByLabel('React');
    const vueCheckbox = page.getByLabel('Vue');
    const angularCheckbox = page.getByLabel('Angular');

    await reactCheckbox.check();
    await vueCheckbox.check();
    await expect(reactCheckbox).toBeChecked();
    await expect(vueCheckbox).toBeChecked();

    await reactCheckbox.uncheck();
    await expect(reactCheckbox).not.toBeChecked();
    await expect(vueCheckbox).toBeChecked();
    await expect(angularCheckbox).not.toBeChecked();
  });

  test('should submit the form and show success message for valid email', async ({ page }) => {
    await page.getByLabel('Advanced').check();
    await page.getByLabel('WebGL').check();

    const emailInput = page.getByPlaceholder('Email Address');
    await emailInput.fill('user@example.com');

    const submitButton = page.getByRole('button', { name: 'Submit' });
    await submitButton.click();

    await expect(page.getByText('Congratulations! you have been subscribed to our newsletter')).toBeVisible();
  });

  test('should show error message for invalid email', async ({ page }) => {
    await page.getByLabel('Beginner').check();
    await page.getByLabel('HTML').check();

    const emailInput = page.getByPlaceholder('Email Address');
    await emailInput.fill('invalid@email.com');

    const submitButton = page.getByRole('button', { name: 'Submit' });
    await submitButton.click();

    await expect(page.getByText('Error: Invalid email address')).toBeVisible();
  });

  test('should not display email field if no topics are selected', async ({ page }) => {
    await page.getByLabel('Beginner').check();

    await expect(page.getByPlaceholder('Email Address')).not.toBeVisible();

    await expect(page.getByRole('button', { name: 'Submit' })).not.toBeVisible();
  });
});

test.describe('Error handling in User Preferences Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/preferences-options', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('/form');
  });

  test('should display error message if fetch fails', async ({ page }) => {
    await expect(page.getByTestId('error')).toBeVisible();
    await expect(page.getByTestId('error')).toHaveText('Error at loading page, please click to reload');
  });
});