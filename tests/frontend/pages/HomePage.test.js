import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../../src/pages/HomePage';

test('renders HomePage with welcome message', () => {
    const { getByText } = render(<HomePage />);

    expect(getByText('Welcome to Cooking Recipes')).toBeInTheDocument();
    expect(getByText('Discover and share amazing recipes!')).toBeInTheDocument();
});