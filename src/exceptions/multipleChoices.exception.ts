import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from './base.exception';

export class MultipleChoicesException extends BaseException {
    constructor(message: String) {
        super(message, HttpStatusCode.MULTIPLE_CHOICES);
    }
}