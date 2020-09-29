import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '../exceptions/badRequest.exception';

export class LoginController {

    public login(req: Request, res: Response) {

        //TODO auth with database
        res.json({ data: { message: 'Login successful' } });
    }

}