import { BaseController } from 'core/base_controller';
import { TaskRepository } from 'domain/repositories/task_repository';

export class TaskController extends BaseController {

    constructor() {
        super(new TaskRepository());
    }
}