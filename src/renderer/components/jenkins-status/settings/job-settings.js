const jobsService = require('../../../services/jobs.service');

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

    get $jobDetails() {
        return this.querySelector('#jenkins-job-details');
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
                        <p>Select which Jobs you wish to view in your dashboad.</p>
                    </div>
                    <div class="col-12 col-md-8">
                        <div id="jenkins-job-form-loading">
                            <span class="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></span>
                            Loading...
                        </div>
                        <div id="jenkins-job-form-contents">
                            <div id="jenkins-job-details" class="mb-4">
                            </div>
                            <jfs-notification id="jenkins-job-settings-form-notification" class="mt-2 mb-2"></jfs-notification>
                            <button type="submit" class="btn btn-primary" id="jenkins-job-settings-submit-btn">
                                <div id="jenkins-settings-submit-save-btn-text">
                                    Save
                                </div>
                                <div id="jenkins-settings-submit-saving-btn-text" style="display: none;">
                                    <span class="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></span>
                                    Saving...
                                <div>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        `;
        this.addEventListener('refresh', this._refreshForm);
        
        await this._refreshForm();
    }
    
    disconnectedCallback() {
        this.removeEventListener('refresh', this._refreshForm);
    }

    _refreshForm = async() => {
        this._setLoading(true);
        const jobs = await jobsService.getJobs();
        this._displayJobs(jobs);
        this._setLoading(false);
    };

    _setLoading(loading) {
        this.$formContents.style.display = loading ? 'none' : 'block';
        this.$loadingMessage.style.display = loading ? 'block' : 'none';
    }

    _displayJobs(jobs) {
        const jobsDisplay = jobs.reduce((html, job) => `${html} ${this._getJobDetailsDisplay(job)}`,"");
        console.log(jobsDisplay);
        this.$jobDetails.innerHTML = jobsDisplay;
    }

    _getJobDetailsDisplay(job) {
        return `
        <div class="row border-bottom border-light mb-4">
            <div class="col-12 col-md-5">
                <h5>${job.name}</h5>
            </div>
            <div class="col-12 col-md-7 ml-4 ml-md-0 mb-2">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="${job.name}-view">
                    <label class="form-check-label" for="${job.name}-view">
                        Display on Dashboard
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="${job.name}-view">
                    <label class="form-check-label" for="${job.name}-view">
                        Receive Notifications
                    </label>
                </div>
            </div>
        </div>
        `
    }
});