import { Algorithm } from 'jsonwebtoken';

export interface IServerConfig {

    env: string,
    port: number,
    db_connections: IConnectionConfig[],
    apis: IApiConfig[]
}

export interface IConnectionConfig {

    name: string,
    host: string,
    database: string,
    user: string,
    password: string,
    port: number
}

export interface IApiConfig {

    name: string,
    url: string,
    headers: {
        token: string,
    }
}

export interface ITokenConfig {
    expires_in: string
}

export interface ITokenJwt {
    header: Algorithm,
    payload: IPayloadTokenJwt,
    signature: string
}

export interface IPayloadTokenJwt {
    domain: string,
    payload: any,
    iat: number,
    exp: number,
}
