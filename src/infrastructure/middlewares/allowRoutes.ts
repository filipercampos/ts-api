export interface IRouteExpress {
    type: string,
    route: string
}
const allowRoutes: IRouteExpress[] = [];

// allowRoutes.push({ type: 'POST', route: '/api/authenticate' });
// allowRoutes.push({ type: 'GET', route: '/users' });
// allowRoutes.push({ type: 'GET', route: '/tasks' });

export default allowRoutes; 