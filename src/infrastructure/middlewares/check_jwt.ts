import { Auth } from '../security/auth';
import { HttpStatusCode } from 'consts/httpStatusCode';
import { Request, Response, NextFunction } from 'express';
import allowRoutes, { IRouteExpress } from './allowRoutes';

function checkJwt(req: Request, res: Response, next: NextFunction) {

    const r = {
        type: req.method,
        route: req.originalUrl
    } as IRouteExpress;

    const allow = allowRoutes.find(route => route.type == r.type && route.route == r.route);
    if (allow || allowRoutes.length == 0) {
        //allow route
        const now = new Date();
        console.log(`Interceptor at: ${now.toISOString()} | route: ${r.route} | type: ${r.type}`);
        next();
    } else {

        let token = req.headers.authorization;
        if (!token) {
            return res.status(HttpStatusCode.UNAUTHORIZED)
                .json({
                    data: {
                        message: 'Token jwt is required'
                    }
                });
        }

        try {
            token = token.replace('Bearer ', '');
            new Auth().verifyJwt(token);
            next();
        } catch (error) {
            return res.status(HttpStatusCode.UNAUTHORIZED)
                .json({ data: { message: 'Token JWT invalid/expire' } });
        }
    }
}

export default checkJwt;