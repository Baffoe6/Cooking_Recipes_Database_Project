const request = require('supertest');
const app = require('../../src/backend/app'); // Import your Express app

describe('Users API Endpoints', () => {
    // Test for retrieving all users
    it('should retrieve all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test for retrieving a specific user by ID
    it('should retrieve a user by ID', async () => {
        const userId = 1; // Replace with a valid user ID from your database
        const response = await request(app).get(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user_id', userId);
    });

    // Test for adding a new user
    it('should add a new user', async () => {
        const newUser = {
            username: 'test_user',
            email: 'test_user@example.com',
            password: 'securepassword123',
        };
        const response = await request(app).post('/api/users').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user_id');
    });

    // Test for updating a user
    it('should update an existing user', async () => {
        const userId = 1; // Replace with a valid user ID
        const updatedUser = {
            username: 'updated_user',
            email: 'updated_user@example.com',
        };
        const response = await request(app).put(`/api/users/${userId}`).send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User updated');
    });

    // Test for deleting a user
    it('should delete a user', async () => {
        const userId = 1; // Replace with a valid user ID
        const response = await request(app).delete(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted');
    });
});