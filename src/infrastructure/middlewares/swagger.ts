import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import * as swaggerDocument from '../swagger/swagger.json';

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
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

    }


}