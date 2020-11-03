customElements.define('jfs-notification', class extends HTMLElement {    
    static get observedAttributes() {
        return ['data-level', 'data-message'];
    }

    get message() {
        return this.getAttribute('data-message') ?? "";
    }

    get alertLevel() {
        return this.getAttribute('data-level') ?? "";
    }
    
    constructor() {
        super();
    }

    connectedCallback() {
        this._render();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal !== newVal) {
            this._render();
        }
    }

    _render() {
        this.innerHTML = `
        <div class="alert ${this._getNotificationLevelClass()} ${this._getDisplayClass()}">
            ${this.message}
        </div>
        `;
    }

    _getNotificationLevelClass() {
        switch(this.alertLevel) {
            case 'success':
                return 'alert-success';
            case 'error':
                return 'alert-danger';
            default:
                return 'alert-dark';
        }
    }

    _getDisplayClass() {
        return this.message === "" ? 'hide-notification' : 'show-notification';
    }
});