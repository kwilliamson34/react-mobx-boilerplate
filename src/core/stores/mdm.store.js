import { action, observable } from 'mobx';
import {apiService} from '../services/api.service';

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
        this.currentMDMForm.set(input.id,input.value);

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
            this.currentMDMForm.set(keys[i],undefined);
        }
    }

    @action submitForm(form) {
        console.log('submit!')

        let inputs = form.querySelectorAll('input, select');
        let mdmConfig = {};

        if(this.formIsValid){
            this.beingSubmitted = true;
            for (let i = 0; i < inputs.length; i++) {
                mdmConfig[inputs[i].id] = inputs[i].value;
            }
            this.setMDMConfiguration(mdmConfig)
        } else {
            this.alert_msgs.push({type:'error', headline:'Error: ', message:'Please correct the errors below.'});
        }
    }


    // Break MDM
    @action breakMDMConnection() {
        console.log('break')

        this.pseMDMObject.clear();
        this.hasBeenSubmitted = false;
        this.resetMDMForm();
        this.alert_msgs.push({type:'success', headline:'Success! ', message:'The connection to MDM has been broken.'});
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
      this.showExitModal = this.showExitModal ? false : true;
    }

    @action discardFormChanges() {
        this.formHasChanged = false;
        this.showExitModal = false;
        this.resetMDMForm();
    }


    // Services
    @action setMDMConfiguration(mdmConfig) {
        const success = (res) => {
            this.beingSubmitted = false;
            this.hasBeenSubmitted = true;
            this.pseMDMObject.merge(mdmConfig);
            this.alert_msgs = [];
            this.alert_msgs.push({type:'success', headline:'Success! ', message:'A new connection has been established with MDM.'});
        }
        const fail = (err) => {
            console.warn(err);
            this.beingSubmitted = false;
            this.alert_msgs.push({type:'error', headline:'Error: ', message:'There was an error establishing a connection with MDM.'});
        }
        return apiService.setMDMConfiguration(mdmConfig).then(success, success);
    }

    @action getMDMConfiguration() {
        // const success = (res) => {}
        // const fail = (err) => {
        //     console.warn(err);
        // }
        // return apiService.getPSELocation().then(success, fail)

    }


    // OBSERVABLES
    @observable mdmProvider = '';
    @observable mdmErrorMessages = '';

    @observable currentMDMForm = observable.map({
        aw_hostName: undefined,
        aw_password: undefined,
        aw_tenantCode: undefined,
        aw_userName: undefined,
        ibm_appAccessKey: undefined,
        ibm_appID: undefined,
        ibm_appVersion: undefined,
        ibm_billingID: undefined,
        ibm_password: undefined,
        ibm_platformID: undefined,
        ibm_rootURL: undefined,
        ibm_userName: undefined,
        mi_hostName: undefined,
        mi_password: undefined,
        mi_userName: undefined

    });

    // TODO - will be global mdm object from PSE
    @observable pseMDMObject = observable.map({});
    @observable alert_msgs = [{headline:'Note. ', message:'Configure MDM to push apps to the system.'}];
    @observable formIsValid = false;
    @observable beingSubmitted = false;
    @observable hasBeenSubmitted = false;


    @observable formHasChanged = false;
    @observable showExitModal = false;

}

export const mdmStore = new MDMStore();
