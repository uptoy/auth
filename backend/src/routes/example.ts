import { Router } from 'express';
import { db } from '../db'; // knexインスタンスをdbとしてインポート

export const exampleRouter = Router();

exampleRouter.get('/', async (req, res) => {
  try {
    const users = await db('users').select('*'); // knexではなくdbを使用
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});
