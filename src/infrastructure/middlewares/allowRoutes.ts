export interface IRouteExpress {
    type: string,
    route: string
}
const allowRoutes: IRouteExpress[] = [];

// allowRoutes.push({ type: 'GET', route: '/' });
// allowRoutes.push({ type: 'GET', route: '/usuarios' });
// allowRoutes.push({ type: 'POST', route: '/authenticate' });

export default allowRoutes; 