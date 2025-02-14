import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
import aiRoutes from './routes/ai.routes.js';
app.use('/ai', aiRoutes);

export default app;