import { ResponseHelper } from '../helpers/response_helper';
import { Request, Response } from 'express';

export abstract class BaseController {

    protected responseHelper: ResponseHelper = new ResponseHelper();

    public getIdRequest(req: Request): any {
        return req.params.id;
    }

    public getParamsRequest(req: Request): any {
        return req.params;
    }

    public getBodyRequest(req: Request): any {
        return req.body;
    }

    public getStatusResponse(res: Response): any {
        const map = {
            'message': res.statusMessage,
            'status': res.statusCode,
        };
        return map;
    }
}