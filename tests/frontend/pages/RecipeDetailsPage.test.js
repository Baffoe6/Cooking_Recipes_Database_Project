import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeDetailsPage from '../../../src/pages/RecipeDetailsPage';

// Mock the fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
                recipe_id: 1,
                recipe_name: 'Test Recipe',
                instructions: 'Test instructions for the recipe.',
                ingredients: [
                    { ingredient_name: 'Flour', quantity: 200, unit: 'grams' },
                    { ingredient_name: 'Eggs', quantity: 2, unit: 'pieces' },
                ],
            }),
    })
);

describe('RecipeDetailsPage', () => {
    it('renders recipe details correctly', async () => {
        render(
            <BrowserRouter>
                <RecipeDetailsPage />
            </BrowserRouter>
        );

        // Check for loading state
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // Wait for the recipe details to load
        await waitFor(() => {
            expect(screen.getByText('Test Recipe')).toBeInTheDocument();
            expect(screen.getByText('Test instructions for the recipe.')).toBeInTheDocument();
            expect(screen.getByText('Flour')).toBeInTheDocument();
            expect(screen.getByText('200 grams')).toBeInTheDocument();
            expect(screen.getByText('Eggs')).toBeInTheDocument();
            expect(screen.getByText('2 pieces')).toBeInTheDocument();
        });
    });

    it('handles API errors gracefully', async () => {
        // Mock fetch to return an error
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 404,
                json: () => Promise.resolve({ message: 'Recipe not found' }),
            })
        );

        render(
            <BrowserRouter>
                <RecipeDetailsPage />
            </BrowserRouter>
        );

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/error loading recipe/i)).toBeInTheDocument();
        });
    });
});