import { Request, Response } from "express";
import { ResponseHelper } from "helpers/response_helper";
import { Document } from "mongoose";
import { IController } from "../interfaces/icontroller";
import { BaseRepository } from "../domain/repositories/core/base_repository";
import { RequestHelper } from "helpers/request_helper";

export abstract class BaseController extends ResponseHelper implements IController {

    protected reqHelper: RequestHelper = RequestHelper.getInstance();
    public readonly baseRepository: BaseRepository<Document>;

    constructor(repository: BaseRepository<Document>) {
        super();
        this.baseRepository = repository;
    }

    public async findById(req: Request, res: Response) {
        try {
            const result = await this.baseRepository.findById(req.params.id);
            super.sendSuccess(res, result);
        } catch (error) {
            super.sendError(res, error);
        }
    };

    public async find(req: Request, res: Response) {
        try {
            const pagination = await this.getPagination(req);
            const result = await this.baseRepository.find(req.query);
            super.sendSuccess(res, result, pagination);
        } catch (error) {
            super.sendError(res, error);
        }
    }

    public async post(req: Request, res: Response) {
        try {
            const save = await this.baseRepository.post(req.body);
            super.sendCreated(res, save._id);
        } catch (error) {
            super.sendError(res, error);
        }
    }

    public async put(req: Request, res: Response) {
        try {
            const result = await this.baseRepository.put(req.params.id, req.body);
            super.sendUpdated(res, result);
        } catch (error) {
            super.sendError(res, error);
        }
    }

    public async patch(req: Request, res: Response) {
        try {
            const result = await this.baseRepository.patch(req.params.id, req.body);
            super.sendUpdated(res, result);
        } catch (error) {
            super.sendError(res, error);
        }
    }

    public async delete(req: Request, res: Response) {

        try {
            const users = await this.baseRepository.delete(req.params.id);
            super.sendUpdated(res, users);
        } catch (error) {
            super.sendError(res, error);
        }
    }

    public async getPagination(req: Request) {
        const pagination = await super.getPagination(req, this.baseRepository.model);
        return pagination;
    }

    // public async getById(req: Request, res: Response) {
    // super.sendNotFound(res, 'Not implement');
    // };

    // public find(req: Request, res: Response) {
    //     super.sendNotFound(res, 'Not implement');
    // };

    // public where(req: Request, res: Response) {
    //     super.sendNotFound(res, 'Not implement');
    // };

    // public post(req: Request, res: Response) {
    //     super.sendNotFound(res, 'Not implement');
    // };

    // public put(req: Request, res: Response) {
    //     super.sendNotFound(res, 'Not implement');
    // };

    // public patch(req: Request, res: Response) {
    //     super.sendNotFound(res, 'Not implement');
    // };

    // public delete(req: Request, res: Response) {
    //     super.sendNotFound(res, 'Not implement');
    // };

}