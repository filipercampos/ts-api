import { AppConsts } from "consts/app_consts";
import { MongoDbHelper } from "infrastructure/database/mongo_db";
import { Mongoose } from "mongoose";

export = {

    async createIndexes(mongo: Mongoose) {
        const helper = new MongoDbHelper(mongo);
        const collection = await helper.getCollection(AppConsts.USER_COLLECTION);
        collection.createIndex({ 'email': 1 }, { unique: true })
    }

}
