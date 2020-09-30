import { EnumUtils } from '../utils/enum_util';
import { HttpStatusCode } from '../consts/httpStatusCode';
import { Exception } from './exception';

export abstract class BaseException extends Exception {

    public readonly status: number;
    public readonly statusText: string;

    constructor(error: any, statusCode: HttpStatusCode) {

        let code = EnumUtils.getEnum(HttpStatusCode, statusCode) as number;

        if (code == null) {
            throw new Exception('base.exception:HttpStatusCode ' + statusCode + ' inválido');
        }

        let errorMsg = null;
        if (typeof error === 'string') {
            errorMsg = error;
        }
        else if (error.isAxiosError && error.response) {
            errorMsg = error.message + `\n ${typeof error.response.data === 'object'
                ? JSON.stringify(error.response.data)
                : error.response.data}`;
        } else {
            errorMsg = typeof error === 'object'
                ? JSON.stringify(error)
                : error;
        }
        super(errorMsg);
        this.status = code;
        this.statusText = statusCode.toString();
    }
}