// frontend/__tests__/Header.test.js
import { render, screen } from '@testing-library/react';
import Header from '../app/components/Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders a heading', () => {
    render(<Header />);
    const heading = screen.getByRole('link', { name: /AI Toolify/i });
    expect(heading).toBeInTheDocument();
  });
});
