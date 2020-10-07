import { IPagination } from "interfaces/ipagination";

export interface IRead<T> {

    findById(id: any): Promise<T | null>;

    find(query?: any, pagination?: IPagination): Promise<T[]>;
}