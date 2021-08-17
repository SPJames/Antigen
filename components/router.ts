import { RouterLogic } from "../utils/router-logic";

class RouterOutlet extends HTMLElement {
    routerLogic: RouterLogic = null;
    constructor() {
        super();
        this.routerLogic = new RouterLogic();
    }

    connectedCallback() {
        window.addEventListener("popstate", this._handlePopstate);
    }

    disconnectedCallback() {
        window.removeEventListener("popstate", this._handlePopstate);
    }

    _handlePopstate = () => {
        let page = this.routerLogic.setActivePage(window.location.pathname);
        if (!page) {
           page = this.routerLogic.setActivePage('/404');
        }
        this.innerHTML = page.content;
    }
}

window.customElements.define('router-outlet', RouterOutlet);