import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis'; // v4以降のAPI
import dotenv from 'dotenv';

dotenv.config();

// Redisクライアントの作成
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`,
});
const redisStore = new (RedisStore(session))({
  client: redisClient,
});


redisClient.connect().catch(console.error);

redisClient.on('error', (err) => console.error('Redis Client Error', err));
export const sessionMiddleware = session({
  store: redisStore, // RedisStoreのインスタンスを指定
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: false, sameSite: 'lax' },
  cookie: {
    // secure: process.env.NODE_ENV === 'production',
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1日
  }
})
