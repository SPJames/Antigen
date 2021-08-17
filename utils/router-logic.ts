import Route from "./route";

let instance: RouterLogic;

class RouterLogic {

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    pages: Route[] = [];
    activePage: Route = null;
    id = Math.random();

    async loadPage(pageName: string) {
        const res = await fetch(pageName);
        const html = await res.text();
        return html;
    }

    async loadAllPages(): Promise<void> {
        const routerOutlet = document.querySelector('router-outlet');
        for(const page of this.pages) {
            page.content = await this.loadPage(page.file);
            if (page.path === window.location.pathname) {
                routerOutlet.innerHTML = page.content;
            }
        }
        if (routerOutlet.innerHTML == '') {
            this.setActivePage('/404');
            routerOutlet.innerHTML = this.getActivePage()?.content;
        }
    }

    addPages(routes: Route[]): void {
        routes.forEach(route => {
            this.pages.push({name: route.name, file: route.file, path: route.path, content: ''});
        });
    }

    getActivePage(): Route {
        return this.activePage;
    }

    setActivePage(path: string): Route {
        this.activePage = this.pages.find(p => p.path === path) ?? null;
        return this.activePage;
    }

    navigate(url: string): void {
        if(!url) {
            window.history.pushState({}, '/404', window.location.origin + '/404');
            return;
        }
        window.history.pushState({}, url, window.location.origin + url);
    }
}
export { RouterLogic };