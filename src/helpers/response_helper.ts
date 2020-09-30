import { Request, Response } from 'express';
import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from '@exceptions/base.exception';
import { IPagination } from 'core/ipagination';

/**
 * Response padrão: { data: any }
 */
export class ResponseHelper {


    public sendSuccess(response: Response, data: any): void {
        sender(response, HttpStatusCode.OK, data);
    }

    public sendCreated(response: Response, data: any): void {
        sender(response, HttpStatusCode.CREATED, data);
    }

    public sendNotFound(response: Response, data: any): void {
        sender(response, HttpStatusCode.NOT_FOUND, { data: data });
    }

    public sendNotContent(response: Response, data: any): void {
        sender(response, HttpStatusCode.NO_CONTENT, data);
    }

    public sendBadRequest(response: Response, data: any): void {
        sender(response, HttpStatusCode.BAD_REQUEST, data);
    }

    public senForbidden(response: Response, data: any): void {
        sender(response, HttpStatusCode.FORBIDDEN, data);
    }

    public sendMultipleChoices(response: Response, data: any): void {
        sender(response, HttpStatusCode.MULTIPLE_CHOICES, data);
    }

    public sendUnauthorized(response: Response, data: any): void {
        sender(response, HttpStatusCode.UNAUTHORIZED, data);
    }

    public sendUnprocessableEntit(response: Response, data: any): void {
        sender(response, HttpStatusCode.UNPROCESSABLE_ENTITY, data);

    }

    public sendServiceUnavailable(response: Response, data: any): void {
        sender(response, HttpStatusCode.SERVICE_UNAVAILABLE, data);
    }

    public sendError(response: Response, err: any, status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR): void {
        response.status(status).send(getDefaultResponse(err, status));
    }

    public sendMessage(response: Response, status: HttpStatusCode, message: string): void {
        response.status(status).send({
            data: {
                message: message
            }
        });
    }

    public sendException(response: Response, err: BaseException) {
        response.status(err.status).json(getDefaultResponse(err, err.status));
    }

    public send(response: Response, status: HttpStatusCode, data: any): void {
        response.status(status).send(data);
    }


    public pagination(data: any): void {

        data.offset = data.offset | 0;
        data.limit = data.limit | 0;
        data.total = data.total | 1;
        data.count = data.count | (Array.isArray(data) ? data.length : 1);
        data.results = data;
    }

    public isPagination(req: Request): IPagination {

        const params = {
            limit: parseInt(req.query.limit + '') || 0,
            offset: parseInt(req.query.offset + '') || 0
        }
        let p = params as IPagination;
        return p;
    }
}

/**
 * Entrega uma mensagem no formato json com a chave { data: any }
 * 
 * @param response Response
 * @param status HttpStatusCode
 * @param data data
 */
function sender(response: Response, status: HttpStatusCode, data: any): void {
    response.status(status).json(getDefaultResponse(data, status));
}

/**
 * Monta o response padrão
 * 
 * @param data dados a serem enviados em formato json
 */
function getDefaultResponse(data: any, status: HttpStatusCode): any {

    if (typeof data === 'string' || data instanceof String) {
        return {
            data: {
                code: status,
                status: HttpStatusCode[status],
                message: data,
            }
        };
    }
    else if (data.message) {
        return {
            data: {
                code: status,
                status: HttpStatusCode[status],
                message: data.message
            }
        }
    } else if (data instanceof BaseException) {
        const ex = (data as BaseException);
        return {
            data: {
                code: status,
                status: HttpStatusCode[status],
                message: ex.message
            }
        }
    } else {

        const resData = {
            data: {
                code: status,
                status: HttpStatusCode[status],
                offset: data.offset | 0,
                limit: data.limit | 20,
                total: data.total | 1,
                count: data.count | (Array.isArray(data) ? data.length : 1),
                results: data.message ? data.message : data
            }
        }

        return resData;

    }

}
