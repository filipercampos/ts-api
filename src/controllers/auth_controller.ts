import { BadRequestException } from '@exceptions/badRequest_exception';
import { UserRepository } from 'domain/repositories/user_repository';
import { Request, Response } from 'express';
import { Auth } from 'infrastructure/security/auth';
import { BaseController } from "../core/base_controller";
export class AuthController extends BaseController {

    private auth: Auth = new Auth();

    constructor() {
        super(new UserRepository());
    }

    public async post(req: Request, res: Response) {
        try {

            //desestruturação
            const { email, password } = req.body;

            if (!email || !password) {
                throw new BadRequestException('Email ou senha inválidos');
            }
            let rep = this.baseRepository as UserRepository;
            let user = await rep.authenticate(req.body);
            const token = new Auth().generateJwt({ id: user._id });
            super.sendJson(res, 200, { token: token });
        } catch (error) {
            super.sendError(res, error);
        }
    }
}