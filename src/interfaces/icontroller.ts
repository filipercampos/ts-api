import { Request, Response } from 'express';
export interface IController {

    findById(req: Request, res: Response): any;

    find(req: Request, res: Response): any;

    post(req: Request, res: Response): any;

    put(req: Request, res: Response): any;

    patch(req: Request, res: Response): any;

    delete(req: Request, res: Response): any;
}