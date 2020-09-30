import { IPagination } from "core/ipagination";
import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string | undefined,
    company: string
    phone: Number,
    created_date: Date,
}

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model<IUser>('Usuario', UserSchema);

export default UserModel;
