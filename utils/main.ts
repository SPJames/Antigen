import Route from "./route";
import { RouterLogic } from "./router-logic";
const routerLogic: RouterLogic = new RouterLogic();

const routes: Route[] = [
    {
        name: 'home',
        path: '/',
        file: '../pages/home.html'
    },
    {
        name: 'Personal Projects',
        path: '/personal',
        file: '../pages/personal-projects.html'
    },
    {
        name: '404',
        path: '/404',
        file: '../pages/404.html'
    },
]

routerLogic.addPages(routes);

routerLogic.loadAllPages();
