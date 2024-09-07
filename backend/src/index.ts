declare module 'express-session' {
  interface SessionData {
    user: string
  }
}
import express from 'express';
import { exampleRouter } from './routes/example';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { todoRouter } from './routes/todo';
import { sessionMiddleware } from './sessionMiddleware';
// import { authMiddleware } from './authMiddleware';
import { db } from './db';


dotenv.config();
const app = express();
app.use(express.json());
app.use(sessionMiddleware);
// ミドルウェアでトークンを確認
app.use((req, res, next) => {
  const token = req.cookies['auth0_token']; // クライアントサイドから送信されたトークンを取得

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.AUTH0_SECRET as string);
      req.session.user = decoded; // ユーザー情報をセッションに保存
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
  next();
});
// Routes
app.use('/api/todos', todoRouter);
app.use('/api/example', exampleRouter);
app.get('/protected', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ message: `Welcome ${req.session.user.name}` });
});
app.get('/users', async (req, res) => {
  const users = await db('users').select('*');
  res.json(users);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
