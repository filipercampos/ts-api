import { EnumUtils } from '../utils/enum_util';
import { HttpStatusCode } from '../consts/httpStatusCode';
import { Exception } from './exception';

export abstract class BaseException extends Exception {

    public readonly status: Number;

    constructor(error: any, statusCode: Number) {

        let code = EnumUtils.checkEnum(HttpStatusCode, statusCode);

        if (code == null) {
            throw new Exception('HttpStatusCode ' + statusCode + ' inválido');
        }

        let msg = error;
        if (typeof error === 'string') {
            msg = error;
        }
        else if (error.isAxiosError && error.response) {
            msg = error.message + `\n ${typeof error.response.data === 'object'
                ? JSON.stringify(error.response.data)
                : error.response.data}`;
        } else {
            msg = typeof error === 'object'
                ? JSON.stringify(error)
                : error;
        }
        super(msg);
        this.status = code;
    }
}