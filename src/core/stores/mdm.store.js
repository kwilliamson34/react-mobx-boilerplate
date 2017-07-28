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
  @action removeAlert(alertList, idx) {
    alertList.splice(idx, 1);
  }

  @action clearAlerts() {
    this.mdm_form_alerts = [];
    this.manage_apps_alerts = [];
    this.app_detail_alerts = [];
    this.clearAppsReferencedByAlert();
  }

  @action clearAppsReferencedByAlert = () => {
    this.appsReferencedByAlert = [];
  }

  @action addPushErrorAlert(psk) {
    this.manage_apps_alerts = [];
    this.showErrorAlert({
      alertList: this.manage_apps_alerts,
      message: this.userMessages.pushFailMultiple
    });

    if(psk) {
      this.updateAlert({
        alertList: this.app_detail_alerts,
        type: 'error',
        message: this.userMessages.pushFail,
        psk
      });
    }
  }

  @action addPushSuccessAlert(psk) {
    this.manage_apps_alerts = [];
    this.showSuccessAlert({
      alertList: this.manage_apps_alerts,
      message: this.userMessages.pushSuccessMultiple
    });

    if(psk) {
      this.updateAlert({
        alertList: this.app_detail_alerts,
        type: 'success',
        message: this.userMessages.pushSuccess,
        psk
      });
    }
  }

  @action throwConnectError({alertList = this.manage_apps_alerts}) {
    this.showErrorAlert({
      alertList,
      message: this.userMessages.connectFail
    });
  }

  @action updateAlert({alertList = this.mdm_form_alerts, type = 'error', message, psk}) {
    let alertForThisPsk = alertList.filter(alert => {
      return alert.psk === psk;
    });
    if(alertForThisPsk) {
      alertForThisPsk.type = type;
      alertForThisPsk.headline = type === 'error' ? 'Error: ' : 'Success! ';
      alertForThisPsk.message = message;
    } else {
      const showAlertFn = type === 'error' ? this.showErrorAlert : this.showSuccessAlert;
      showAlertFn({
        alertList,
        message,
        psk
      });
    }
  }

  @action showErrorAlert({alertList = this.mdm_form_alerts, message, psk}) {
    alertList.push({
      type: 'error',
      headline: 'Error: ',
      message: message || this.userMessages.connectFail,
      psk
    });
  }

  @action showSuccessAlert({alertList = this.mdm_form_alerts, message, psk}) {
    if(message) {
      alertList.push({
        type: 'success',
        headline: 'Success! ',
        message,
        psk
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
      this.throwConnectError({alertList: this.mdm_form_alerts});
    }
    return apiService.getMDMConfiguration().then(success, fail);
  }

  @action setMDMConfiguration(mdmConfig) {
    const success = (resp) => {
      let messageObj = resp.data;
      this.beingSubmitted = false;
      this.mdm_form_alerts = [];

      if (messageObj.error) {
        this.formIsValid = false;
        this.showErrorAlert({
          alertList: this.mdm_form_alerts,
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
          alertList: this.mdm_form_alerts,
          message: messageObj.message
        });
      }
    }
    const fail = () => {
      this.beingSubmitted = false;
      this.throwConnectError({alertList: this.mdm_form_alerts});
    }
    return apiService.setMDMConfiguration(mdmConfig).then(success, fail);
  }

  @action breakMDMConnection() {
    const success = () => {
      this.pseMDMObject.clear();
      this.hasBeenSubmitted = false;
      this.resetMDMForm();
      this.showSuccessAlert({
        alertList: this.mdm_form_alerts,
        message: this.userMessages.breakConnectionSuccess
      });
    }
    const fail = () => {
      this.hasBeenSubmitted = true;
      this.showErrorAlert({
        alertList: this.mdm_form_alerts,
        message: this.userMessages.breakConnectionFail
      });
    }
    return apiService.breakMDMConfiguration().then(success, fail);
  }

  @action getMDMStatusForAppCatalog() {
    const success = (apps) => {
      mdmStore.processMDMStatusForAppCatalog(apps);
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
        this.addPushErrorAlert(psk);
      } else if (args.showUserMessageOnSuccess && statusObject.mdm_install_status === 'INSTALLED'){
        this.addPushSuccessAlert(psk);
        this.appsReferencedByAlert.push(psk);
      }
    }
    const fail = () => {
      this.stopPolling(psk);
    }
    return apiService.getSingleMDMStatus(psk).then(success, fail)
  }

  @action processMDMStatusForAppCatalog(apps) {
    let successfullSubmission = false;
    let failedSubmission = false;
    this.appsReferencedByAlert = [];

    apps.forEach(app => {
      if (app.mdm_install_status === 'FAILED') {
        /* Always show error banner if failed installs are present. */
        this.addPushErrorAlert(app.app_psk);
        failedSubmission = true;

      } else if (app.mdm_install_status === 'INSTALLED' && this.mdmStatusIsUnresolved(app.app_psk)) {
        /* Only show success message if the user has just tried
        to install; NOT on initial render. */
        this.addPushSuccessAlert(app.app_psk);
        successfullSubmission = true;
        this.appsReferencedByAlert.push(app.app_psk);
      }
      this.appCatalogMDMStatuses.set(app.app_psk, app.mdm_install_status);
    });

    if (failedSubmission) {
      this.addPushErrorAlert();
    }
    if (successfullSubmission) {
      this.addPushSuccessAlert();
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
      this.addPushErrorAlert(psk);
    }
    this.appCatalogMDMStatuses.set(psk, 'PENDING');
    return apiService.pushToMDM(psk).then(success, fail);
  }

  // @action getAppDetailAlerts(pagePsk) {
  //   this.failedPushApps.forEach(entryPsk => {
  //     if(entryPsk === pagePsk) {
  //       return {
  //         error
  //       }
  //     }
  //   });
  //   return this.failedPushApps.filter((app) => {
  //     return (app.app_psk === psk)
  //   })
  // }

  // //COMPUTEDS
  // @computed get app_detail_alerts() {
  //   return this.failedPushApps.filter((app) => {
  //     return (app.isRecommended)
  //   })
  // }

  // OBSERVABLES
  @observable pseMDMObject = observable.map({});
  @observable userMessages = {
    connectFail: 'There was a problem establishing a connection with MDM.',
    breakConnectionSuccess: 'The connection to MDM has been broken.',
    breakConnectionFail: 'There was a problem breaking the connection with MDM.',
    pushSuccess: 'This app has been pushed to MDM.',
    pushSuccessMultiple: 'The selected apps have been pushed to MDM.',
    pushFail: 'This app could not be pushed to MDM.',
    pushFailMultiple: 'Some or all of the selected apps could not be pushed to MDM.'
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
  @observable mdm_form_alerts = [];
  @observable manage_apps_alerts = [];
  @observable app_detail_alerts = [];
  @observable appsReferencedByAlert = [];

  @observable successPsks = [];
  @observable errorPsks = [];

  // Push to MDM
  @observable appCatalogMDMStatuses = observable.map({});
}

export const mdmStore = new MDMStore();
