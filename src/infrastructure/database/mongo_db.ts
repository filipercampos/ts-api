import { IConnectionConfig } from 'interfaces/iconfigs';
import mongoose, { Mongoose } from 'mongoose';
import { ConfigUtil } from 'utils/config_util';
import { Db, Collection } from 'mongodb';
const CONNECTION = 'mongo';

export class MongoDb {


    private readonly configDatabase: IConnectionConfig;
    private mongoUrl: string;

    constructor() {
        this.configDatabase = ConfigUtil.getInstance().getDbConnection(CONNECTION);
        this.mongoUrl = ConfigUtil.getInstance().getConnectionStringMongoDb(CONNECTION);
    }

    /**
     * Configura acesso ao mongodb
     * @returns Mongoose
     */
    public async mongoSetup(log: boolean = true): Promise<Mongoose> {
        //mongodb://host/database;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
        try {
            mongoose.Promise = global.Promise;
            const m = mongoose.connect(this.mongoUrl, options);
            if (log) {
                console.log("MongoDB connected database %s", this.configDatabase.database);
            }
            return m;
        } catch (err) {
            console.error('app:mongoose.connect => %s', err.message);
            throw err.message;
        }


    }

}

export class MongoDbHelper {

    public mongo: Mongoose;
    private connection: mongoose.Connection;

    constructor(mongo: Mongoose) {
        this.mongo = mongo;
        this.connection = this.mongo.connection;
    }

    public async getDb(): Promise<Db> {
        return this.connection.db;
    }
    public async getConnection(): Promise<mongoose.Connection> {
    
        return this.connection;
    }

    public async getCollection(collectionName: string): Promise<Collection> {
        return this.connection.collection(collectionName);
    }

}