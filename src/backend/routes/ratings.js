const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const Joi = require('joi');

// Validation schema for creating/updating ratings
const ratingSchema = Joi.object({
    recipe_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    review: Joi.string().max(500).optional(),
});

// Get all ratings for a recipe (with optional pagination, no authentication required)
router.get('/recipe/:recipeId', async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await db.query(
            'SELECT * FROM ratings WHERE recipe_id = ? LIMIT ? OFFSET ?',
            [req.params.recipeId, parseInt(limit), parseInt(offset)]
        );
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Add a rating for a recipe (authentication and validation required)
router.post('/', auth, validate(ratingSchema), async (req, res, next) => {
    try {
        const { recipe_id, user_id, rating, review } = req.body;
        const [result] = await db.query(
            'INSERT INTO ratings (recipe_id, user_id, rating, review) VALUES (?, ?, ?, ?)',
            [recipe_id, user_id, rating, review]
        );
        res.status(201).json({ rating_id: result.insertId });
    } catch (err) {
        next(err);
    }
});

// Delete a rating (authentication required)
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM ratings WHERE rating_id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        res.json({ message: 'Rating deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;