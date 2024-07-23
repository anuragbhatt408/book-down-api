import express from 'express';
import { createBook } from './bookController';
import multer from 'multer';
import path from 'node:path';

const router = express.Router();


const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/upload'),
    limits: { fileSize: 10485760 }  // 10mb
})

router.post('/', upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 }
]), createBook);

export default router;