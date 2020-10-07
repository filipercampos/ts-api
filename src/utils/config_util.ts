import config from 'config';
import { IServerConfig, IConnectionConfig, IApiConfig, ITokenConfig } from '../interfaces/iconfigs';
import fs from 'fs';
import path from 'path';

//Singleton
export class ConfigUtil {

    private static instance: ConfigUtil;

    private constructor() {
    }

    /**
     * Instance ConfigUtil
     */
    public static getInstance(): ConfigUtil {

        if (ConfigUtil.instance == null) {
            ConfigUtil.instance = new ConfigUtil();
        }
        return ConfigUtil.instance;
    }

    /**
     * Ambiente Node
     */
    public getNodeEnvironment(): string {

        if (config.has('env')) {
            return config.get<string>('env')
        }
        const env = process.env["NODE_ENV"] || 'development';
        return env;
    }

    /**
     * Configurações de ambiente da aplicação
     */
    public getServerConfig(): IServerConfig {

        const env = this.getNodeEnvironment();
        const port = this.validateConfig('port');

        const server = { env: env, port: port || 3100 }

        return server as IServerConfig;
    }

    /**
     * Recupera a string de conexão
     * 
     * @param name nome da string de conexão
     * @returns IConnectionConfig
     */
    public getDbConnection(name: string): IConnectionConfig {

        const key = `db_connections.${name}`;
        this.validateConfig(key);
        let configuration = config.get<IConnectionConfig>(key);
        return configuration;
    }

    /**
     * Recupera endereço e config da api
     * 
     * @param name nome da api
     */
    public getApiConfig(name: string): IApiConfig {

        const key = `apis.${name}`;

        if (!config.has(key)) {
            throw `API Key ${key} not exists`;
        }
        let configuration = config.get<IApiConfig>(key);
        return configuration;
    }

    /**
     * String de conexão com o mongoDB
     * @param name connection name
     * @param uri flag uri
     */
    public getConnectionStringMongoDb(name: string, uri: boolean = false): string {

        const cfg = this.getDbConnection(name);
        let srv = uri ? '+srv' : '';
        let mongoUrl = `mongodb${srv}://`;

        if (cfg.user && cfg.password) {
            mongoUrl += `${cfg.user}:${cfg.password}@`;
        }
        mongoUrl += `${cfg.host}:${cfg.port}/${cfg.database}`;
        return mongoUrl;
    }

    /**
     * Recupera configuração do token
     * 
     * @param name nome da api
     */
    public getTokenConfig(): ITokenConfig {

        const key = 'token_config';

        if (!config.has(key)) {
            throw `Token Key ${key} not exists`;
        }
        let configuration = config.get<ITokenConfig>(key);
        return configuration;
    }

    /**
     * Chave JWT
     */
    public getSecret() {
        const secret = fs.readFileSync(path.join(__dirname, '../../config', 'secret.cert'), 'utf-8');
        return secret as string;
    }

    /**
     * Valida a chave a ser acessdaa
     * @param key chave
     * @returns string
     */
    private validateConfig(key: string) {

        if (!config.has(key)) {
            throw `Config '${key}' not exists`;
        }
        return config.get(key);
    }
}