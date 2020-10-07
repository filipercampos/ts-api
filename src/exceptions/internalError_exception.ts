import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from './base_exception';

export class InternalErrorException extends BaseException {
    constructor(message: String) {
        super(message, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}