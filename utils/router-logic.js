class RouterLogic {

    pages = [];
    activePage = null;

    async loadPage(pageName) {
        const res = await fetch(pageName);
        const html = await res.text();
        return html;
    }

    async loadAllPages() {
        for(const page of this.pages) {
            page.content = await this.loadPage(page.file);
            if (page.path === window.location.pathname) {
                document.querySelector('router-outlet').innerHTML = page.content;
            }
        }
    }

    addPages(routes) {
        routes.forEach(route => {
            this.pages.push({name: route.name, file: route.file, path: route.path, content: ''});
        });
    }

    getActivePage() {
        return this.activePage;
    }

    setActivePage(path) {
        this.activePage = this.pages.find(p => p.path === path) ?? null;
        return this.activePage;
    }

    navigate(url) {
        if(!url) {
            window.history.pushState({}, '/404', window.location.origin + '/404');
            return;
        }
        window.history.pushState({}, url, window.location.origin + url);
    }
}

// Singleton
const routerLogic = new RouterLogic();

export {routerLogic};