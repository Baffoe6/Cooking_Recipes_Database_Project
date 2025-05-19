import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getRecipes = () => axios.get(`${API_BASE_URL}/recipes`);
export const getIngredients = () => axios.get(`${API_BASE_URL}/ingredients`);
export const getCategories = () => axios.get(`${API_BASE_URL}/categories`);
export const getRatings = (recipeId) => axios.get(`${API_BASE_URL}/ratings/recipe/${recipeId}`);
export const addRecipe = (data) => axios.post(`${API_BASE_URL}/recipes`, data);
export const addIngredient = (data) => axios.post(`${API_BASE_URL}/ingredients`, data);
export const addCategory = (data) => axios.post(`${API_BASE_URL}/categories`, data);
export const addRating = (data) => axios.post(`${API_BASE_URL}/ratings`, data);