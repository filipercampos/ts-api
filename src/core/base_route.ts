import { Router } from 'express';
import { IController } from './icontroller';

export abstract class BaseRoute {

    public controller: IController;

    constructor(controller: IController) {
        this.controller = controller;
    }

    public abstract routes(router: Router): void;
}