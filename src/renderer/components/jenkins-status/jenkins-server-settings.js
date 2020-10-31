customElements.define('jfs-jenkins-server-settings', class extends HTMLElement {    
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.innerHTML = `
            <form id="jfs-server-settings-form">
                <div class="row">
                    <div class="col-12 col-md-4">
                        <h3>Jenkins Server</h3>
                        <p>Enter the server connection details and login.</p>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="form-group">
                            <label for="jenkins-settings-url">Jenkins URL</label>
                            <input type="text" class="form-control" id="jenkins-settings-url" required>
                        </div>
                        <div class="form-group">
                            <label for="jenkins-settings-username">Username</label>
                            <input type="text" class="form-control" id="jenkins-settings-username" required>
                        </div>
                        <div class="form-group">
                            <label for="jenkins-settings-password">Password</label>
                            <input type="password" class="form-control" id="jenkins-settings-password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        `;

        const form = document.querySelector('#jfs-server-settings-form');
        form.addEventListener("submit", this._onFormSubmit, true);
    }

    
    disconnectedCallback() {
        const form = document.querySelector('#jfs-server-settings-form');
        form.removeEventListener("submit", this._onFormSubmit, true);
    }

    _onFormSubmit(evt) {
        evt.preventDefault();
        const urlInput = document.querySelector('#jenkins-settings-url');
        const userNameInput = document.querySelector('#jenkins-settings-username');
        const passwordInput = document.querySelector('#jenkins-settings-password');
        const settings = {
            url: urlInput.value,
            username: userNameInput.value,
            password: passwordInput.value
        }
        console.log(settings);
    }
});