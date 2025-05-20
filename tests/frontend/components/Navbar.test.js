import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../src/components/Navbar';

test('renders Navbar with links', () => {
    const { getByText } = render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Recipes')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Signup')).toBeInTheDocument();
});