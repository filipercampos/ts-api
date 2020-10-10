import express, { Request } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import * as swaggerDocument from '../swagger/swagger.json';
import { ConfigUtil } from 'utils/config_util';

export class Swagger {

    constructor() {
    }

    /**
     * Configura o swagger docs .json
     * 
     * @param app express
     */
    public setupSwaggerDocsJson(app: express.Application): void {

        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    /**
   * Configura o swagger docs .json
   * 
   * @param app express
   */
    public setupSwaggerDocsYAML(app: express.Application): void {

        const swaggerPath = path.join(__dirname, '../swagger/swagger.yaml');
        //show explorer
        var options = {
            explorer: true
        };
        const swaggerDocument = YAML.load(swaggerPath);
        let port = ConfigUtil.getInstance().getServerConfig().port;
        let update = false;
        app.use('/docs', function (req: any, res: any, next: any) {

            let hostRequest = req.get('host');
            if (!update) {
                let host = '';

                const servers = swaggerDocument.servers;

                if (servers.length > 0) {

                    let server = servers[0];

                    //same port ignore changes
                    if (server.url.includes(port.toString)) {
                        update = true;
                    } else {

                        let split = server.url.split('//');

                        if (split.length > 1) {
                            let protocol = split[0];
                            let splitBasePath = split[1].split('/');
                            //remove empty from end
                            if (splitBasePath.includes('')) {
                                splitBasePath.pop();
                            }
                            let basePath = splitBasePath.length > 1 ? '/' + splitBasePath[splitBasePath.length - 1] : '';
                            let hostName = hostRequest.includes('localhost') ? `localhost:${port}` : hostRequest;
                            //new host from port 
                            host = `${protocol}//${hostName}${basePath}`;
                            server.url = host;
                        }
                        swaggerDocument.servers.splice(0, 1, server);//replace first element
                        swaggerDocument.host = host;
                        req.swaggerDoc = swaggerDocument;
                        update = true;
                        console.warn('Swagger changed');
                    }
                }
            }
            next();
        }, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

    }


}