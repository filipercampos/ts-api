import express from 'express';
import router from './routes';
import { Middleware } from './infrastructure/middlewares/middleware';
import { ConfigUtil } from './utils/config_util';
import { MongoDb } from './infrastructure/database/mongo_db';
import { Swagger } from 'infrastructure/middlewares/swagger';
import mongo_rules from 'infrastructure/database/mongo_rules';

class App {

    //express
    public app: express.Application = express();
    private mongo: MongoDb = new MongoDb();

    constructor() {
        this.initialize();
    }

    private initialize() {

        //database config
        this.mongo.mongoSetup().then(r => {
            if (r) {
                //middlewares database
                mongo_rules.createIndexes(r);
            }
        });

        //middlewares
        const middleware: Middleware = new Middleware();
        //docs
        const swagger = new Swagger()
        //swagger docs
        swagger.setupSwaggerDocsYAML(this.app);
        //seta as configurações de middlware
        middleware.middleware(this.app);
        //config routes at path
        this.app.use('/api', router);
        //server config
        const cfg = ConfigUtil.getInstance().getServerConfig();
        //set port
        this.app.set("port", cfg.port);
        //set env
        this.app.set("env", cfg.env);
    }

}

export default new App().app;