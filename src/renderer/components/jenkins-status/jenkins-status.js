const $ = require('jquery');
customElements.define('jfs-jenkins-status', class extends HTMLElement {    
    get $serverSettingsLink() {
        return $('#server-settings-tab');
    }

    get $jenkinsServerSettings() {
        return this.querySelector('jfs-jenkins-server-settings');
    }

    constructor() {
        super();
    }
    
    connectedCallback() {
        this.innerHTML = `
            <div class="card">
                <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="status-tab" data-toggle="tab" href="#status" role="tab" aria-controls="status" aria-selected="true">Status</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="server-settings-tab" data-toggle="tab" href="#server-settings" role="tab" aria-controls="server-settings" aria-selected="false">Server Settings</a>
                    </li>
                </ul>
                </div>
                <div class="card-body">
                    <div class="tab-content" id="status-tab-content">
                        <div class="tab-pane fade show active" id="status" role="tabpanel" aria-labelledby="status-tab">
                            <h2>No Project Configured</h2>
                        </div>
                        <div class="tab-pane fade" id="server-settings" role="tabpanel" aria-labelledby="server-settings-tab">
                            <jfs-jenkins-server-settings></jfs-jenkins-server-settings>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.$serverSettingsLink.on('show.bs.tab hidden.bs.tab', this._refreshServerSettings);
    }

    disconnectedCallback() {
        this.$serverSettingsLink.off('show.bs.tab hidden.bs.tab', this._refreshServerSettings);
    }

    _refreshServerSettings = () => {
        this.$jenkinsServerSettings.dispatchEvent(new Event('refresh'));
    }

    
});