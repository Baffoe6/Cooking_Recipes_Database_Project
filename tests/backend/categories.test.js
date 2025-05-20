const request = require('supertest');
const app = require('../../src/backend/app'); // Import your Express app

describe('Categories API Endpoints', () => {
    // Test for retrieving all categories
    it('should retrieve all categories', async () => {
        const response = await request(app).get('/api/categories');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test for retrieving a specific category by ID
    it('should retrieve a category by ID', async () => {
        const categoryId = 1; // Replace with a valid category ID from your database
        const response = await request(app).get(`/api/categories/${categoryId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('category_id', categoryId);
    });

    // Test for adding a new category
    it('should add a new category', async () => {
        const newCategory = {
            category_name: 'Test Category',
        };
        const response = await request(app).post('/api/categories').send(newCategory);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('category_id');
    });

    // Test for updating a category
    it('should update an existing category', async () => {
        const categoryId = 1; // Replace with a valid category ID
        const updatedCategory = {
            category_name: 'Updated Category',
        };
        const response = await request(app).put(`/api/categories/${categoryId}`).send(updatedCategory);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Category updated');
    });

    // Test for deleting a category
    it('should delete a category', async () => {
        const categoryId = 1; // Replace with a valid category ID
        const response = await request(app).delete(`/api/categories/${categoryId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Category deleted');
    });
});