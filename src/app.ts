import express from 'express';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import userRouter from './user/userRouter';
import bookRouter from './book/bookRouter';

const app = express();
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'hii from get' })
})

app.use('/api/users', userRouter);

app.use('/api/books', bookRouter);


// Global Error Handlers

app.use(globalErrorHandler)



export default app;