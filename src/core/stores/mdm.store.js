import { action, observable } from 'mobx';
import { apiService } from '../services/api.service';

class MDMStore {

    // Form Functions
    @action updateMDM(mdmProvider) {
        if (!mdmProvider.length) {
            mdmProvider = '';
            this.mdmErrorMessages = 'Please select your MDM Provider.';
        } else {
            this.mdmErrorMessages = '';
        }

        this.mdmProvider = mdmProvider;
        this.formIsValid = false;
    }

    @action updateForm(input, form) {
        let inputs = form.querySelectorAll('input, select');
        let validForm = true;

        this.formHasChanged = true;
        this.currentMDMForm.set(input.id, input.value);

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') { validForm = false }
        }

        this.formIsValid = validForm;
    }

    @action resetMDMForm() {
        const keys = this.currentMDMForm.keys();

        this.mdmProvider = '';
        this.formIsValid = false;
        this.beingSubmitted = false;
        this.formHasChanged = false;
        this.showExitModal = false;

        for (let i = 0; i < keys.length; i++) {
            this.currentMDMForm.set(keys[i], undefined);
        }
    }

    @action submitForm(form) {
        let inputs = form.querySelectorAll('input, select');
        let mdmConfig = {
            aw_hostName: '',
            aw_password: '',
            aw_tenantCode: '',
            aw_userName: '',
            ibm_appAccessKey: '',
            ibm_appID: '',
            ibm_appVersion: '',
            ibm_billingID: '',
            ibm_password: '',
            ibm_platformID: '',
            ibm_rootURL: '',
            ibm_userName: '',
            mi_hostName: '',
            mi_password: '',
            mi_userName: ''
        };

        this.clearAlerts();

        if (this.formIsValid) {
            this.beingSubmitted = true;
            for (let i = 0; i < inputs.length; i++) {
                if(inputs[i].id !== 'mdm'){
                    mdmConfig[inputs[i].id] = inputs[i].value;
                }
            }
            this.setMDMConfiguration(mdmConfig)
        } else {
            this.alert_msgs.push({
                type: 'error',
                headline: 'Error: ',
                message: 'Please correct the errors below.'
            });
        }
    }

    // MDM Alerts
    @action removeAlert(idx) {
        this.alert_msgs.splice(idx, 1);
    }

    @action clearAlerts() {
        this.alert_msgs = [];
    }


    // MDM Modals
    @action toggleExitModal() {
        this.showExitModal = !this.showExitModal;
    }

    // MDM Modals
    @action togglebreakMDMConnection() {
        this.showbreakMDMConnection = !this.showbreakMDMConnection;
    }

    @action discardFormChanges() {
        this.formHasChanged = false;
        this.showExitModal = false;
        this.resetMDMForm();
    }

    // Services
    @action getMDMConfiguration() {
        const success = (resp) => {
            const serviceResponse = resp.data;

            console.log(serviceResponse);

            this.pseMDMObject.merge(serviceResponse);

            switch (serviceResponse.mdm_type) {
                case 'AIRWATCH':
                    this.mdmProvider = 'airWatchForm'
                    break;
                case 'MAAS360':
                    this.mdmProvider = 'ibmForm'
                    break;
                case 'MOBILE_IRON':
                    this.mdmProvider = 'mobileIronForm'
                    break;
                default:
                    if(!this.alert_msgs.length){
                        this.alert_msgs.push({ headline: 'Note. ', message: 'Configure MDM to push apps to the system.'});
                    }
            }
        }

        const fail = (err) => {
            console.warn(err);
            this.alert_msgs.push({
                type: 'error',
                headline: 'Error: ',
                message: 'Unable to reach MDM Service.'
            });
        }

        return apiService.getMDMConfiguration().then(success, fail);
    }

    @action setMDMConfiguration(mdmConfig) {
        const success = (resp) => {
            let messageObj = resp.data;
            this.showExitModal = false;
            this.beingSubmitted = false;
            this.alert_msgs = [];

            if (!messageObj.error) {
                this.hasBeenSubmitted = true;

                this.pseMDMObject.merge(mdmConfig);
                this.pseMDMObject.set('mdm_type','configured');
                this.alert_msgs.push({
                    type: 'success',
                    headline: 'Success! ',
                    message: messageObj.message
                });
            } else {
                this.alert_msgs.push({
                    type: 'error',
                    headline: 'Error: ',
                    message: messageObj.error
                });
            }
        }
        const fail = (err) => {
            console.warn(err);
            this.beingSubmitted = false;
            this.alert_msgs.push({
                type: 'error',
                headline: 'Error: ',
                message: 'There was an error establishing a connection with MDM.'
            });
        }
        return apiService.setMDMConfiguration(mdmConfig).then(success, fail);
    }

    @action breakMDMConnection() {
        const success = () => {
            this.pseMDMObject.clear();
            this.hasBeenSubmitted = false;
            this.showbreakMDMConnection = false;
            this.resetMDMForm();
            this.alert_msgs.push({
                type: 'success',
                headline: 'Success! ',
                message: 'The connection to MDM has been broken.'
            });
        }
        const fail = (err) => {
            console.warn(err);
            this.hasBeenSubmitted = true;
            this.showbreakMDMConnection = false;
            this.alert_msgs.push({
                type: 'error',
                headline: 'Error: ',
                message: 'There was an error breaking the connection with MDM.'
            });
        }
        return apiService.breakMDMConfiguration().then(success, fail);
    }

    // OBSERVABLES
    @observable mdmProvider = '';
    @observable currentMDMForm = observable.map({});
    @observable pseMDMObject = observable.map({}); // TODO - will be global mdm object from PSE
    @observable alert_msgs = [];
    @observable formIsValid = false;
    @observable beingSubmitted = false;
    @observable hasBeenSubmitted = false;
    @observable formHasChanged = false;
    @observable showExitModal = false;
    @observable showbreakMDMConnection = false;
}

export const mdmStore = new MDMStore();
