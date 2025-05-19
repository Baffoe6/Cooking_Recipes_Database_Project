const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const Joi = require('joi');

// Validation schema for creating/updating ingredients
const ingredientSchema = Joi.object({
    ingredient_name: Joi.string().min(3).max(100).required(),
});

// Get all ingredients (with optional pagination, no authentication required)
router.get('/', async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 items per page
    const offset = (page - 1) * limit;

    try {
        const [rows] = await db.query('SELECT * FROM ingredients LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)]);
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Add a new ingredient (authentication and validation required)
router.post('/', auth, validate(ingredientSchema), async (req, res, next) => {
    try {
        const { ingredient_name } = req.body;
        const [result] = await db.query(
            'INSERT INTO ingredients (ingredient_name) VALUES (?)',
            [ingredient_name]
        );
        res.status(201).json({ ingredient_id: result.insertId });
    } catch (err) {
        next(err);
    }
});

// Update an ingredient (authentication and validation required)
router.put('/:id', auth, validate(ingredientSchema), async (req, res, next) => {
    try {
        const { ingredient_name } = req.body;
        const [result] = await db.query(
            'UPDATE ingredients SET ingredient_name = ? WHERE ingredient_id = ?',
            [ingredient_name, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json({ message: 'Ingredient updated successfully' });
    } catch (err) {
        next(err);
    }
});

// Delete an ingredient (authentication required)
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM ingredients WHERE ingredient_id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json({ message: 'Ingredient deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;