class NavLink extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<a href="#" data-url="${this.getAttribute('url')}" >${this.getAttribute('text')}</a>`;
        this.querySelector('a').addEventListener('click', (e: any) => {

        });
    }
}
window.customElements.define('nav-link', NavLink);