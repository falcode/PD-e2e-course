import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Login from './Login.tsx';

describe('Login Component', () => {
  it('renders the login form', () => {
    render(<Login />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows success message on correct credentials', () => {
    render(<Login />);

    // Fill in the form with correct credentials
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check for success message
    expect(screen.getByText(/login successful!/i)).toBeInTheDocument();
  });

  it('shows error message on incorrect credentials', () => {
    render(<Login />);

    // Fill in the form with incorrect credentials
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check for error message
    expect(screen.getByText(/incorrect credentials./i)).toBeInTheDocument();
  });

  it('resets status when input changes', () => {
    render(<Login />);

    // Fill in the form and submit
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Change input to reset status
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'new@example.com' } });

    // Check that success message is no longer visible
    expect(screen.queryByText(/login successful!/i)).not.toBeInTheDocument();
  });
});