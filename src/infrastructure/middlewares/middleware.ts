import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import authJwt from './auth_jwt'; 

export class Middleware {

    /**
     * Configraçãoes de middleware da aplicação
     * @param app 
     */
    public middleware(app: express.Application): void {

        // a middleware function level app
        //This code is executed for every request to the router       
        app.use(authJwt);

        // support application/json type post data
        app.use(bodyParser.json());

        // cross origin
        app.use(cors());

        // aumenta a segurança do middleware
        app.use(helmet());

        // limita a 10 megas as request
        app.use(bodyParser.json({ limit: '10mb' }));

        //any type
        app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

    }

} 