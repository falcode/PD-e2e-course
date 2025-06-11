import { render, screen, fireEvent } from '@testing-library/react';
import Form from "./Form.tsx";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Form', () => {
  it('renders the form title', () => {
    render(<Form />);
    expect(screen.getByText('User Preferences')).toBeInTheDocument();
  });

  it('shows dynamic message based on experience level', () => {
    render(<Form />);

    fireEvent.click(screen.getByLabelText('Beginner'));
    expect(screen.getByText(/basic tutorials/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Intermediate'));
    expect(screen.getByText(/building projects/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Advanced'));
    expect(screen.getByText(/open source/i)).toBeInTheDocument();
  });

  it('shows and hides topic options when newsletter is toggled', () => {
    render(<Form />);

    const newsletterCheckbox = screen.getByLabelText(/subscribe to newsletter/i);
    fireEvent.click(newsletterCheckbox);

    expect(screen.getByText(/Select the topics/i)).toBeInTheDocument();
    expect(screen.getByLabelText('React')).toBeInTheDocument();

    fireEvent.click(newsletterCheckbox);
    expect(screen.queryByText(/Select the topics/i)).not.toBeInTheDocument();
  });

  it('allows selecting multiple newsletter topics', () => {
    render(<Form />);
    fireEvent.click(screen.getByLabelText(/subscribe to newsletter/i));

    const react = screen.getByLabelText('React');
    const vue = screen.getByLabelText('Vue');
    const angular = screen.getByLabelText('Angular');

    fireEvent.click(react);
    fireEvent.click(vue);

    expect(react).toBeChecked();
    expect(vue).toBeChecked();
    expect(angular).not.toBeChecked();
  });
});
