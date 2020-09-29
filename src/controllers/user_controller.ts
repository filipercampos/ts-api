import { IController } from '../core/icontroller';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
 import UserModel from '../models/user_model';

export class UserController implements IController {

    public getById(req: Request, res: Response) {

        UserModel.findById(req.params.id, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getFirst(req: Request, res: Response) {
        UserModel.findOne({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.status(204).send(user);
        });
    }

    public getAll(req: Request, res: Response) {

        UserModel.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public post(req: Request, res: Response) {
        let newUser = new UserModel(req.body);

        newUser.save((err, user: mongoose.Document) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public put(req: Request, res: Response) {
        UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, user: any) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public patch(req: Request, res: Response) {
        UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public delete(req: Request, res: Response) {
        UserModel.remove({ _id: req.params.id }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted user!' });
        });
    }

    public where(req: Request, res: Response) {


    }
}