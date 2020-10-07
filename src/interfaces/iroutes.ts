import express from 'express';

interface IRoutes {
    routes(app: express.Application): void;
}

export default IRoutes;