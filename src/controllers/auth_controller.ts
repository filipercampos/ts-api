import { Request, Response } from 'express';
import { BaseController } from '../core/base_controller';
import UserModel from '@models/user_model';
import { HttpStatusCode } from 'consts/httpStatusCode';
import { BcryptUtil } from 'utils/bcrypt_util';

export class AuthController extends BaseController {

    constructor() {
        super();
    }

    public async postAuth(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            let user = await UserModel.findOne({ email }).select('+password');
            if (user != null) {
                const compare = BcryptUtil.compare(password, user.password as string);
                if (compare) {
                    //cancel password
                    user.password = undefined;
                    return super.send(res, HttpStatusCode.ACCEPTED, user);
                } else {
                    return super.sendUnauthorized(res, 'Senha inválida');
                }
            } else {
                super.sendBadRequest(res, 'Email inválido');
            }

        } catch (error) {
            super.sendBadRequest(res, 'Email ou senha inválido');
        }
    }

}