import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from './base.exception';

export class UnprocessableEntityException extends BaseException {
    constructor(message: String) {
        super(message, HttpStatusCode.UNPROCESSABLE_ENTITY);
    }
}