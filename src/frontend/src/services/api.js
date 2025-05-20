const API_BASE_URL = 'http://localhost:3000/api';

export const getRecipes = async () => {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }
    return response.json();
};

export const getRecipeById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch recipe');
    }
    return response.json();
};