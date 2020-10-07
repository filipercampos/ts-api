import { Router } from "express";
import { AuthController } from '@controllers/auth_controller';
import { BaseRoute } from "core/base_route";

export class AuthRoute extends BaseRoute {

    constructor() {
        super(new AuthController());
    }

    public routes(router: Router): void {

        // auth
        router.route('/authenticate').post((req, res) => this.controller.post(req, res));
    }
}
