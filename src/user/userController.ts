import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModal from "./userModal";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { IUser } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    try {
        const user = await userModal.findOne({ email });
        if (user) {
            const error = createHttpError(400, 'user already exists');
            return next(error);
        }
    } catch (error) {
        return next(createHttpError(500, "Error While Getting User"))
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser: IUser;
    try {
        newUser = await userModal.create({
            name,
            email,
            password: hashedPassword
        })
    } catch (error) {
        return next(createHttpError(500, "Error While Getting User"))
    }

    try {
        const token = sign({ sub: newUser._id }, config.jwtSecret, { expiresIn: '24h' });

        res.status(201).json({ accessToken: token });
    } catch (error) {
        return next(createHttpError(500, "Error While Creating Token"))
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }


    try {
        const user = await userModal.findOne({ email });
        if (!user) {
            return next(createHttpError(404, "User Not Found"))
        }

        const hashedPassword = user?.password;
        const isMatched = await bcrypt.compare(password, hashedPassword as string)

        console.log("isMatched", isMatched);
        if (!isMatched) {
            return next(createHttpError(400, "Wrong Password"))
        }

        try {
            const token = sign({ sub: user?._id }, config.jwtSecret, { expiresIn: '24h' });

            res.status(201).json({ accessToken: token });
        } catch (error) {
            return next(createHttpError(500, "Error While Creating Token"))
        }

        console.log("successfully logged in");
    } catch (error) {
        return next(createHttpError(500, "Error While Creating Token"))
    }

}

export { createUser, loginUser };