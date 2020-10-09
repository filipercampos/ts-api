import { BadRequestException } from "@exceptions/badRequest_exception";
import { AppConsts } from "consts/app_consts";
import * as mongoose from "mongoose";
import { IUser } from "./user_model";
import _ from 'lodash';

export interface ITask extends mongoose.Document {
    name: string,
    description: string,
    start_date: Date,
    end_date: Date,
    created_date: Date,
    user: IUser
}

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: AppConsts.USER_COLLECTION,
        required: true
    }
});

//encrypted password before save
TaskSchema.pre<ITask>('validate', async function (next) {

    const self = this;

    if (_.isNil(self.user)) {
        self.invalidate("user", "User invalid");
        next(new BadRequestException("User invalid"));
    } 
});

const TaskModel = mongoose.model<ITask>(AppConsts.TASK_COLLECTION, TaskSchema);

export default TaskModel;
