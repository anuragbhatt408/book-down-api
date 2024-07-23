import { NextFunction, Response, Request } from "express"
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {

    const files = req.files as { [fieldName: string]: Express.Multer.File[] }
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
        res.json({})

    } catch (error) {
        return next(createHttpError(500, 'Error While Uploading File'))
    }

}

export { createBook }

