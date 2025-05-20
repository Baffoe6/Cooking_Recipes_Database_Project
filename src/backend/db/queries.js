const db = require('./connection'); // Import the database connection

// Retrieve all recipes
const getAllRecipes = async () => {
    const query = `
        SELECT r.recipe_id, r.recipe_name, r.instructions, c.category_name, u.username
        FROM recipes r
        JOIN categories c ON r.category_id = c.category_id
        JOIN users u ON r.user_id = u.user_id
    `;
    const [rows] = await db.query(query);
    return rows;
};

// Retrieve a specific recipe by ID
const getRecipeById = async (recipeId) => {
    const query = `
        SELECT r.recipe_id, r.recipe_name, r.instructions, c.category_name, u.username
        FROM recipes r
        JOIN categories c ON r.category_id = c.category_id
        JOIN users u ON r.user_id = u.user_id
        WHERE r.recipe_id = ?
    `;
    const [rows] = await db.query(query, [recipeId]);
    return rows[0];
};

// Add a new recipe
const addRecipe = async (recipeName, userId, categoryId, instructions) => {
    const query = `
        INSERT INTO recipes (recipe_name, user_id, category_id, instructions)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [recipeName, userId, categoryId, instructions]);
    return result.insertId;
};

// Update an existing recipe
const updateRecipe = async (recipeId, recipeName, categoryId, instructions) => {
    const query = `
        UPDATE recipes
        SET recipe_name = ?, category_id = ?, instructions = ?
        WHERE recipe_id = ?
    `;
    const [result] = await db.query(query, [recipeName, categoryId, instructions, recipeId]);
    return result.affectedRows;
};

// Delete a recipe
const deleteRecipe = async (recipeId) => {
    const query = `
        DELETE FROM recipes
        WHERE recipe_id = ?
    `;
    const [result] = await db.query(query, [recipeId]);
    return result.affectedRows;
};

// Retrieve all categories
const getAllCategories = async () => {
    const query = `
        SELECT * FROM categories
    `;
    const [rows] = await db.query(query);
    return rows;
};

// Retrieve all ingredients for a specific recipe
const getIngredientsByRecipeId = async (recipeId) => {
    const query = `
        SELECT i.ingredient_name, ri.quantity, ri.unit
        FROM recipe_ingredients ri
        JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
        WHERE ri.recipe_id = ?
    `;
    const [rows] = await db.query(query, [recipeId]);
    return rows;
};

// Export all query functions
module.exports = {
    getAllRecipes,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getAllCategories,
    getIngredientsByRecipeId,
};