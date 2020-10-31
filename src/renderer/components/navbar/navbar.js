customElements.define('jfs-nav', class extends HTMLElement {    
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <span class="navbar-brand mb-0 h1">Jenkins Status</span>
            </nav>
        `;
    }
});