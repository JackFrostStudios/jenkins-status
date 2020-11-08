const settingsService = require('../../../services/settings.service');
const jobsService = require('../../../services/jobs.service');

customElements.define('jfs-jenkins-job-status', class extends HTMLElement {
    get $loadingMessage() {
        return this.querySelector('#jenkins-job-status-loading');
    }

    get $jobStatusContents() {
        return this.querySelector('#jenkins-job-status-contents');
    }

    get $noJobsMessage() {
        return this.querySelector('#jenkins-job-status-no-jobs');
    }

    get $jobDetails() {
        return this.querySelector('#jfs-job-status-details');
    }

    constructor() {
        super();
    }
    
    async connectedCallback() {
        this.innerHTML = `
            <div id="jfs-job-status">
                <div id="jenkins-job-status-loading">
                    <span class="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></span>
                    Loading...
                </div>
                <div id="jenkins-job-status-contents">
                    <div id="jenkins-job-status-no-jobs">
                        <jfs-notification class="mt-2 mb-2" data-level="error" data-message="No Jobs retreived from the Jenkins server."></jfs-notification>
                    </div>
                    <div id=jfs-job-status-details>
                    <div>
                <div>
            <div>
        `;
        this.addEventListener('refresh', this._refreshStatus);
        await this._refreshStatus();
    }
    
    disconnectedCallback() {
        this.removeEventListener('refresh', this._refreshStatus);
    }

    _refreshStatus = async() => {
        this._setLoading(true);
        const jobSettings = await settingsService.getJobSettings();
        this._displayJobs(jobSettings.jobs);
        this._setLoading(false);
    };

    _setLoading(loading) {
        this.$jobStatusContents.style.display = loading ? 'none' : 'block';
        this.$loadingMessage.style.display = loading ? 'block' : 'none';
    }

    _displayJobs(jobs) {
        if (jobs && jobs.length > 0) {
            this.$jobDetails.style.display = 'block';
            this.$noJobsMessage.style.display = 'none';
            const jobsDisplay = jobs.reduce((html, job, i, a) => `${html} ${this._getJobStatusDisplayRow(job, i)}`,"");
            this.$jobDetails.innerHTML = this._getJobStatusDisplayTable(jobsDisplay);
            jobs.forEach((job, i) => {
               this._loadJobStatus(job, i); 
            });
        } else {
            this.$jobDetails.style.display = 'none';
            this.$noJobsMessage.style.display = 'block';
            this.$jobDetails.innerHTML = '';
        }
    }

    _getJobStatusDisplayTable(rows) {
        return `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        `;
    }

    _getJobStatusDisplayRow(job, id) {
        return job.display ? `
        <tr id="job-${id}-status" data-job-name="${job.name}" data-job-url="${job.url}">
            <td>${job.name}</td>
            <td id="job-${id}-status-details">
                <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </td>
        </tr>
        ` : "";
    }

    async _loadJobStatus(job, id) {
        let jobStatus = await jobsService.getJobLastBuild(job.name);
        const $jobStatus = this.querySelector(`#job-${id}-status-details`);
        if (jobStatus) {
            $jobStatus.classList.add(`${this._getColorClassFromJobStatus(jobStatus.result)}`);
            $jobStatus.innerHTML = `${jobStatus.result}`
        } else {
            $jobStatus.classList.add("table-dark");
            $jobStatus.innerHTML = "Unable to load build data";
        }
    }

    _getColorClassFromJobStatus(jobStatus) {
        switch (jobStatus) {
            case "SUCCESS":
                return "table-success";
            case "FAILURE":
                return "table-danger";
            case "UNSTABLE":
            default:
                return "table-warning"; 
        }
    }
    
});