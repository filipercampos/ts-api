import * as jwt from 'jsonwebtoken';
import { ConfigUtil } from '../../utils/config_util';
import { IPayloadTokenJwt, ITokenJwt } from 'src/interfaces/iconfigs';
const DOMAIN = 'API_REST';

export class Auth {

    private readonly secretOrPrivateKey: string;

    constructor() {
        this.secretOrPrivateKey = ConfigUtil.getInstance().getSecret();
    }

    /**
     * Gera um token JWT
     * @param data json
     * @param expiration expiraçao do token (default 12h)
     */
    public encodeJwt(data: any, expiration: string = '12h', domain: string = DOMAIN): string {

        const payload = {
            domain: domain,
            payload: data
        };

        const tokenConfig = ConfigUtil.getInstance().getTokenConfig();
        return jwt.sign(payload, this.secretOrPrivateKey, {
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
        const validation = jwt.verify(token, this.secretOrPrivateKey);
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
