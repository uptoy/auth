declare module 'express-session' {
  interface SessionData {
    user: string
  }
}
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// ユーザー認証用のミドルウェア
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['auth0_token'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Auth0 の公開鍵でトークンを検証
    const decoded = jwt.verify(token, process.env.AUTH0_SECRET as string);
    req.session.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
