import { IRead } from "domain/repositories/interfaces/iread";
import { IWrite } from "../interfaces/iwrite";
import { Model, Document } from "mongoose";
import { IPagination } from "interfaces/ipagination";
import _ from 'lodash';

export abstract class BaseRepository<T extends Document> implements IRead<T>, IWrite<T> {

    public model: Model<T>;
    public populate: String[] = [];
    public populateById: String[] = [];
    protected showErrorLog: boolean = false;
    protected eagerLoad: boolean;
    protected sorts: any = {};

    constructor(model: Model<T>, eagerLoad: boolean = true) {
        this.model = model;
        this.eagerLoad = eagerLoad;
    }

    /**
     * Get element by id
     * @param id id
     */
    async findById(id: any): Promise<T | null> {
        try {
            if (this.eagerLoad && this.populateById.length > 0) {
                const result = await this.model.findById(id).populate(this.populateById);
                return result;
            } else {
                const result = await this.model.findById(id);
                return result;
            }
        } catch (error) {
            this._handleLog(error);
            return null;
        }
    }

    /**
     * Get elements with filter
     *     to like use 
     *          { "name": { $regex: "m"} })
     * @param query filter
     * @param pagination optional
     */
    async find(query?: any, pagination?: IPagination): Promise<T[]> {


        if (pagination) {

            let result = await this.model
                .find(query)
                .skip(pagination.offset)
                .limit(pagination.limit)
                .sort(this.sorts);
            return result;
        } else {
            //eager load on
            if (this.eagerLoad && this.populate.length > 0) {

                //just eager load
                let result = await this.model.find(query)
                    .populate(this.populate).sort(this.sorts);
                return result;

            } else {

                //just find query
                let result = await this.model.find(query)
                    .sort(this.sorts);
                return result;
            }
        }
    }

    /**
     * Create a register
     * 
     * @param item T
     */
    async post(item: T): Promise<T> {
        const o = new this.model(item);
        const save = await o.save();
        return save;
    }

    /**
     * Update a register
     * @param id any
     * @param item T
     */
    async put(id: any, item: T): Promise<boolean> {
        const result = await this.model.findOneAndUpdate({ _id: id }, item);
        return result != null;
    }

    /**
     * Update partial a register
     * @param id any
     * @param item T
     */
    async patch(id: any, item: T): Promise<boolean> {
        const result = await this.model.findOneAndUpdate({ _id: id }, item);
        return result != null;
    }

    /**
     * Delete register
     * @param id any
     */
    async delete(id: any): Promise<boolean> {
        const result = await this.model.deleteOne({ _id: id });
        return result != null;
    }

    /**
     * Disable eager load
     */
    public resetEagerLoad() {
        this.populate = [];
        this.populateById = [];
    }

    //std log
    private _handleLog(error: any) {
        if (this.showErrorLog) {
            console.log(error);
        }
    }
}