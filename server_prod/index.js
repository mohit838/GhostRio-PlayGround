import bodyParser from "body-parser";
import express from "express";
import {BACKEND, PORT} from "./config/config.js";
import cors from 'cors';
import connect from "./db/db.js";
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import redis from 'redis';

// Common Configurations
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Set CORS headers
// Restrictions in accessing
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Request Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Redis Client
const redisClient = redis.createClient({
    host: BACKEND, // Redis server host
    port: 6379, // Redis server port
    password: 'nymp',
});
redisClient.on('error', (err) => {
    console.error('Redis Error:', err);
});

// Middleware to check and handle duplicate requests
function preventDuplicateRequests(req, res, next) {
    const requestIdentifier = generateRequestIdentifier(req);

    redisClient.get(requestIdentifier, (err, reply) => {
        if (err) {
            console.error('Redis Error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (reply) {
            return res.status(409).json({ message: 'Duplicate request detected!!' });
        }

        redisClient.set(requestIdentifier, '1', 'EX', 60, (err) => {
            if (err) {
                console.error('Redis Error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            next();
        });
    });
}

// Helper function to generate a request identifier
function generateRequestIdentifier(req) {
    // Construct a unique identifier based on request properties
    return `${req.method}:${req.originalUrl}:${JSON.stringify(req.body)}`;
}

// All possible routers
app.use('/api/auth', apiLimiter, preventDuplicateRequests, authRoutes);
app.use('/api', apiLimiter, preventDuplicateRequests, userRoutes);

// MongoDB and Server Setups
const SERVER_PORT = PORT || 7000;

// Connect DB first then start the server
connect().then(() => {
    redisClient.on('connect', () => {
        app.listen(SERVER_PORT, () => {
            console.log(`Nymphelia Server Running On Port: ${SERVER_PORT}`);
        });
    }).on('error', (err) => {
        console.error('Redis Connection Error:', err);
    });
}).catch((err) => {
    console.error('MongoDB Connection Error:', err);
});
