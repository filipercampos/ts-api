import { Router } from 'express';
import { BaseController } from './base_controller';

export abstract class BaseRoute {

    public controller: BaseController;

    constructor(controller: BaseController) {
        this.controller = controller;
    }

    public abstract routes(router: Router): void;
}