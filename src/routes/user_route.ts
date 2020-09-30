
import { BaseRoute } from "../core/base_route";
import { Router } from 'express';
import { UserController } from "../controllers/user_controller";

export class UserRoute extends BaseRoute {

    constructor() {
        super(new UserController());
    }

    public routes(router: Router): void {
        
        // User 
        router.route('/usuarios')
            .get(this.controller.getAll)
            // POST endpoint
            .post(this.controller.post);

        // User detail
        router.route('/usuarios/:id')
            // get specific users
            .get(this.controller.getById)
            .put(this.controller.put)
            .delete(this.controller.delete);
    }
}
