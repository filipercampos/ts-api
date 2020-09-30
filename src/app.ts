import express from 'express';
import routes from './routes';
import { Middleware } from './infrastructure/middlewares/middleware';
import { ConfigUtil } from './utils/config_util';
import { MongoDb } from './infrastructure/database/mongo_db';

class App {

    //express
    public app: express.Application = express();
    private mongo:MongoDb = new MongoDb();

    constructor() {
        this.initialize();
    }

    private initialize(): void {

        //database config
        this.mongo.mongoSetup();

        //middlewares
        const middleware: Middleware = new Middleware();
        //seta as configurações de middlware
        middleware.middleware(this.app);
        //config routes
        this.app.use(routes);
        //server config
        const cfg = ConfigUtil.getInstance().getServerConfig();
        //set port
        this.app.set("port", cfg.port);
        //set env
        this.app.set("env", cfg.env);
    }

}

export default new App().app;