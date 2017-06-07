import {action, observable} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';

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
        let inputs = form.querySelectorAll('input, select');
        let mdmConfig = {
          pse_id: userStore.pseId
        };
        this.clearAlerts();

        if(this.formIsValid){
            this.beingSubmitted = true;
            for (let i = 0; i < inputs.length; i++) {
                mdmConfig[inputs[i].id] = inputs[i].value;
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


    // Break MDM
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
        this.pseMDMObject.clear();
        this.hasBeenSubmitted = true;
        this.showbreakMDMConnection = true;
        this.resetMDMForm();
        this.alert_msgs.push({
          type: 'error',
          headline: 'Error: ',
          message: 'There was an error breaking the connection with MDM.'
        });
      }
      return apiService.breakMDMConfiguration().then(success, fail);
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
    @action setMDMConfiguration(mdmConfig) {
        const success = () => {
            this.beingSubmitted = false;
            this.hasBeenSubmitted = true;
            this.pseMDMObject.merge(mdmConfig);
            this.alert_msgs = [];
            this.alert_msgs.push({
              type: 'success',
              headline: 'Success! ',
              message: 'A new connection has been established with MDM.'
            });
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

    @action getMDMConfiguration() {
        // TODO Complete service integration

        // const success = (res) => {}
        // const fail = (err) => {
        //     utilsService.handleError(err);
        // }
        // return apiService.getPSELocation().then(success, fail)

        const serviceResponse = {
            aw_hostName: 'This is a Sample Server Response',
            aw_password: 'fasl;dfkjsa;fklj',
            aw_tenantCode: 'This is a Sample Server Response',
            aw_userName: 'This is a Sample Server Response',
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
        }
        this.pseMDMObject.merge(serviceResponse);

        if(this.pseMDMObject.get('aw_hostName')){
            this.mdmProvider = 'airWatchForm'
        }
        if(this.pseMDMObject.get('ibm_appAccessKey')){
            this.mdmProvider = 'ibmForm'
        }
        if(this.pseMDMObject.get('mi_hostName')){
            this.mdmProvider = 'mobileIronForm'
        }
    }

    // OBSERVABLES
    @observable mdmProvider = '';
    @observable mdmErrorMessages = '';
    @observable currentMDMForm = observable.map({});
    @observable pseMDMObject = observable.map({}); // TODO - will be global mdm object from PSE
    @observable alert_msgs = [{headline:'Note. ', message:'Configure MDM to push apps to the system.'}];
    @observable formIsValid = false;
    @observable beingSubmitted = false;
    @observable hasBeenSubmitted = false;
    @observable formHasChanged = false;
    @observable showExitModal = false;
    @observable showbreakMDMConnection = false;
}

export const mdmStore = new MDMStore();
