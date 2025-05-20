import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeCard from '../../src/components/RecipeCard';

test('renders RecipeCard with recipe details', () => {
    const recipe = {
        recipe_id: 1,
        recipe_name: 'Test Recipe',
        instructions: 'Test instructions for the recipe.',
    };

    const { getByText } = render(
        <BrowserRouter>
            <RecipeCard recipe={recipe} />
        </BrowserRouter>
    );

    expect(getByText('Test Recipe')).toBeInTheDocument();
    expect(getByText('Test instructions for the recipe.')).toBeInTheDocument();
    expect(getByText('View Details')).toBeInTheDocument();
});