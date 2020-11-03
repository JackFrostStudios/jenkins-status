const settingsService = require('../../../services/settings.service');

customElements.define('jfs-jenkins-server-settings', class extends HTMLElement {    
    get $form() {
        return this.querySelector('#jfs-server-settings-form');
    }
    
    get $urlInput() {
        return this.querySelector('#jenkins-settings-url');
    }

    get $userNameInput() {
        return this.querySelector('#jenkins-settings-username');
    }

    get $passwordInput() {
        return this.querySelector('#jenkins-settings-password');
    }

    get $submitButton() {
        return this.querySelector('#jenkins-settings-submit-btn');
    }

    get $notification() {
        return this.querySelector('#jenkins-settings-form-notification');
    }

    constructor() {
        super();
    }
    
    async connectedCallback() {
        this.innerHTML = `
            <form id="jfs-server-settings-form">
                <div class="row">
                    <div class="col-12 col-md-4">
                        <h3>Jenkins Server</h3>
                        <p>Enter the server connection details and credentials.</p>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="form-group">
                            <label for="jenkins-settings-url">Jenkins URL</label>
                            <input type="url" class="form-control" id="jenkins-settings-url" required>
                        </div>
                        <div class="form-group">
                            <label for="jenkins-settings-username">Username</label>
                            <input type="text" class="form-control" id="jenkins-settings-username" required>
                        </div>
                        <div class="form-group">
                            <label for="jenkins-settings-password">Password</label>
                            <input type="password" class="form-control" id="jenkins-settings-password" required>
                        </div>
                        <jfs-notification id="jenkins-settings-form-notification" class="mt-2 mb-2"></jfs-notification>
                        <button type="submit" class="btn btn-primary" id="jenkins-settings-submit-btn">
                            <div id="jenkins-settings-submit-save-btn-text">
                                Save
                            </div>
                            <div id="jenkins-settings-submit-saving-btn-text">
                                <span class="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></span>
                                Saving...
                            <div>
                        </button>
                    </div>
                </div>
            </form>
        `;

        this.addEventListener('refresh', this._refreshForm);
        this.$form.addEventListener("submit", this._onFormSubmit, true);
        await this._refreshForm();
    }

    disconnectedCallback() {
        this.removeEventListener('refresh', this._refreshForm);
        this.$form.removeEventListener("submit", this._onFormSubmit, true);
    }

    _disableSubmit() {
        this.$submitButton.disabled = true;

    }

    _enableSubmit() {
        this.$submitButton.disabled = false;
    }

    _setSaveInProgress(saveInProgress) {
        const $saveText = this.querySelector('#jenkins-settings-submit-save-btn-text');
        const $savingText = this.querySelector('#jenkins-settings-submit-saving-btn-text');
        $saveText.style.display = saveInProgress ? 'none' : 'block';
        $savingText.style.display = saveInProgress ? 'block' : 'none';
    }
    
    _setFormValues({url = "", username = "", password = ""}) {
        this.$urlInput.value = url;
        this.$userNameInput.value = username;
        this.$passwordInput.value = password;
    }

    _getFormValues() {
        return {
            url: this.$urlInput.value,
            username: this.$userNameInput.value,
            password: this.$passwordInput.value
        };
    }

    _hideNotification() {
        this.$notification.removeAttribute('data-message');
        this.$notification.removeAttribute('data-level');
    }

    _setNotification({valid, error}) {
        if (valid) {
            this.$notification.setAttribute('data-level', 'success');
            this.$notification.setAttribute('data-message', "Save Successful.");
        } else {
            this.$notification.setAttribute('data-level', 'error');
            this.$notification.setAttribute('data-message', error);
        }
    }

    _refreshForm = async () => {
        let settings = await settingsService.getServerSettings();
        this._setFormValues(settings);
        this._enableSubmit();
        this._hideNotification();
        this._setSaveInProgress(false);
    }

    _startSave() {
        this._setSaveInProgress(true);
        this._disableSubmit();
        this._hideNotification();
    }

    _finishSave(validation) {
        this._setSaveInProgress(false);
        this._enableSubmit();
        this._setNotification(validation);
    }

    _onFormSubmit = async (evt) => {
        evt.preventDefault();
        this._startSave();
        const settings = this._getFormValues();
        let validation = await settingsService.validateServerSettings(settings);
        if (validation.valid) {
            settingsService.setServerSettings(settings);
        }
        this._finishSave(validation);
    }
});