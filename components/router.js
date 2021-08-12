import { routerLogic } from "../utils/router-logic.js";

class RouterOutlet extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        window.addEventListener("popstate", this._handlePopstate);
    }

    disconnectedCallback() {
        window.removeEventListener("popstate", this._handlePopstate);
    }

    _handlePopstate = () => {
        const page = routerLogic.setActivePage(window.location.pathname);
        if (page) {
            this.innerHTML = page.content;
        }
    }
    
}

window.customElements.define('router-outlet', RouterOutlet);