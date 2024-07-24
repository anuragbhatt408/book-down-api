import { NextFunction, Response, Request } from "express"
import cloudinary from "../config/cloudinary";
import path from "node:path";
import fs from 'node:fs';
import createHttpError from "http-errors";
import bookModal from "./bookModal";

const createBook = async (req: Request, res: Response, next: NextFunction) => {

    const files = req.files as { [fieldName: string]: Express.Multer.File[] }
    const { title, genre } = req.body;
    try {
        const coverImageMimeType = files.coverImage[0].mimetype.split('/').at(-1);
        const fileName = files.coverImage[0].filename;
        const filePath = path.resolve(__dirname, '../../public/data/upload', fileName)
        const uploadedResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: 'book-covers',
            format: coverImageMimeType,
        })

        const bookFileName = files.file[0].filename;
        const bookFilePath = path.resolve(__dirname, '../../public/data/upload', bookFileName)

        const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: 'raw',
            filename_override: bookFileName,
            folder: 'book-pdfs',
            format: 'pdf'
        });

        console.log('uploadedResult', uploadedResult);
        console.log('uploadedResult pdfs', bookFileUploadResult);

        let newBook;
        try {
            newBook = await bookModal.create({
                author: '669e8d2a6661f25985db6c16',
                title,
                genre,
                coverImage: uploadedResult.secure_url,
                file: bookFileUploadResult.secure_url,
            })
        } catch (error) {
            return next(createHttpError(502, 'Error While Saving The Data in DB'))
        }

        try {
            // DELETE temp files on the server
            await fs.promises.unlink(filePath);
            await fs.promises.unlink(bookFilePath);
        } catch (error) {
            return next(createHttpError(503, 'Error While Deleting the file from the server'))
        }
        res.status(201).json({ id: newBook._id })

    } catch (error) {
        return next(createHttpError(500, 'Error While Uploading File'))
    }

}

export { createBook }

