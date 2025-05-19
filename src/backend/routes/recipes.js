const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { authorizeRole } = require('../middleware/auth');
const Joi = require('joi');

// Validation schema for creating/updating recipes
const recipeSchema = Joi.object({
    recipe_name: Joi.string().min(3).max(150).required(),
    user_id: Joi.number().integer().required(),
    category_id: Joi.number().integer().required(),
    instructions: Joi.string().min(10).required(),
});

// Get all recipes (no authentication required)
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM recipes');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get a specific recipe by ID (no authentication required)
router.get('/:id', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM recipes WHERE recipe_id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// Create a new recipe (authentication and validation required)
router.post('/', auth, validate(recipeSchema), async (req, res, next) => {
    try {
        const { recipe_name, user_id, category_id, instructions } = req.body;
        const [result] = await db.query(
            'INSERT INTO recipes (recipe_name, user_id, category_id, instructions) VALUES (?, ?, ?, ?)',
            [recipe_name, user_id, category_id, instructions]
        );
        res.status(201).json({ recipe_id: result.insertId });
    } catch (err) {
        next(err);
    }
});

// Update a recipe (authentication and validation required)
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { recipe_name, instructions } = req.body;
        const userId = req.user.id;

        // Check if the recipe belongs to the user
        const [recipe] = await db.query('SELECT * FROM recipes WHERE recipe_id = ? AND user_id = ?', [id, userId]);
        if (!recipe) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Update the recipe
        await db.query('UPDATE recipes SET recipe_name = ?, instructions = ? WHERE recipe_id = ?', [recipe_name, instructions, id]);
        res.status(200).json({ message: 'Recipe updated' });
    } catch (err) {
        next(err);
    }
});

// Delete a recipe (authentication and admin role required)
router.delete('/:id', auth, authorizeRole('admin'), async (req, res, next) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM recipes WHERE recipe_id = ?', [id]);
        res.status(200).json({ message: 'Recipe deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;