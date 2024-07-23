import express from 'express';
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