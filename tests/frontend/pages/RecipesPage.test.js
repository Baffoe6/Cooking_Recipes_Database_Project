import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipesPage from '../../../src/pages/RecipesPage';

// Mock the fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve([
                { recipe_id: 1, recipe_name: 'Pancakes', instructions: 'Mix and cook.' },
                { recipe_id: 2, recipe_name: 'Spaghetti', instructions: 'Boil and serve.' },
            ]),
    })
);

describe('RecipesPage', () => {
    it('renders a list of recipes', async () => {
        render(
            <BrowserRouter>
                <RecipesPage />
            </BrowserRouter>
        );

        // Check for loading state
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // Wait for the recipes to load
        await waitFor(() => {
            expect(screen.getByText('Pancakes')).toBeInTheDocument();
            expect(screen.getByText('Mix and cook.')).toBeInTheDocument();
            expect(screen.getByText('Spaghetti')).toBeInTheDocument();
            expect(screen.getByText('Boil and serve.')).toBeInTheDocument();
        });
    });

    it('handles API errors gracefully', async () => {
        // Mock fetch to return an error
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                json: () => Promise.resolve({ message: 'Internal Server Error' }),
            })
        );

        render(
            <BrowserRouter>
                <RecipesPage />
            </BrowserRouter>
        );

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/error loading recipes/i)).toBeInTheDocument();
        });
    });
});