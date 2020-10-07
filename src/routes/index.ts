import { BaseRoute } from 'core/base_route';
import { UserRoute } from '@routes/user_route';
import { AuthRoute } from '@routes/auth_route';
import { TaskRoute } from '@routes/task_route';

const routes: BaseRoute[] = [
    new AuthRoute(),
    new UserRoute(),
    new TaskRoute()
];

export default routes;

