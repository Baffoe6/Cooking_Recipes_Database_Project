import { getRecipes, getRecipeById } from '../../src/services/api';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ recipe_id: 1, recipe_name: 'Test Recipe' }]),
    })
);

test('fetches all recipes', async () => {
    const recipes = await getRecipes();
    expect(recipes).toEqual([{ recipe_id: 1, recipe_name: 'Test Recipe' }]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/recipes');
});

test('fetches a recipe by ID', async () => {
    const recipe = await getRecipeById(1);
    expect(recipe).toEqual([{ recipe_id: 1, recipe_name: 'Test Recipe' }]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/recipes/1');
});