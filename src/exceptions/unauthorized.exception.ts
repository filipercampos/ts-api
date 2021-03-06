import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from './base.exception';

export class UnauthorizedException extends BaseException {
    constructor(message: String) {
        super(message, HttpStatusCode.UNAUTHORIZED);
    }
}