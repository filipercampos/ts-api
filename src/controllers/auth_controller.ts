import { BadRequestException } from '@exceptions/badRequest_exception';
import { UnauthorizedException } from '@exceptions/unauthorized_exception';
import { UsuarioRepository } from 'domain/repositories/usuario_repository';
import { Request, Response } from 'express';
import { BaseController } from "../core/base_controller";
export class AuthController extends BaseController {

    constructor() {
        super(new UsuarioRepository());
    }

    public async post(req: Request, res: Response) {
        try {

            //desestruturação
            const { email, password } = req.body;

            if (!email || !password) {
                throw new BadRequestException('Email ou senha inválidos');
            }
            let rep = this.baseRepository as UsuarioRepository;
            let user = await rep.authenticate(req.body);
            super.sendSuccess(res, user);
        } catch (error) {
            super.sendError(res, error);
        }
    }
}