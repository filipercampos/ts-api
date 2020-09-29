import app from './app';
import { Middleware } from './infrastructure/middlewares/middleware';
import https from 'https';
import httpsOptions from './infrastructure/middlewares/https_options';
import { ConfigUtil } from './utils/config_util';

//middlewares
const middleware = new Middleware();
//seta as configurações de middlware
middleware.middleware(app);
//cfg util
const cfg = ConfigUtil.getInstance();
//server config
const config = cfg.getServerConfig();
// create server https
https.createServer(httpsOptions, app).listen(config.port, () => {
    console.log(`APP listening on Environment: ${config.env} | Port: ${config.port}`);
});

