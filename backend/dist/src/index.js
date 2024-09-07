"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = require("redis"); // v4以降のAPI
const example_1 = require("./routes/example");
const dotenv_1 = __importDefault(require("dotenv"));
const todo_1 = require("./routes/todo");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Redisクライアントの作成
const redisClient = (0, redis_1.createClient)({
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
});
redisClient.connect().catch(console.error);
redisClient.on('error', (err) => console.error('Redis Client Error', err));
// RedisStoreのインスタンスを作成 (newを使わない)
const redisStore = new ((0, connect_redis_1.default)(express_session_1.default))({
    client: redisClient,
});
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    store: redisStore, // RedisStoreのインスタンスを指定
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: 'lax' },
}));
// Routes
app.use('/api/todos', todo_1.todoRouter);
app.use('/api/example', example_1.exampleRouter);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
