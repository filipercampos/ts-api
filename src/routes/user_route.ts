
import { BaseRoute } from "../core/base_route";
import { Router } from 'express';
import { UserController } from "../controllers/user_controller";

export class UserRoute extends BaseRoute {

    constructor() {
        super(new UserController());
    }

    public routes(router: Router): void {

        // User 
        router.route('/users')
            .get((req, res) => this.controller.find(req, res))
            // POST endpoint
            .post((req, res) => this.controller.post(req, res));

        // User detail
        router.route('/users/:id')
            // get specific users
            .get((req, res) => this.controller.findById(req, res))
            .put((req, res) => this.controller.put(req, res))
            .delete((req, res) => this.controller.delete(req, res))
    }
}
