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

    inputs.forEach(input => {
      if(input.value === '') {
        validForm = false;
      }
    });

    this.formIsValid = validForm;
  }

  @action resetMDMForm() {
    this.mdmProvider = '';
    this.formIsValid = false;
    this.beingSubmitted = false;
    this.formHasChanged = false;
    this.showExitModal = false;
    this.showbreakMDMConnection = false;

    if(this.currentMDMForm.keys.length) {
      this.currentMDMForm.keys.forEach(key => {
        this.currentMDMForm.set(key, undefined);
      });
    }
  }

  clearStoredCredentials() {
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

    //record all input values (except mdm select menu) in state
    inputs.forEach(input => {
      if (input.id !== 'mdm-select') {
        mdmConfig[input.id] = input.value;
      }
    });

    if (this.formIsValid) {
      this.beingSubmitted = true;
      this.setMDMConfiguration(mdmConfig);
    }
  }

  // MDM Alert functions
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
    this.appsReferencedByAlert = [];
  }

  @action clearAppsReferencedByAlert = () => {
    this.appsReferencedByAlert = [];
  }

  @action throwPushError() {
    this.showErrorAlert({
      alertsList: this.app_alerts,
      message: this.userMessages.pushFail
    });
  }

  @action throwPushSuccess() {
    this.showSuccessAlert({
      alertsList: this.app_alerts,
      message: this.userMessages.pushSuccess
    });
  }

  @action throwConnectError({alertsList = this.app_alerts}) {
    this.showErrorAlert({
      alertsList,
      message: this.userMessages.connectFail
    });
  }

  @action showErrorAlert({alertsList = this.form_alerts, message, clearOtherAlerts = false}) {
    if(clearOtherAlerts) {
      this.clearAlerts();
    }
    alertsList.push({
      type: 'error',
      headline: 'Error: ',
      message: message || this.userMessages.connectFail
    });
  }

  @action showSuccessAlert({alertsList = this.form_alerts, message, clearOtherAlerts = false}) {
    if(message) {
      if(clearOtherAlerts) {
        this.clearAlerts();
      }
      alertsList.push({
        type: 'success',
        headline: 'Success! ',
        message: message
      });
    }
  }

  // MDM Modal functions
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
    const fail = () => {
      this.throwConnectError({alertsList: this.form_alerts});
    }
    return apiService.getMDMConfiguration().then(success, fail);
  }

  @action setMDMConfiguration(mdmConfig) {
    const success = (resp) => {
      let messageObj = resp.data;
      this.beingSubmitted = false;
      this.form_alerts = [];

      if (messageObj.error) {
        this.formIsValid = false;
        this.showErrorAlert({
          alertsList: this.form_alerts,
          message: messageObj.error
        });

        if (messageObj.error.toLowerCase().includes('credentials')) {
          this.clearStoredCredentials();
        }
      } else {
        this.showExitModal = false;
        this.formHasChanged = false;
        this.hasBeenSubmitted = true;

        this.pseMDMObject.merge(mdmConfig);
        this.pseMDMObject.set('mdm_type', 'configured');
        this.showSuccessAlert({
          alertsList: this.form_alerts,
          message: messageObj.message
        });
      }
    }
    const fail = () => {
      this.beingSubmitted = false;
      this.throwConnectError({alertsList: this.form_alerts});
    }
    return apiService.setMDMConfiguration(mdmConfig).then(success, fail);
  }

  @action breakMDMConnection() {
    const success = () => {
      this.pseMDMObject.clear();
      this.hasBeenSubmitted = false;
      this.resetMDMForm();
      this.showSuccessAlert({
        alertsList: this.form_alerts,
        message: this.userMessages.breakConnectionSuccess
      });
    }
    const fail = () => {
      this.hasBeenSubmitted = true;
      this.showErrorAlert({
        alertsList: this.form_alerts,
        message: this.userMessages.breakConnectionFail
      });
    }
    return apiService.breakMDMConfiguration().then(success, fail);
  }

  @action getMDMStatus() {
    const success = (apps) => {
      mdmStore.setMDMStatus(apps);
    }
    const fail = () => {
      this.throwConnectError();
    }
    return apiService.getAdminApps().then(success, fail);
  }

  @action getSingleMDMStatus(psk, args) {
    const success = (statusObject) => {
      this.appCatalogMDMStatuses.set(psk, statusObject.mdm_install_status);
      if(args.showUserMessageOnFail && statusObject.mdm_install_status === 'FAILED'){
        this.throwPushError();
      } else if (args.showUserMessageOnSuccess && statusObject.mdm_install_status === 'INSTALLED'){
        this.throwPushSuccess();
      }
    }
    const fail = () => {
      this.stopPolling(psk);
    }
    return apiService.getSingleMDMStatus(psk).then(success, fail)
  }

  @action setMDMStatus(apps) {
    let successfullSubmission = false;
    let failedSubmission = false;
    this.appsReferencedByAlert = [];

    apps.forEach(app => {
      if (app.mdm_install_status === 'FAILED') {
        /* Always show error banner if failed installs are present. */
        failedSubmission = true;
      } else if (app.mdm_install_status === 'INSTALLED' && this.mdmStatusIsUnresolved(app.app_psk)) {
        /* Only show success message if the user has just tried
        to install; NOT on initial render. */
        successfullSubmission = true;
        this.appsReferencedByAlert.push(app.app_psk);
      }
      this.appCatalogMDMStatuses.set(app.app_psk, app.mdm_install_status);
    });

    if (failedSubmission) {
      this.throwPushError();
    }
    if (successfullSubmission) {
      this.throwPushSuccess();
    }
  }

  mdmStatusIsUnresolved(psk) {
    return this.appCatalogMDMStatuses.get(psk) === 'PENDING' || this.appCatalogMDMStatuses.get(psk) === 'IN_PROGRESS';
  }

  stopPolling(psk) {
    //set a status other than PENDING and IN_PROGRESS to stop polling
    this.appCatalogMDMStatuses.set(psk, 'DISABLED');
    this.throwConnectError();
  }

  pollUntilResolved(psk) {
    setTimeout(() => {
      if(this.mdmStatusIsUnresolved(psk)) {
        this.getSingleMDMStatus(psk, {
          showUserMessageOnFail: true,
          showUserMessageOnSuccess: true
        });
        this.pollUntilResolved(psk);
      }
    }, 3000);
  }

  @action pushToMDM(psk) {
    this.clearAlerts();
    const success = () => {
      this.pollUntilResolved(psk);

      //Stop polling after 5 min as a failsafe
      setTimeout(() => {
        if(this.mdmStatusIsUnresolved(psk)) {
          this.stopPolling(psk);
        }
      }, 300000);
    }
    const fail = () => {
      this.appCatalogMDMStatuses.set(psk, 'FAILED');
      this.throwPushError();
    }
    this.appCatalogMDMStatuses.set(psk, 'PENDING');
    return apiService.pushToMDM(psk).then(success, fail);
  }

  // OBSERVABLES
  @observable pseMDMObject = observable.map({});
  @observable userMessages = {
    connectFail: 'There was a problem establishing a connection with MDM.',
    breakConnectionSuccess: 'The connection to MDM has been broken.',
    breakConnectionFail: 'There was a problem breaking the connection with MDM.',
    pushSuccess: 'The selected apps have been pushed to MDM.',
    pushFail: 'Some or all of the selected apps could not be pushed to MDM.'
  }

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
  @observable appsReferencedByAlert = [];

  // Push to MDM
  @observable appCatalogMDMStatuses = observable.map({});
}

export const mdmStore = new MDMStore();
