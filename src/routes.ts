import { Router } from 'express';
import { UserRoute } from './routes/user_route';
import { AuthRoute } from './routes/auth_route';

const routes = Router();

//index
routes.route('/')
    .get((req, res) => {
        res.send(`
        <h1>Welcome to express</h1>
        <p> This API using Typescript</p>
        `);
    })

new AuthRoute().routes(routes);

new UserRoute().routes(routes);

export default routes;
