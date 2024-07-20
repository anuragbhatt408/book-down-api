import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { config } from './config/config';
import { globalErrorHandler } from './middlewares/globalErrorHandler';

const app = express();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'hii from get' })
})


// Global Error Handlers

app.use(globalErrorHandler)



export default app;