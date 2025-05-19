const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const Joi = require('joi');

// Validation schema for creating/updating categories
const categorySchema = Joi.object({
    category_name: Joi.string().min(3).max(100).required(),
});

// Get all categories (with optional pagination, no authentication required)
router.get('/', async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await db.query('SELECT * FROM categories LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)]);
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Create a new category (authentication and validation required)
router.post('/', auth, validate(categorySchema), async (req, res, next) => {
    try {
        const { category_name } = req.body;
        const [result] = await db.query(
            'INSERT INTO categories (category_name) VALUES (?)',
            [category_name]
        );
        res.status(201).json({ category_id: result.insertId });
    } catch (err) {
        next(err);
    }
});

// Update a category (authentication and validation required)
router.put('/:id', auth, validate(categorySchema), async (req, res, next) => {
    try {
        const { category_name } = req.body;
        const [result] = await db.query(
            'UPDATE categories SET category_name = ? WHERE category_id = ?',
            [category_name, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category updated successfully' });
    } catch (err) {
        next(err);
    }
});

// Delete a category (authentication required)
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM categories WHERE category_id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;