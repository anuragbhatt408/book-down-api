import mongoose from "mongoose";
import { IUser } from "./userTypes";


const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

}, { timestamps: true })

export default mongoose.model<IUser>('User', UserSchema);