const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { authorizeRole } = require('../middleware/auth');
const Joi = require('joi');

// Validation schema for creating/updating users
const userSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password_hash: Joi.string().min(6).required(),
});

// Get all users (with optional pagination, authentication required)
router.get('/', auth, authorizeRole('admin'), async (req, res, next) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// Get a specific user by ID (authentication required)
router.get('/:id', auth, async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// Create a new user (validation required)
router.post('/', validate(userSchema), async (req, res, next) => {
    try {
        const { username, email, password_hash } = req.body;
        const [result] = await db.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, password_hash]
        );
        res.status(201).json({ user_id: result.insertId });
    } catch (err) {
        next(err);
    }
});

// Update a user (authentication and validation required)
router.put('/:id', auth, validate(userSchema), async (req, res, next) => {
    try {
        const { username, email, password_hash } = req.body;
        const [result] = await db.query(
            'UPDATE users SET username = ?, email = ?, password_hash = ? WHERE user_id = ?',
            [username, email, password_hash, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        next(err);
    }
});

// Delete a user (authentication required)
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;