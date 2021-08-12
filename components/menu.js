import {routerLogic} from "../utils/router-logic.js";
class NavBar extends HTMLElement {
    template = `
        <nav>
            <a href="#" data-url="/">Test</a>
            <a href="#" data-url="/personal">Test2</a>
            <a href="#">Test3</a>
        <nav>
    `;
    
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const node = document.createElement('template');
        node.innerHTML = this.template;
        this.shadowRoot.appendChild(node.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll('a').forEach(node => {
            node.addEventListener('click', (e) => {
                routerLogic.navigate(e?.path[0]?.dataset?.url);
            })
        })
    }
}

window.customElements.define('nav-bar', NavBar);