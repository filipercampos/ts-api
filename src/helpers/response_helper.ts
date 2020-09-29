import { HttpStatusCode } from '../consts/httpStatusCode';
import { Request, Response, NextFunction } from 'express';

/**
 * Response padrão e: { data: dynamic }
 */
export class ResponseHelper {

    static send(response: Response, status: HttpStatusCode, data: any,): void {
        response.send({ data: data, status: status | HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
    
    static sendSuccess(result: any, request: Request, response: Response): void {
        response.send({ data: result, status: HttpStatusCode.OK });
    }

    static sendError(err: any, status: HttpStatusCode, request: Request, response: Response): void {

        //TODO validate error
        response.send({ data: err, status: status | HttpStatusCode.INTERNAL_SERVER_ERROR });
    }

    
}
