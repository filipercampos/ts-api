
import { BaseRoute } from "../core/base_route";
import { Router } from 'express';
import { TaskController } from "../controllers/task_controller";

export class TaskRoute extends BaseRoute {

    constructor() {
        super(new TaskController());
    }

    public routes(router: Router): void {

        // Task 
        router.route('/tasks')
            .get((req, res) => this.controller.find(req, res))
            // POST endpoint
            .post((req, res) => this.controller.post(req, res));

        // Task detail
        router.route('/tasks/:id')
            // get specific tasks
            .get((req, res) => this.controller.findById(req, res))
            .put((req, res) => this.controller.put(req, res))
            .delete((req, res) => this.controller.delete(req, res))
    }
}
