import {action, observable} from 'mobx';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';

class MDMStore {

  // Determines if the beforeUnload event should fire in the browser
  getBrowserCloseAlert = (event) => {
    if (this.mdmProvider !== '' && this.formHasChanged) {
      event.returnValue = true;
    } else {
      return;
    }
  };

  // Checks for changes to the form
  checkForChanges = () => {
    let blockExit = false;
    if (this.mdmProvider !== '' && this.formHasChanged) {
      blockExit = true;
    }
    return blockExit;
  };

  // Form Functions
  @action updateMDM(mdmProvider) {
    this.resetMDMForm();
    this.clearAlerts();
    this.mdmProvider = mdmProvider;
    this.formIsValid = false;
  }

  @action updateForm(input, form) {
    let inputs = form.querySelectorAll('input, select');
    let validForm = true;

    this.formHasChanged = true;
    this.currentMDMForm.set(input.id, input.value);

    for (let i = 0; i < inputs.length; i++) {
      if (inputs.length <= 1 || inputs[i].value === '') {
        validForm = false
      }
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
    this.showbreakMDMConnection = false;

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

    if (inputs.length > 1) {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].id !== 'mdm') {
          mdmConfig[inputs[i].id] = inputs[i].value;
        }
      }
    }

    if (this.formIsValid) {
      this.beingSubmitted = true;
      this.setMDMConfiguration(mdmConfig);
    } else {
      if (!this.pseMDMObject.get('mdm_type')) {
        let error_msg = inputs.length > 1 ? 'Please correct the errors below.' : 'Please select an MDM.';
        this.form_alerts.push({
          type: 'error',
          headline: 'Error: ',
          message: error_msg
        });
      }
    }
  }

  // MDM Alerts
  @action removeAlert(page, idx) {
    switch (page) {
      case 'mdm_form':
        this.form_alerts.splice(idx, 1);
        break;
      case 'manage_apps':
        this.app_alerts.splice(idx, 1);
        break;
    }
  }

  @action clearAlerts() {
    this.form_alerts = [];
    this.app_alerts = [];
  }

  // MDM Modals
  @action toggleExitModal() {
    this.showExitModal = !this.showExitModal;
  }

  @action togglebreakMDMConnection() {
    this.showbreakMDMConnection = !this.showbreakMDMConnection;
  }

  @action disableSaveDialogs() {
    window.removeEventListener('beforeunload', this.getBrowserCloseAlert);
    this.unblock();
  }

  @action enableSaveDialogs() {
    window.addEventListener('beforeunload', this.getBrowserCloseAlert);
    this.unblock = history.block((location) => {
      this.interceptedRoute = location.pathname;
      if (!this.checkForChanges()) {
        return true;
      } else {
        this.showExitModal = true;
        return false;
      }
    });
  }


  // Services
  @action getMDMConfiguration() {
    const success = (resp) => {
      const serviceResponse = resp.data;
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
      }
    }
    const fail = (err) => {
      console.warn(err);
      this.form_alerts.push({
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
      this.beingSubmitted = false;
      this.form_alerts = [];

      if (!messageObj.error) {
        this.showExitModal = false;
        this.formHasChanged = false;
        this.hasBeenSubmitted = true;

        this.pseMDMObject.merge(mdmConfig);
        this.pseMDMObject.set('mdm_type', 'configured');
        this.app_alerts.push({
          type: 'success',
          headline: 'Success! ',
          message: messageObj.message
        });
      } else {
        this.formIsValid = false;
        this.form_alerts.push({
          type: 'error',
          headline: 'Error: ',
          message: messageObj.error
        });

        if (messageObj.error.toLowerCase().includes('credentials')) {
          let credFields = {};

          switch (this.mdmProvider) {
            case 'airWatchForm':
              credFields = {
                aw_password: '',
                aw_userName: ''
              }
              break;
            case 'ibmForm':
              credFields = {
                ibm_password: '',
                ibm_userName: ''
              }
              break;
            case 'mobileIronForm':
              credFields = {
                mi_password: '',
                mi_userName: ''
              }
              break;
          }
          this.currentMDMForm.merge(credFields);
        }
      }
    }
    const fail = (err) => {
      console.warn(err);
      this.beingSubmitted = false;
      this.form_alerts.push({
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
      this.resetMDMForm();
      this.form_alerts.push({
        type: 'success',
        headline: 'Success! ',
        message: 'The connection to MDM has been broken.'
      });
    }
    const fail = (err) => {
      console.warn(err);
      this.hasBeenSubmitted = true;
      this.form_alerts.push({
        type: 'error',
        headline: 'Error: ',
        message: 'There was an error breaking the connection with MDM.'
      });
    }
    return apiService.breakMDMConfiguration().then(success, fail);
  }

  @action getMDMStatus() {
    const success = (apps) => {
      mdmStore.setMDMStatus(apps);
    }
    const fail = (err) => {
      console.warn(err);
      this.app_alerts.push({
        type: 'error',
        headline: 'Error: ',
        message: 'There was an error establishing a connection with MDM.'
      });
    }
    return apiService.getAdminApps().then(success, fail)
  }

  @action setMDMStatus(apps) {
    // TODO: Future enhancement: NEEDS_UPDATE case needs to be built on service side

    let successfullSubmission = false;
    let failedSubmission = false;

    for (let i = 0; i < apps.length; i++) {
      let app = apps[i];
      if (app.mdm_install_status === 'FAILED') {
        /* Always show error banner if failed installs are present. */
        failedSubmission = true;
      } else if (app.mdm_install_status === 'INSTALLED'
          && (this.appCatalogMDMStatuses.get(app.app_psk) === 'PENDING' || this.appCatalogMDMStatuses.get(app.app_psk) === 'IN_PROGRESS')) {
        /* Only show success message if the user has just tried
        to install; NOT on initial render. */
        successfullSubmission = true;
      }
      this.appCatalogMDMStatuses.set(app.app_psk, app.mdm_install_status)
    }

    if (failedSubmission) {
      this.throwMDMError();
    }

    if (successfullSubmission) {
      this.app_alerts.push({
        type: 'success',
        headline: 'Success! ',
        message: 'The selected apps have been pushed to MDM.'
      });
    }
  }

  @action throwMDMError() {
    this.clearAlerts();
    this.app_alerts.push({
      type: 'error',
      headline: 'Error: ',
      message: 'Some or all of the selected apps could not be pushed to MDM.'
    });
  }

  @action pushToMDM(psk) {
    this.clearAlerts();

    const success = () => {
      this.getMDMStatus();
    }
    const fail = (err) => {
      console.warn(err);
      this.appCatalogMDMStatuses.set(psk, 'FAILED');
      this.throwMDMError();
    }

    this.appCatalogMDMStatuses.set(psk, 'PENDING');
    return apiService.pushToMDM(psk).then(success, fail);

  }

  // OBSERVABLES
  @observable pseMDMObject = observable.map({});

  // Configure MDM Form
  @observable mdmProvider = '';
  @observable currentMDMForm = observable.map({});
  @observable formIsValid = false;
  @observable beingSubmitted = false;
  @observable hasBeenSubmitted = false;
  @observable formHasChanged = false;
  @observable showExitModal = false;
  @observable showbreakMDMConnection = false;
  @observable interceptedRoute = '';

  // MDM Alerts
  @observable form_alerts = [];
  @observable app_alerts = [];

  // Push to MDM
  @observable appCatalogMDMStatuses = observable.map({});
}

export const mdmStore = new MDMStore();
