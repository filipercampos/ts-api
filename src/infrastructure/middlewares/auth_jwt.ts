import { Auth } from '../security/auth';
import { HttpStatusCode } from 'consts/httpStatusCode';
import { Request, Response, NextFunction } from 'express';
import allowRoutes, { IRouteExpress } from './allowRoutes';

function authJwt(req: Request, res: Response, next: NextFunction) {

    const r = {
        type: req.method,
        route: req.originalUrl
    } as IRouteExpress;

    //check routes 
    const allow = allowRoutes.find(route => route.type == r.type && route.route == r.route);
    // route allow
    if (allowRoutes.length == 0 || allow) {
        // const now = new Date();
        // console.log(`Interceptor at: ${now.toISOString()} | route: ${r.route} | type: ${r.type}`);
        next();
    } else {

        let authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(HttpStatusCode.UNAUTHORIZED)
                .json({
                    data: {
                        message: 'No token provided'
                    }
                });
        }
        const parts = authorization.split(' ');

        if (parts.length != 2) {
            return res.status(HttpStatusCode.UNAUTHORIZED)
                .json({
                    data: {
                        message: 'Token error'
                    }
                });
        }

        const [type, token] = parts;

        //is formatted
        if (/^Bearer$/i.test(type)) {

            try {
                new Auth().verifyJwt(token);
                next();
            } catch (error) {
                return res.status(HttpStatusCode.UNAUTHORIZED)
                    .json({ data: { message: 'Token JWT invalid/expire' } });
            }
        } else {
            return res.status(HttpStatusCode.UNAUTHORIZED)
                .json({
                    data: {
                        message: 'Token malformatted'
                    }
                });
        }

    }
}

export default authJwt;