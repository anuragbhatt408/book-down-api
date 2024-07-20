import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { config } from './config/config';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import userRouter from './user/userRouter';

const app = express();
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'hii from get' })
})

app.use('/api/users', userRouter);


// Global Error Handlers

app.use(globalErrorHandler)



export default app;