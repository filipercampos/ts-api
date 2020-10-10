import { NotFoundException } from "@exceptions/notFound_exception";
import TaskModel, { ITask } from "@models/task_model";
import { BaseRepository } from "domain/repositories/core/base_repository";
import { UserRepository } from "./user_repository";

export class TaskRepository extends BaseRepository<ITask>{

    constructor() {
        super(TaskModel);
        this.populate.push('user');
        this.populateById.push('user');
        //sort asc
        this.sorts = { name: -1 };
    }

    /**
     * Create a register
     * 
     * @param task ITask
     */
    async post(task: ITask): Promise<ITask> {

        const userRep = new UserRepository();
        const user = await userRep.findById(task.user);
        if (user != null) {
            const save = await super.post(task);
            user.tasks.push(save);
            await userRep.put(user.id, user);
            return save;
        } else {
            throw new NotFoundException(`User ${task.user} not found`)
        }
    }

    

}