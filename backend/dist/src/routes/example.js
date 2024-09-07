"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db"); // knexインスタンスをdbとしてインポート
exports.exampleRouter = (0, express_1.Router)();
exports.exampleRouter.get('/', async (req, res) => {
    try {
        const users = await (0, db_1.db)('users').select('*'); // knexではなくdbを使用
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
