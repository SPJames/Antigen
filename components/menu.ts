class NavBar extends HTMLElement {
    template = `
        <style>
            @media only screen and (max-width: 600px) {
                nav {
                    display: flex;
                    flex-direction: column;
                    width: 100vw;
                    height: 100vh;
                    position: absolute;
                    background: white;
                    left: -100vw;
                    transition: left 0.2s;
                }
                nav.isVisible {
                    left: 0;
                }
                nav a {
                    font-size: 15vw;
                }
                nav button {
                    display: block;
                    position: absolute;
                    right: 10px;
                }
                div[data-collapse] {
                    display: none;
                    height: 0;
                    transition: height 0.2s;
                    margin-left: 20px;
                }
                div[data-collapse].open {
                    display: block;
                    height: auto;
                }
            }
            @media only screen and (min-width: 601px) {
                button {
                    display: none;
                }
            }
        </style>
        <nav>
            <nav-link url="/" text="Home"></nav-link>
            <a href="#" data-collapse="projects">Projects</a>
            <div data-collapse="projects">
                <nav-link url="/personal" text="Personal"></nav-link>
                <nav-link url="/professional" text="Professional"></nav-link>
            </div>
            <nav-link url="/resume" text="Resume"></nav-link>
            <nav-link url="/contact" text="Contact"></nav-link>
            <button>menu</button>
        </nav>
        <button id="hamburger">menu</button>
    `;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const node = document.createElement('template');
        node.innerHTML = this.template;
        this.shadowRoot.appendChild(node.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll('nav-link').forEach(node => {
            node.addEventListener('click', this.toggleNav);
        });
        this.shadowRoot.querySelectorAll('a[data-collapse]').forEach(node => {
            node.addEventListener('click', (e: any) => {
                const toggle = e?.path[0]?.dataset?.collapse;
                this.shadowRoot.querySelector(`div[data-collapse=${toggle}]`).classList.toggle('open');
            });
        });
        this.shadowRoot.querySelector('#hamburger').addEventListener("click", this.toggleNav);
        this.shadowRoot.querySelector('nav button').addEventListener("click", this.toggleNav);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelectorAll('a[data-url]').forEach(node => {
            node.removeEventListener('click', this.toggleNav);
        });
        this.shadowRoot.querySelectorAll('a[data-collapse]').forEach(node => {
            node.removeEventListener('click', (e: any) => {
                const toggle = e?.path[0]?.dataset?.collapse;
                this.shadowRoot.querySelector(`div[data-collapse=${toggle}]`).classList.toggle('open');
            });
        });
        this.shadowRoot.querySelector('#hamburger').removeEventListener("click", this.toggleNav);
        this.shadowRoot.querySelector('nav button').removeEventListener("click", this.toggleNav);
    }

    toggleNav = () => {
        this.shadowRoot.querySelector('nav').classList.toggle('isVisible');
    }
}

window.customElements.define('nav-bar', NavBar);