const $ = require('jquery');
customElements.define('jfs-jenkins-status', class extends HTMLElement {    
    get $statusLink() {
        return $('#status-tab');
    }

    get $serverSettingsLink() {
        return $('#server-settings-tab');
    }

    get $jobSettingsLink() {
        return $('#job-settings-tab');
    }

    get $status() {
        return this.querySelector('jfs-jenkins-job-status');
    }

    get $serverSettings() {
        return this.querySelector('jfs-jenkins-server-settings');
    }

    get $jobSettings() {
        return this.querySelector('jfs-jenkins-job-settings');
    }

    constructor() {
        super();
    }
    
    connectedCallback() {
        this.innerHTML = `
            <div class="card">
                <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs nav-fill" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="status-tab" data-toggle="tab" href="#status" role="tab" aria-controls="status" aria-selected="true">Status</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="server-settings-tab" data-toggle="tab" href="#server-settings" role="tab" aria-controls="server-settings" aria-selected="false">Server Settings</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="job-settings-tab" data-toggle="tab" href="#job-settings" role="tab" aria-controls="job-settings" aria-selected="false">Job Settings</a>
                    </li>
                </ul>
                </div>
                <div class="card-body">
                    <div class="tab-content" id="status-tab-content">
                        <div class="tab-pane fade show active" id="status" role="tabpanel" aria-labelledby="status-tab">
                            <jfs-jenkins-job-status></jfs-jenkins-job-status>
                        </div>
                        <div class="tab-pane fade" id="server-settings" role="tabpanel" aria-labelledby="server-settings-tab">
                            <jfs-jenkins-server-settings></jfs-jenkins-server-settings>
                        </div>
                        <div class="tab-pane fade" id="job-settings" role="tabpanel" aria-labelledby="job-settings-tab">
                            <jfs-jenkins-job-settings></jfs-jenkins-job-settings>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.$statusLink.on('show.bs.tab hidden.bs.tab', this._refreshStatus);
        this.$jobSettingsLink.on('show.bs.tab hidden.bs.tab', this._refreshJobSettings);
        this.$jobSettingsLink.on('show.bs.tab hidden.bs.tab', this._refreshJobSettings);
    }

    disconnectedCallback() {
        this.$statusLink.off('show.bs.tab hidden.bs.tab', this._refreshStatus);
        this.$serverSettingsLink.off('show.bs.tab hidden.bs.tab', this._refreshServerSettings);
        this.$jobSettingsLink.off('show.bs.tab hidden.bs.tab', this._refreshJobSettings);
    }

    _refreshStatus = () => {
        this.$status.dispatchEvent(new Event('refresh'));
    }
    
    _refreshServerSettings = () => {
        this.$serverSettings.dispatchEvent(new Event('refresh'));
    }

    _refreshJobSettings = () => {
        this.$jobSettings.dispatchEvent(new Event('refresh'));
    }

    
});