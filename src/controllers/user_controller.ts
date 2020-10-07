import { BadRequestException } from '@exceptions/badRequest_exception';
import { IUser } from '@models/user_model';
import { BaseController } from 'core/base_controller';
import { UsuarioRepository } from 'domain/repositories/usuario_repository';
import { Request, Response } from 'express';

export class UserController extends BaseController {

    constructor() {
        super(new UsuarioRepository());
    }

    public async put(req: Request, res: Response) {
        try {

            const user: any = {
                name: req.body.name,
                phone: req.body.phone
            } as IUser;

            if (!this.reqHelper.isValid(user.name) || !this.reqHelper.isValid((user.phone))) {
                super.sendError(res, new BadRequestException('Name or phone invalid'));
            }
            else {
                const result = await this.baseRepository.put(req.params.id, user);
                super.sendUpdated(res, result);
            }
        } catch (error) {
            super.sendError(res, error);
        }
    }

    public async find(req: Request, res: Response) {
        try {
            const pagination = await super.getPagination(req);
            
            this.reqHelper.pushParam('name', req.query.name);
            this.reqHelper.pushParam('email', req.query.email);
            const params = this.reqHelper.toJsonLike();
            const result = await this.baseRepository.find(params, pagination);

            super.sendSuccess(res, result, pagination);

        } catch (error) {
            super.sendError(res, error);
        }
    }
}