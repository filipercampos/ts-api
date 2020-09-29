import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import { Middleware } from './infrastructure/middlewares/middleware';
import { ConfigUtil } from './utils/config_util';

class App {

    public app: express.Application = express();
    public readonly middleware: Middleware = new Middleware();

    constructor() {
        this.initialize();
        this.mongoSetup();
    }

    private mongoSetup(): void {
        const cfg = ConfigUtil.getInstance();
        // 'mongodb://host/database';
        const mongoUrl = cfg.getConnectionStringMongoDb('mongo');
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        mongoose.Promise = global.Promise;
        mongoose.connect(mongoUrl, options);
    }

    private initialize(): void {

        //config middleware
        this.middleware.middleware(this.app);

        //config routes
        this.app.use(routes);
        // this.overriddeNodeConfigDir();
    }

    public overriddeNodeConfigDir(): void {
        process.env["NODE_CONFIG_DIR"] = __dirname + "/infrastructure/config/";
    }


}

export default new App().app;