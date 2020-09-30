import { Request, Response } from 'express';
export interface IController {

    getById(req: Request, res: Response): any;

    getAll(req: Request, res: Response): any;

    where(req: Request, res: Response): any;

    post(req: Request, res: Response): any;

    put(req: Request, res: Response): any;

    patch(req: Request, res: Response): any;

    delete(req: Request, res: Response): any;
}