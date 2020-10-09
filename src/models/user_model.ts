import * as mongoose from "mongoose";
import _ from 'lodash';
import { BadRequestException } from "@exceptions/badRequest_exception";
import { AppConsts } from "consts/app_consts";
import { BcryptUtil } from "utils/bcrypt_util";

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    phone: string | null,
    password: string | undefined,
    created_date: Date,
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: AppConsts.TASK_COLLECTION
        }
    ]
});

//encrypted password before save
UserSchema.pre<IUser>('validate', async function (next) {

    const self = this;


    if (_.isNil(self.name)) {
        self.invalidate("name", "Name invalid");
        next(new BadRequestException("Name invalid"));
    }
    else if (_.isNil(self.password)) {
        self.invalidate("password", "Password invalid");
        next(new BadRequestException("Password invalid"));
    } else {
        let result = await UserModel.findOne({ email: this.email });
        if (result != null) {
            self.invalidate("email", "Email already exists");
            next(new Error("Email already exists"));
        } else {
            const pw = self.password as string;
            const hash = BcryptUtil.hash(pw);
            self.password = hash;
            next();
        }
    }
});

const UserModel = mongoose.model<IUser>(AppConsts.USER_COLLECTION, UserSchema);

export default UserModel;
