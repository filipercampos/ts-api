import mongoose from 'mongoose';
import { IModel } from '../core/imodel';

const Schema = mongoose.Schema;

class BaseModel {

    protected modelName: string;
    protected definitionSchema: any;
    protected collectionName?: string;

    constructor(name: string, definitionSchema: any, collection?: string) {
        this.modelName = name;
        this.definitionSchema = definitionSchema;
        this.collectionName = collection;

    }

    public createModel<T extends IModel>(): mongoose.Model<mongoose.Document> {
        const modelSchema = new Schema(this.definitionSchema);
        const model = mongoose.model<T>(this.modelName, modelSchema, this.collectionName);
        return model;
    }

}

export class BuilderModel {

    private static instance: BuilderModel;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): BuilderModel {
        if (!BuilderModel.instance) {
            BuilderModel.instance = new BuilderModel();
        }
        return BuilderModel.instance;
    }

    /**
     * Create model
     */
    public builder<T extends IModel>(name: string, definitionSchema: any, collection?: string): mongoose.Model<mongoose.Document> {
        const builder = new BaseModel(name, definitionSchema, collection);
        const model = builder.createModel<T>();
        return model;
    }
}