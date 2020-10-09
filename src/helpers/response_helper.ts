import { Request, Response } from 'express';
import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from '@exceptions/base_exception';
import { Document, Model } from "mongoose";
import { IPagination } from 'interfaces/ipagination';

/**
 * Response padrão:
 * { 
 *     data: {
 *           code: 200,
 *           status: "OK",
 *      } 
 * }
 */
export class ResponseHelper {

    /**
     * Send data
     * 
     * @param response Response
     * @param status HttpStatusCode
     * @param data any
     */
    public send(response: Response, status: HttpStatusCode, data: any): void {
        response.status(status).send(data);
    }

    /**
     * Send json
     * @param response Response
     * @param status HttpStatusCode
     * @param data any
     */
    public sendJson(response: Response, status: HttpStatusCode, data: any): void {
        response.status(status).json(data);
    }

    /**
     * Send object status 200
     * @param response Response
     * @param data any
     */
    public sendSuccess(response: Response, data: any, pagination?: IPagination): void {
        sender(response, HttpStatusCode.OK, data, pagination);
    }

    /**
    * Send object status 201
    * @param response Response
    * @param data any
    */
    public sendCreated(response: Response, data: any): void {

        response.status(HttpStatusCode.CREATED).json({
            code: HttpStatusCode.CREATED,
            status: HttpStatusCode[HttpStatusCode.CREATED],
            data: { id: data }
        });
    }

    /**
    * Send object status 200
    * @param response Response
    * @param data any
    */
    public sendUpdated(response: Response, data: any): void {
        sender(response, HttpStatusCode.OK, data);
    }

    /**
    * Send object status 404
    * @param response Response
    * @param data any
    */
    public sendNotFound(response: Response, data: any): void {
        sender(response, HttpStatusCode.NOT_FOUND, data);
    }

    /**
    * Send object status 204
    * @param response Response
    * @param data any
    */
    public sendNotContent(response: Response, data: any): void {
        sender(response, HttpStatusCode.NO_CONTENT, data);
    }

    /**
    * Send object status 400
    * @param response Response
    * @param data any
    */
    public sendBadRequest(response: Response, data: any): void {
        sender(response, HttpStatusCode.BAD_REQUEST, data);
    }

    /**
    * Send object status 403
    * @param response Response
    * @param data any
    */
    public senForbidden(response: Response, data: any): void {
        sender(response, HttpStatusCode.FORBIDDEN, data);
    }

    /**
    * Send object status 300
    * @param response Response
    * @param data any
    */
    public sendMultipleChoices(response: Response, data: any): void {
        sender(response, HttpStatusCode.MULTIPLE_CHOICES, data);
    }

    /**
    * Send object status 401
    * @param response Response
    * @param data any
    */
    public sendUnauthorized(response: Response, data: any): void {
        sender(response, HttpStatusCode.UNAUTHORIZED, data);
    }

    /**
    * Send object status 422
    * @param response Response
    * @param data any
    */
    public sendUnprocessableEntit(response: Response, data: any): void {
        sender(response, HttpStatusCode.UNPROCESSABLE_ENTITY, data);

    }

    /**
    * Send object status 503
    * @param response Response
    * @param data any
    */
    public sendServiceUnavailable(response: Response, data: any): void {
        sender(response, HttpStatusCode.SERVICE_UNAVAILABLE, data);
    }

    /**
     * Send message or object
     * @param response Response
     * @param err any
     * @param status HttpStatusCode
     */
    public sendError(response: Response, err: any, status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR): void {
        response.status(status).send(getDefaultResponse(err, status));
    }

    /**
     * Send message 
     * @param response Response 
     * @param status HttpStatusCode
     * @param message String
     */
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

    /**
     * Seta e recupera a paginação se informada
     * @param req 
     * @param model 
     */
    protected async getPagination(req: Request, model: Model<Document, {}>): Promise<IPagination | undefined> {

        const count = await model.collection.countDocuments();
        let page = parseInt(req.query.page + '') || 1;
        let limit = parseInt(req.query.limit + '') || 0;
        let offset = 0;
        let total = 0;

        //validate limit
        if (limit > 0) {

            //total de paginas
            total = Math.ceil(count / limit) as number

            //validate  page
            if (page > count || page < 0) {
                page = 1;
            } else {
                //calc
                offset = limit * (page - 1);
            }

            const o = {
                page: page,
                limit: limit,
                offset: offset,
                count: count,
                total: total
            }
            //remove from req
            delete req.query.page;
            delete req.query.limit;
            let p = o as IPagination;
            return p;
        }
    }
}

/**
 * Entrega uma mensagem no formato json com a chave { data: any }
 * 
 * @param response Response
 * @param status HttpStatusCode
 * @param data data
 */
function sender(response: Response, status: HttpStatusCode, data: any, pagination: IPagination | undefined = undefined): void {
    response.status(status).json(getDefaultResponse(data, status, pagination));
}

/**
 * Monta o response padrão
 * 
 * @param data dados a serem enviados em formato json
 */
function getDefaultResponse(data: any, status: HttpStatusCode, pagination: IPagination | undefined = undefined): any {
    let res: any = {
        code: status,
        status: HttpStatusCode[status]
    }
    if (data == null) {
        res.data = data;
    }
    else if (typeof data === 'string' || data instanceof String) {
        res.data = { message: data };
    }
    else if (data instanceof BaseException) {
        const ex = (data as BaseException);
        res = {
            code: ex.status,
            status: ex.statusText,
            data: {
                message: ex.message
            }
        }
    }
    else if (data.message) {
        res.data = { message: data.message };
    }
    else if (pagination) {
        res.data = {
            page: pagination.page,
            total: pagination.total,
            limit: pagination.limit,
            count: pagination.count,
            results: data
        }
    } else if (Array.isArray(data)) {
        res.data = { results: data };
    }
    else if (typeof data === 'boolean') {
        res.data = data;
    }
    else {
        res.data = { results: [data] };
    }
    //always data
    return res;
}
