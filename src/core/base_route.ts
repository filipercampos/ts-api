import { Router } from 'express';
import { ResponseHelper } from '../helpers/response_helper';
import { IController } from './icontroller';

export abstract class BaseRoute {

    public readonly responseHelper: ResponseHelper = new ResponseHelper();
    public controller: IController;

    constructor(controller: IController) {
        this.controller = controller;
    }

    public abstract routes(router: Router): void
}