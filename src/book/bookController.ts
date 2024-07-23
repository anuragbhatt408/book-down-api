import { NextFunction, Response, Request } from "express"
import cloudinary from "../config/cloudinary";
import path from "node:path";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.files);

    const files = req.files as { [fieldName: string]: Express.Multer.File[] }

    const coverImageMimeType = files.coverImage[0].mimetype.split('/').at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(__dirname, '../../public/data/upload', fileName)
    const uploadedResult = await cloudinary.uploader.upload(filePath, {
        filename_override: fileName,
        folder: 'book-covers',
        format: coverImageMimeType,
    })
    console.log('uploadedResult', uploadedResult);
    res.json({})
}

export { createBook }

