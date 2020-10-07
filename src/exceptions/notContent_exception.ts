import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from './base_exception';

export class NotContenException extends BaseException {
    constructor(message: String) {
        super(message, HttpStatusCode.NO_CONTENT);
    }
}