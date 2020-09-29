import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
    constructor(message: String) {
        super(message, HttpStatusCode.NOT_FOUND);
    }

}