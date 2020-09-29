import * as jwt from 'jsonwebtoken';
import { ConfigUtil, IPayloadTokenJwt, ITokenJwt } from '../../utils/config_util';
import fs from 'fs';
import path from 'path';
const DOMAIN = 'API_REST';
const secretOrPrivateKey = fs.readFileSync(path.join(__dirname, '../../../config', 'secret.cert'), 'utf-8');

export class Auth {
    constructor() { }

    /**
     * Gera um token JWT
     * @param data json
     * @param expiration expiraçao do token (default 12h)
     */
    public encodeJwt(data: any, expiration: string = '12h'): string {

        const payload = {
            domain: DOMAIN,
            payload: data
        };
        const tokenConfig = ConfigUtil.getInstance().getTokenConfig();
        return jwt.sign(payload, secretOrPrivateKey, {
            expiresIn: expiration || tokenConfig.expires_in
        });

    }

    /**
     * Verifica se o token é válido
     * 
     * @param token Token JWT
     * @returns {ITokenJwt}
     */
    public verifyJwt(token: string): IPayloadTokenJwt {

        const validation = jwt.verify(token, secretOrPrivateKey);
        return validation as IPayloadTokenJwt;

    }

    /**
     * Decodifica um token JWT
     * @param token {string}
     */
    public decodeJwt(token: string): ITokenJwt {

        let decodedJson = jwt.decode(token, { complete: true });
        const decoded = decodedJson as ITokenJwt;
        return decoded;

    }

}
