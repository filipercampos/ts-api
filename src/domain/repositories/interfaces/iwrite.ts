export interface IWrite<T> {

    post(item: T): Promise<T>;

    put(id: any, item: T): Promise<boolean>;

    patch(id: any, item: T): Promise<boolean>;

    delete(id: any): Promise<boolean>;

}