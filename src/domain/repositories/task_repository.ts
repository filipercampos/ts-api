import TaskModel, { ITask } from "@models/task_model";
import { BaseRepository } from "domain/repositories/core/base_repository";

export class TaskRepository extends BaseRepository<ITask>{

    constructor() {
        super(TaskModel);
        this.populateArray.push('user');
    }
}