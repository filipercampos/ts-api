import { IRead } from "domain/repositories/interfaces/iread";
import { IWrite } from "../interfaces/iwrite";
import { Model, Document } from "mongoose";
import { IPagination } from "interfaces/ipagination";

export abstract class BaseRepository<T extends Document> implements IRead<T>, IWrite<T> {

    public model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    /**
     * Get element by id
     * @param id id
     */
    async findById(id: any): Promise<T | null> {
        const result = await this.model.findById(id);
        return result;
    }

    /**
     * Get elements with filter
     * @param query filter
     * @param pagination optional
     */
    async find(query?: any, pagination?: IPagination): Promise<T[]> {

        // to like use 
        //      { "name": { $regex: "m"} })
        if (pagination) {
            let result = await this.model
                .find(query)
                .skip(pagination.offset)
                .limit(pagination.limit);
            return result;
        } else {
            let result = await this.model.find(query)
            return result;
        }
    }

    /**
     * Create a register
     * 
     * @param item T
     */
    async post(item: T): Promise<T> {
        let newUser = new this.model(item);
        const save = await newUser.save();
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

}