import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModal from "./userModal";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }
    const user = await userModal.findOne({ email });
    if (user) {
        const error = createHttpError(400, 'user already exists');
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModal.create({
        name,
        email,
        password: hashedPassword
    })

    const token = sign({ sub: newUser._id }, config.jwtSecret, { expiresIn: '24h' });

    res.json({ accessToken: token });
}

export { createUser };