import * as dotenv from 'dotenv';
import { IServerConfig, IConnectionConfig } from '../interfaces/iconfigs';

export class EnvUtil {

  private static instance: EnvUtil;

  private constructor() {
    dotenv.config();
    let pathConfig;
    switch (process.env.NODE_ENV) {
      case "test":
        pathConfig = `${__dirname}/../../.env.test`;
        break;
      case "production":
        pathConfig = `${__dirname}/../../config/.env.production`;
        break;
      default:
        pathConfig = `${__dirname}/../../config/.env.development`;
    }
    dotenv.config({ path: pathConfig });
  }


  /**
   * Instance EnvUtil
   */
  public static getInstance(): EnvUtil {

    if (EnvUtil.instance == null) {
      EnvUtil.instance = new EnvUtil();
    }
    return EnvUtil.instance;
  }

  /**
   * Ambiente Node
   */
  public getNodeEnvironment(): string {
    const env = process.env.NODE_ENV || 'development';
    return env;
  }

  /**
   * Configurações de ambiente da aplicação
   */
  public getServerConfig(): IServerConfig {

    const env = this.getNodeEnvironment();
    const port = this.validateKey('port') as number;

    const server = { env: env, port: port }

    return server as IServerConfig;
  }

  /**
   * Recupera a string de conexão
   * 
   * @param name nome da string de conexão
   * @returns IConnectionConfig
   */
  public getDbConnection(): IConnectionConfig {

    this.validateKey('database');
    this.validateKey('port');

    let configuration = {
      name: "MongoDB",
      host: process.env.host,
      database: process.env.database,
      user: process.env.user || null,
      password: process.env.password || null,
      port: parseInt(process.env.port + '')
    };

    return configuration as IConnectionConfig;
  }

  /**
   * String de conexão com o mongoDB
   * @param name connection name
   * @param uri flag uri
   */
  public getConnectionStringMongoDb(uri: boolean = false): string {

    const cfg = this.getDbConnection();
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
  public getScret(): string {

    const secret = process.env.secret as string;
    return secret;
  }

  /**
   * Valida a chave a ser acessdaa
   * @param key chave
   * @returns string
   */
  private validateKey(key: string): any {

    if (!process.env[key]) {
      throw `Config '${key}' not exists`;
    }
    return process.env[key];
  }
}