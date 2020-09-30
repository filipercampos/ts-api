import { IController } from '../core/icontroller';
import { Request, Response } from 'express';
import UserModel, { IUser } from '@models/user_model';
import { BaseController } from 'core/base_controller';

export class UserController extends BaseController implements IController {

    constructor() {
        super();
    }

    public async getById(req: Request, res: Response) {

        try {
            const user = await UserModel.findById(req.params.id);
            super.sendSuccess(res, user);
        } catch (error) {
            super.sendError(res, error.message);
        }
    }

    public async getAll(req: Request, res: Response) {

        try {
            const pagination = super.isPagination(req);

            const result = await UserModel.find()
                .skip(pagination.offset)
                .limit(pagination.limit);

            super.pagination(result);
            super.sendSuccess(res, result);

        } catch (error) {
            super.sendError(res, error);
        }
    }

    public async post(req: Request, res: Response) {

        try {
            let newUser = new UserModel(req.body);
            const save = await newUser.save();
            console.log(save);
            super.sendCreated(res, save);
        } catch (error) {
            super.sendError(res, error);
        }
    }

    public async put(req: Request, res: Response) {

        try {
            const users = await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body);
            super.sendSuccess(res, users);
        } catch (error) {
            super.sendError(res, error);
        }
    }

    public async patch(req: Request, res: Response) {
        try {
            //TODO alterar senha
            const users = await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body);
            super.sendSuccess(res, users);
        } catch (error) {
            super.sendError(res, error);
        }
    }

    public async delete(req: Request, res: Response) {

        try {
            //TODO alterar senha
            const users = await UserModel.deleteOne({ _id: req.params.id });
            super.sendSuccess(res, users);
        } catch (error) {
            super.sendError(res, error);
        }
    }

    public where(req: Request, res: Response) {
        //TODO
    }
}