import TaskModel, { ITask } from "@models/task_model";
import { BaseRepository } from "domain/repositories/core/base_repository";
import { UserRepository } from "./user_repository";

export class TaskRepository extends BaseRepository<ITask>{

    constructor() {
        super(TaskModel);
        this.populateArray.push('user');
    }


    /**
     * Create a register
     * 
     * @param task ITask
     */
    async post(task: ITask): Promise<ITask> {
        const save = await super.post(task);

        const userRep = new UserRepository();
        const user = await userRep.findById(task.user);
        if (user != null) {
            user.tasks.push(save);
            await userRep.put(user.id, user);
        }
        return save;
    }

}