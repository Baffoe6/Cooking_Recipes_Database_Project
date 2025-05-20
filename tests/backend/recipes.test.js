const request = require('supertest');
const app = require('../../src/backend/app'); // Import your Express app

describe('Recipes API Endpoints', () => {
    // Test for retrieving all recipes
    it('should retrieve all recipes', async () => {
        const response = await request(app).get('/api/recipes');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test for retrieving a specific recipe by ID
    it('should retrieve a recipe by ID', async () => {
        const recipeId = 1; // Replace with a valid recipe ID from your database
        const response = await request(app).get(`/api/recipes/${recipeId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('recipe_id', recipeId);
    });

    // Test for adding a new recipe
    it('should add a new recipe', async () => {
        const newRecipe = {
            recipe_name: 'Test Recipe',
            user_id: 1, // Replace with a valid user ID
            category_id: 1, // Replace with a valid category ID
            instructions: 'Test instructions',
        };
        const response = await request(app).post('/api/recipes').send(newRecipe);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('recipe_id');
    });

    // Test for updating a recipe
    it('should update an existing recipe', async () => {
        const recipeId = 1; // Replace with a valid recipe ID
        const updatedRecipe = {
            recipe_name: 'Updated Recipe',
            category_id: 2, // Replace with a valid category ID
            instructions: 'Updated instructions',
        };
        const response = await request(app).put(`/api/recipes/${recipeId}`).send(updatedRecipe);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Recipe updated');
    });

    // Test for deleting a recipe
    it('should delete a recipe', async () => {
        const recipeId = 1; // Replace with a valid recipe ID
        const response = await request(app).delete(`/api/recipes/${recipeId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Recipe deleted');
    });
});