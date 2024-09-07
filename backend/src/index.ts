import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis'; // v4以降のAPI
import { exampleRouter } from './routes/example';
import dotenv from 'dotenv';
import { todoRouter } from './routes/todo';

dotenv.config();

const app = express();

// Redisクライアントの作成
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`,
});

redisClient.connect().catch(console.error);

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// RedisStoreのインスタンスを作成 (newを使わない)
const redisStore = new (RedisStore(session))({
  client: redisClient,
});

app.use(express.json());

app.use(
  session({
    store: redisStore, // RedisStoreのインスタンスを指定
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: 'lax' },
  })
);

// Routes
app.use('/api/todos', todoRouter);
app.use('/api/example', exampleRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
