import { HttpStatusCode } from '../consts/httpStatusCode';
import { BaseException } from './base_exception';

export class ConflitctException extends BaseException {

    constructor(message: string) {
        super(message, HttpStatusCode.CONFLICT);
    }
}