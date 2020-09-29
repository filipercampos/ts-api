import { Router } from "express";
import { LoginController } from '@controllers/login_controller';

export class LoginRoute {

    public loginController: LoginController = new LoginController();

    public routes(router: Router): void {
        // login
        router.route('/login').post(this.loginController.login);
    }
}
