import { AppConsts } from "consts/app_consts";
import * as mongoose from "mongoose";

export interface ITask extends mongoose.Document {
    name: string,
    description: string,
    start_date: Date,
    end_date: Date,
    created_date: Date,
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

const TaskModel = mongoose.model<ITask>(AppConsts.TASK_COLLECTION, TaskSchema);

export default TaskModel;
