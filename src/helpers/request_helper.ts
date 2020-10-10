import _ from 'lodash';
import util from '../utils/param_validator';

export class RequestHelper {

    private static instance: RequestHelper;
    public queryParams: string;
    public parameters: Array<any>;

    private constructor() {
        this.queryParams = '';
        this.parameters = [];
    }

    public static getInstance() {
        if (RequestHelper.instance == null) {
            RequestHelper.instance = new RequestHelper();
        }
        return RequestHelper.instance;
    }

    /**
     * Add parameter
     * @name string
     * @value any
     */
    pushParam(name: string, value: any, validate: boolean = true) {

        if (_.isNil(name)) {
            throw new Error('Informe o nome do parametro para construção da url');
        }

        if (validate) {
            value = util.toParamValue(value);
        }
        if (value != null) {

            let newUrl = '';
            if (this.parameters.length == 0) {
                newUrl += `?${name}=${value}`;
            } else {
                newUrl += `&${name}=${value}`;
            }
            this.parameters.push({
                "name": name,
                "value": value
            });
            this.queryParams += newUrl;
        }
    }

    /**
     * Add array parameter
     * @name string
     * @value any
     */
    pushParamArray(name: string, ids: Array<number>) {

        ids = util.toParamValue(ids);

        if (_.isArray(ids) && ids.length > 0) {
            let idsString = ids[0].toString();
            for (let i = 1; i < ids.length; i++) {
                const id = ids[i];
                idsString = `${idsString},${id}`;
            }
            this.pushParam(name, idsString, false);
        }
    }

    /**
     * Add parameter path
     * @param value any
     */
    pushPath(value: any): void {
        this.queryParams = `/${util.toParamValue(value)}`;
    }

    /**
     * Clear parameters and queryParams
     */
    clear(): void {
        this.queryParams = '';
        this.parameters = [];
    }


    /**
     * Clear query params
     */
    cleanQueryParams() {
        this.queryParams = '';
    }

    /**
     * Converte os parametros informados em json
     */
    toJson(): any {
        let payload: any = {};

        for (let i = 0; i < this.parameters.length; i++) {
            const o = this.parameters[i];
            payload[o.name] = o.value;
        }
        return payload;
    }

    /**
     * Converte os parametros informados em json
     * Regex equivalente a Like
     */
    toJsonLike(): any {
        let payload: any = {};

        for (let i = 0; i < this.parameters.length; i++) {
            const o = this.parameters[i];
            payload[o.name] = { $regex: o.value, $options: 'i' };
            //or RegExp
            //payload[o.name] = new RegExp(o.value, 'i') ;
        }
        return payload;
    }

    /**
     * Retorna query params
     * @returns 
     */
    toParameters(): string {
        return `${_.isNil(this.queryParams) ? '' : this.queryParams}`;
    }

    /**
     * Verifica parametro inválido
     * 
     * @param value any
     */
    isValid(value: any): boolean {
        if (_.isEmpty(value) || _.isNil(value)) {
            return false;
        }
        return true;
    }

} 