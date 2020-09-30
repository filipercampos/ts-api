import { Router } from "express";
import { AuthController } from '@controllers/auth_controller';

export class AuthRoute {

    public authController: AuthController = new AuthController();

    public routes(router: Router): void {
        // auth
        router.route('/authenticate').post(this.authController.postAuth);
    }
}
