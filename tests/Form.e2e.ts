import { test, expect } from '@playwright/test';

test.describe('User Preferences Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form');
  });

  test('should show correct message when experience level is selected', async ({ page }) => {
    await expect(page.getByText('User Preferences')).toBeVisible();

    await page.getByLabel('Beginner').check();
    await expect(page.getByText('We recommend starting with basic tutorials.')).toBeVisible();

    await page.getByLabel('Intermediate').check();
    await expect(page.getByText('You might enjoy building projects.')).toBeVisible();

    await page.getByLabel('Advanced').check();
    await expect(page.getByText('contribute to open source')).toBeVisible();
  });

  test('should toggle newsletter section and select topics', async ({ page }) => {
    const checkbox = page.getByLabel('Subscribe to newsletter');

    await checkbox.check();
    await expect(page.getByText('Select the topics you are interested in:')).toBeVisible();

    const reactCheckbox = page.getByLabel('React');
    const vueCheckbox = page.getByLabel('Vue');
    const angularCheckbox = page.getByLabel('Angular');

    await reactCheckbox.check();
    await vueCheckbox.check();
    await expect(reactCheckbox).toBeChecked();
    await expect(vueCheckbox).toBeChecked();
    await expect(angularCheckbox).not.toBeChecked();

    await checkbox.uncheck();
    await expect(page.getByText('Select the topics you are interested in:')).toHaveCount(0);
  });
});
