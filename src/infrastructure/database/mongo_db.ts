import { IConnectionConfig, IServerConfig } from 'interfaces/iconfigs';
import mongoose from 'mongoose';
import { ConfigUtil } from 'utils/config_util';

const CONNECTION = 'mongo';

export class MongoDb {

    private readonly configDatabase: IConnectionConfig;
    private mongoUrl:string;

    constructor() {
        this.configDatabase = ConfigUtil.getInstance().getDbConnection(CONNECTION);
        this.mongoUrl = ConfigUtil.getInstance().getConnectionStringMongoDb(CONNECTION);
    }

    /**
     * Configura acesso ao mongodb
     */
    public mongoSetup(): void {
        //mongodb://host/database;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, options, (err: any) => {
            if (err) {
                console.error('app:mongoose.connect => %s', err.message);
                throw err.message;
            } else {
                console.log("MongoDB connected database %s", this.configDatabase.database);

            }
        });
    }
}