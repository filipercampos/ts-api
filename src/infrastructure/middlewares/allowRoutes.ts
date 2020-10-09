export interface IRouteExpress {
    type: string,
    route: string
}
const allowRoutes: IRouteExpress[] = [];

allowRoutes.push({ type: 'POST', route: '/api/authenticate' });

export default allowRoutes; 