import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from './base_exception';

export class BadRequestException extends BaseException {

    constructor(message: string) {
        super(message, HttpStatusCode.BAD_REQUEST);
    }
}