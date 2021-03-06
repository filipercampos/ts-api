import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from './base.exception';

export class ForbiddenException extends BaseException {
    constructor(message: String) {
        super(message, HttpStatusCode.FORBIDDEN);
    }
}