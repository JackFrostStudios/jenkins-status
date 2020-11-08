const jobsService = require('../../../services/jobs.service');
const settingsService = require('../../../services/settings.service');

customElements.define('jfs-jenkins-job-settings', class extends HTMLElement {    
    get $form() {
        return this.querySelector('#jfs-job-settings-form');
    }

    get $loadingMessage() {
        return this.querySelector('#jenkins-job-form-loading');
    }

    get $formContents() {
        return this.querySelector('#jenkins-job-form-contents');
    }

    get $noJobsMessage() {
        return this.querySelector('#jenkins-job-form-contents-no-jobs');
    }

    get $jobsRetrievedContent() {
        return this.querySelector('#jenkins-job-form-contents-jobs');
    }

    get $jobDetails() {
        return this.querySelector('#jenkins-job-details');
    }

    get $jobDetailSettings() {
        return [...this.querySelectorAll('.job-detail-settings')];
    }

    get $submitButton() {
        return this.querySelector('#jenkins-job-settings-submit-btn');
    }
    
    get $notification() {
        return this.querySelector('#jenkins-job-settings-form-notification');
    }

    constructor() {
        super();
    }
    
    async connectedCallback() {
        this.innerHTML = `
            <form id="jfs-job-settings-form">
                <div class="row">
                    <div class="col-12 col-md-4">
                        <h3>Jenkins Jobs</h3>
                        <p>Select which Jobs you wish to view in your dashboad and receive status update notifications.</p>
                    </div>
                    <div class="col-12 col-md-8">
                        <div id="jenkins-job-form-loading">
                            <span class="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></span>
                            Loading...
                        </div>
                        <div id="jenkins-job-form-contents">
                            <div id="jenkins-job-form-contents-no-jobs">
                                <jfs-notification class="mt-2 mb-2" data-level="error" data-message="No Jobs retreived from the Jenkins server."></jfs-notification>
                            </div>
                            <div id="jenkins-job-form-contents-jobs">
                                <div id="jenkins-job-details" class="mb-4">
                                </div>
                                <jfs-notification id="jenkins-job-settings-form-notification" class="mt-2 mb-2" data-fade></jfs-notification>
                                <button type="submit" class="btn btn-primary" id="jenkins-job-settings-submit-btn">
                                    <div id="jenkins-job-settings-submit-save-btn-text">
                                        Save
                                    </div>
                                    <div id="jenkins-job-settings-submit-saving-btn-text">
                                        <span class="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></span>
                                        Saving...
                                    <div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        `;

        this.$form.addEventListener("submit", this._onFormSubmit, true);
        this.addEventListener('refresh', this._refreshForm);
        await this._refreshForm();
    }
    
    disconnectedCallback() {
        this.$form.removeEventListener("submit", this._onFormSubmit, true);
        this.removeEventListener('refresh', this._refreshForm);
    }

    _refreshForm = async() => {
        this._setLoading(true);
        const jobs = await jobsService.getJobs();
        const jobSettings = await settingsService.getJobSettings();
        this._displayJobs(jobs, jobSettings);
        this._setSaveInProgress(false);
        this._enableSubmit();
        this._setLoading(false);
        this._hideNotification();
    };

    _setLoading(loading) {
        this.$formContents.style.display = loading ? 'none' : 'block';
        this.$loadingMessage.style.display = loading ? 'block' : 'none';
    }

    _displayJobs(jobs, jobSettings) {
        if (jobs && jobs.length > 0) {
            this.$jobsRetrievedContent.style.display = 'block';
            this.$noJobsMessage.style.display = 'none';
            const jobsDisplay = jobs.reduce((html, job, i, a) => `${html} ${this._getJobDetailsDisplay(job, i, jobSettings)}`,"");
            this.$jobDetails.innerHTML = jobsDisplay;
        } else {
            this.$jobsRetrievedContent.style.display = 'none';
            this.$noJobsMessage.style.display = 'block';
            this.$jobDetails.innerHTML = '';
        }
    }

    _getJobDetailsDisplay(job, id, settings) {
        const setting = settings ? settings.jobs.filter(s => s.name === job.name)[0] : {};
        const display = setting && setting.display === true;
        const notifications = setting && setting.notifications === true;
        return `
        <div id="job-${id}-settings" class="job-detail-settings row border-bottom border-light mb-4" data-job-id="${id}" data-job-name="${job.name}" data-job-url="${job.url}">
            <div class="col-12 col-md-5">
                <h5>${job.name}</h5>
            </div>
            <div class="col-12 col-md-7 ml-4 ml-md-0 mb-2">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="job-${id}-display" ${display ? "checked" : ""}>
                    <label class="form-check-label" for="job-${id}-display">
                        Display on Dashboard
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="job-${id}-notifications" ${notifications ? "checked" : ""}>
                    <label class="form-check-label" for="job-${id}-notifications">
                        Receive Notifications
                    </label>
                </div>
            </div>
        </div>
        `
    }

    _getFormValues() {
        return {
            jobs: this.$jobDetailSettings.map(j => {
                const id = j.getAttribute('data-job-id');
                return {
                    name: j.getAttribute('data-job-name'),
                    url: j.getAttribute('data-job-url'),
                    display: j.querySelector(`#job-${id}-display`).checked,
                    notifications: j.querySelector(`#job-${id}-notifications`).checked,
                }
            })
        };
    }

    _disableSubmit() {
        this.$submitButton.disabled = true;
    }

    _enableSubmit() {
        this.$submitButton.disabled = false;
    }

    _hideNotification() {
        this.$notification.removeAttribute('data-message');
        this.$notification.removeAttribute('data-level');
    }

    _showNotifiction() {
        this.$notification.setAttribute('data-message', 'Save Successful.');
        this.$notification.setAttribute('data-level', 'success');
    }

    _setSaveInProgress(saveInProgress) {
        const $saveText = this.querySelector('#jenkins-job-settings-submit-save-btn-text');
        const $savingText = this.querySelector('#jenkins-job-settings-submit-saving-btn-text');
        $saveText.style.display = saveInProgress ? 'none' : 'block';
        $savingText.style.display = saveInProgress ? 'block' : 'none';
    }

    _startSave() {
        this._setSaveInProgress(true);
        this._disableSubmit();
        this._hideNotification();
    }

    _finishSave() {
        this._setSaveInProgress(false);
        this._enableSubmit();
        this._showNotifiction();
    }

    _onFormSubmit = async (evt) => {
        evt.preventDefault();
        this._startSave();
        await settingsService.setJobSettings(this._getFormValues());
        this._finishSave();
    };
});