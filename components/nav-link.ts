import { RouterLogic } from "../utils/router-logic";

class NavLink extends HTMLElement {

    routerLogic: RouterLogic = null;
    constructor() {
        super();
        this.routerLogic = new RouterLogic();
    }

    connectedCallback() {
        this.innerHTML = `
        <a href="#" data-url="${this.getAttribute('url')}">
            ${this.getAttribute('text')}
        </a>
        `;
        this.querySelector('a').addEventListener('click', (e: any) => {
            this.routerLogic.navigate(e?.path[0]?.dataset?.url);
        });
    }
}
window.customElements.define('nav-link', NavLink);