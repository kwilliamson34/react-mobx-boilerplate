import { action, observable } from 'mobx';
import { apiService } from '../services/api.service';

class MDMStore {

    @action validateMDM(mdmProvider) {

        if (!mdmProvider.length) {
            mdmProvider = '';
            this.mdmErrorMessages = 'Please select MDM.';
        } else {
          this.mdmErrorMessages = '';
        }
        this.mdm = mdmProvider;
        this.validateUpdateForm();
    }

    @action validateEndPoint(endpoint) {
        if (!endpoint.length) {
            endpoint = '';
            this.endPointErrorMessages = 'Please enter a valid API key.';
        } else {
          this.endPointErrorMessages = '';
        }
        this.endpoint = endpoint;
        this.validateUpdateForm();
    }

    @action validateKey(apiKey) {

        if (!apiKey.length) {
            apiKey = '';
            this.apiKeyErrorMessages = 'Please enter a valid API key.';
        } else {
          this.apiKeyErrorMessages = '';
        }
        this.apiKey = apiKey;
        this.validateUpdateForm();
    }

    validateUpdateForm() {
      console.log(this.mdm,this.endpoint,this.apiKey)
        if (this.mdm && this.endpoint && this.apiKey) {
            this.formIsValid = true;
        }
    }


    @action toggleExitModal() {
      if(!this.showExitModal){
        this.showExitModal = true;
      } else {
        this.showExitModal = false;
      }
      console.log(this.showExitModal)
    }

    @action setMDMConfiguration() {
        if (this.formIsValid) {
            let locationObj = {
                'pse_id': 'string',
                'mdm': this.mdm,
                'endpoint': this.endpoint,
                'apiKey': this.apiKey
            }

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
    @observable apiKey = '';
    @observable mdm = '';
    @observable endpoint = '';
    @observable endPointErrorMessages = '';
    @observable mdmErrorMessages = '';
    @observable apiKeyErrorMessages = '';
    @observable formIsValid = false;
    @observable showExitModal = false;

}

export const mdmStore = new MDMStore();
