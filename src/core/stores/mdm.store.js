import { action, observable } from 'mobx';

class MDMStore {

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

    @action updateInput(id,value) {
        this[this.mdmProvider].set(id,value);
    }

     @action updateForm(form) {
        let inputs = form.querySelectorAll('input, select');
        let values = this[this.mdmProvider].values();

        let validForm = (inputs.length === values.length) && (values.indexOf('') === -1) ? true : false;

        if(this.currentMDM.values() !== this[this.mdmProvider].values()){
            this.formHasChanged = true;
        }

        this.formIsValid = validForm;
    }

    @action submitForm() {
        console.log('submit!')

        this.beingSubmitted = true;

        this.currentMDM = this[this.mdmProvider];

    }

    @action breakMDMConnection() {
        console.log('break')

        this.currentMDM.clear();
        this.airWatchForm.clear();
        this.ibmForm.clear();
        this.mobileIronForm.clear();
        this.mdmProvider = '';

        this.alert_msg = 'SUCCESS';
    }


    @action toggleExitModal() {
      if(!this.showExitModal){
        this.showExitModal = true;
      } else {
        this.showExitModal = false;
      }
    }

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

    @observable currentMDM = observable.map({});

    @observable airWatchForm = observable.map({});
    @observable ibmForm = observable.map({});
    @observable mobileIronForm = observable.map({});

    @observable alert_msg = '';
    @observable formIsValid = false;
    @observable beingSubmitted = false;


    @observable formHasChanged = false;
    @observable showExitModal = false;

}

export const mdmStore = new MDMStore();
