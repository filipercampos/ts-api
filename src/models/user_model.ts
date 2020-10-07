import { AppConsts } from "consts/app_consts";
import * as mongoose from "mongoose";
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
    }
});

//encrypted password before save
UserSchema.pre<IUser>('validate', async function (next) {

    console.log('validate');
    const self = this;
    let result = await UserModel.findOne({ email: this.email });
    if (result != null) {
        self.invalidate("email", "Email already exists");
        next(new Error("Email already exists"));
    } else {
        const pw = self.password?.toString() as string;
        const hash = BcryptUtil.hash(pw);
        self.password = hash;
        next();
    }

});

const UserModel = mongoose.model<IUser>(AppConsts.USERS_COLLECTION, UserSchema);

export default UserModel;
