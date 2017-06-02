import { action, observable } from 'mobx';

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

        if(this.formIsValid){
            this.beingSubmitted = true;
            for (let i = 0; i < inputs.length; i++) {
                this.mdmObject.set(inputs[i].id,inputs[i].value);
            }
        } else {
            this.alert_msgs.push({type:'error', headline:'Error: ',message:'Please correct the errors below.'});
        }
    }

    // Break MDM
    @action breakMDMConnection() {
        console.log('break')

        this.mdmObject.clear();
        this.resetMDMForm();
        this.alert_msgs.push({type:'success', headline:'Success! ',message:'The connection to MDM has been broken.'});
    }

    // MDM Alerts
    @action removeAlert(idx) {
        this.alert_msgs.splice(idx, 1);
    }


    // MDM Modals
    @action toggleExitModal() {
      this.showExitModal = this.showExitModal ? false : true;
    }

    @action discardFormChanges() {
        this.formHasChanged = false;
        this.showExitModal = false;
        this.resetMDMForm();
        window.location.href = '/admin';
    }

    // Services
    @action setMDMConfiguration() {
        if (this.formIsValid) {
            // let locationObj = {
            //     'pseId': 'string',
            //     'mdm': this.mdm,
            //     'endpoint': this.endpoint,
            //     'apiKey': this.apiKey
            // }

            // TODO
            // apiService.updatePSELocation(locationObj)
            //     .then((response) => {
            //         window.location.href = '/admin';
            //     })
            //     .catch((error) => {
            //         console.warn(error);
            //     });
        } else {
            console.warn('Not Valid')
        }

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

    // will be global mdm object
    @observable mdmObject = observable.map({});

    @observable alert_msgs = [];
    @observable formIsValid = false;
    @observable beingSubmitted = false;


    @observable formHasChanged = false;
    @observable showExitModal = false;

}

export const mdmStore = new MDMStore();
