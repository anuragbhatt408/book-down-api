import express from 'express';

const app = express();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'hii from get' })
})



export default app;