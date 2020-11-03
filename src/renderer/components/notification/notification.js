customElements.define('jfs-notification', class extends HTMLElement {    
    static get observedAttributes() {
        return ['data-level', 'data-message'];
    }

    get $alert() {
        return this.querySelector('.alert');
    }

    get message() {
        return this.getAttribute('data-message') ?? "";
    }

    get alertLevel() {
        return this.getAttribute('data-level') ?? "";
    }

    get fadeEnabled() {
        return this.hasAttribute('data-fade');
    }

    _fadeTimeout = null;
    
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
        <div class="alert ${this._getNotificationLevelClass()} ${this._getDisplayClass()} ${this.fadeEnabled ? 'fade-notification' : ''}">
            ${this.message}
        </div>
        `;
        this._fade();
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
        return this.message === "" ? '' : 'show-notification';
    }

    _fade() {
        if (this._fadeTimeout) clearTimeout(this._fadeTimeout);
        if (this.message !== "" && this.fadeEnabled) {
            this._fadeTimeout = setTimeout(() => {
                this._removeShowNotification();
                this._fadeTimeout = null;
            }, 6000);
        }
    }

    _removeShowNotification() {
        this.$alert.classList.remove('show-notification');
    }
});