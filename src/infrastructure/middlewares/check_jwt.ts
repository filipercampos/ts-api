import { Request, Response, Router, NextFunction } from 'express';
import { Auth } from '../security/auth';

function checkJwt(req: Request, res: Response, next: NextFunction) {

    const method = req.method;
    const originalUrl = req.originalUrl;

    if (method === 'POST' && originalUrl === '/login') {
        //allow route
        const now = new Date();
        console.log(`Route Interceptor at: ${now.toISOString()}  ${originalUrl}`);
        console.log(`Request from: ${req.originalUrl} | type: ${req.method}`);
        next();
    } else {

        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
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
            return res.status(400).json({ data: { message: 'Token JWT invalid/expire' } });
        }
    }
}

export default checkJwt;