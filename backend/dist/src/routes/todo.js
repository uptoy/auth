"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db"); // Use db from your Knex configuration
exports.todoRouter = (0, express_1.Router)();
// Fetch all todos
exports.todoRouter.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const todos = await (0, db_1.db)('todos').select();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});
// Create a new todo
exports.todoRouter.post('/', async (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ message: 'Task is required' });
    }
    try {
        await (0, db_1.db)('todos').insert({ task });
        res.status(201).json({ message: 'Todo created' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
});
