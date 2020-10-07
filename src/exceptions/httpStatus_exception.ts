import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from './base_exception';

export class HttpStatusException extends BaseException {
    constructor(message: String, status:HttpStatusCode) {
        super(message, status);
    }
}