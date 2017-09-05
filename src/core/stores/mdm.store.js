import {action, computed, observable} from 'mobx';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';

class MDMStore {
  // ACTIONS
  // Form Functions
  @action updateMDM(mdm_type) {
    this.clearAlerts();
    this.resetMDMForm();

    //set mdm_type to determine which form to show
    this.formData.mdm_type = mdm_type;
    this.initializeFormData({mdm_type});
  }

  @action updateForm(input) {
    this.formHasChanged = true;
    this.formData[input.id] = input.value;
    this.validateMDMForm();
  }

  @action resetMDMForm() {
    this.formData.mdm_type = '';
    this.beingSubmitted = false;
    this.formHasChanged = false;
    this.showExitModal = false;
    this.showbreakMDMConnection = false;

    Object.keys(this.formData).forEach(key => {
      this.formData[key] = undefined;
    });

    this.validateMDMForm();
  }

  @action clearFormField(id) {
    //trigger error by replacing value with empty string
    this.formData[id] = '';

    //change value of uncontrolled form component
    this.formFieldRefs[id].value = '';

    this.validateMDMForm();
  }

  @action clearStoredCredentials() {
    switch (this.formData.mdm_type) {
      case 'AIRWATCH':
        this.clearFormField('aw_password');
        this.clearFormField('aw_userName');
        break;
      case 'MAAS360':
        this.clearFormField('ibm_password');
        this.clearFormField('ibm_userName');
        break;
      case 'MOBILE_IRON':
        this.clearFormField('mi_password');
        this.clearFormField('mi_userName');
        break;
    }
  }

  @action initializeFormData(responseData) {
    /* Note: important to initialize to 'undefined' so errors are not shown
    on the initial form load. */
    let formData = {};
    this.visibleInputArray.forEach(key => {
      formData[key] = responseData ? responseData[key] : undefined;
    });
    this.formData = formData;
  }

  @action submitForm() {
    if (this.isConfigured) {
      //the user is looking at a completed, disabled form
      return;
    } else if (this.mdmFormIsValid) {
      this.beingSubmitted = true;
      this.setMDMConfiguration();
    } else {
      this.mdm_form_alerts = [];
      let message = this.formData.mdm_type
        ? this.userMessages.formError
        : this.userMessages.missingMdm;
      this.showErrorAlert({
        alertList: this.mdm_form_alerts,
        message
      });
    }
  }

  // Alert functions
  @action removeAlert(alertList, idx) {
    const alertToRemove = alertList[idx];
    alertList.splice(idx, 1);

    if(alertToRemove.type === 'error') {
      this.appsReferencedByErrorAlert = [];
    }
  }

  @action clearAlerts({clearSuccessTally}) {
    this.mdm_form_alerts = [];
    this.manage_apps_alerts = [];
    this.app_detail_alerts = [];
    this.appsReferencedByErrorAlert = [];
    /* Do not clear appsReferencedBySuccessAlert unless connection is broken,
    as we generally want a running total */
    if(clearSuccessTally) {
      this.appsReferencedBySuccessAlert = [];
    }
  }

  @action addPushErrorAlert(psk) {
    this.manage_apps_alerts = [];

    //add to reference list if not already there
    if(!this.appsReferencedByErrorAlert.find(item => item == psk)) {
      this.appsReferencedByErrorAlert.push(psk);
    }

    //show alert on Manage Apps page
    this.showErrorAlert({
      alertList: this.manage_apps_alerts,
      message: this.pushFailMultiple
    });

    if(psk) {
      //show alert on App Details page
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

    //add to reference list if not already there
    if(!this.appsReferencedByErrorAlert.find(item => item == psk)) {
      this.appsReferencedBySuccessAlert.push(psk);
    }

    //show alert on Manage Apps page
    this.showSuccessAlert({
      alertList: this.manage_apps_alerts,
      message: this.pushSuccessMultiple
    });

    if(psk) {
      //show alert on App Details page
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
    if(alertForThisPsk[0]) {
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

  // Modal functions
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
      if (this.formHasUnsavedChanges) {
        this.showExitModal = true;
        return false;
      } else {
        return true;
      }
    });
  }

  @action getBrowserCloseAlert = (event) => {
    // Determine if the beforeUnload event should fire in the browser
    if (this.formHasUnsavedChanges) {
      event.returnValue = true;
    }
  };

  // MDM Connection functions
  @action getMDMConfiguration() {
    const success = (resp) => {
      const serviceResponse = resp.data;
      this.pseMDMObject.merge(serviceResponse);

      //set mdm_type to determine which form to show
      this.formData.mdm_type = serviceResponse.mdm_type;
      this.initializeFormData(serviceResponse);
    }
    const fail = () => {
      this.throwConnectError({alertList: this.mdm_form_alerts});
    }
    return apiService.getMDMConfiguration().then(success, fail);
  }

  @action setMDMConfiguration() {
    let mdmConfig = this.mdmConfigDataPacket;
    const success = (resp) => {
      let messageObj = resp.data;
      this.beingSubmitted = false;
      this.mdm_form_alerts = [];

      if (messageObj.error) {
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

        /* Update the pseMDMObject to reflect the new service status,
        including mdm_type/isConfigured */
        this.pseMDMObject.merge(mdmConfig);

        this.showSuccessAlert({
          alertList: this.mdm_form_alerts,
          message: this.userMessages.connectSuccess
        });
      }
    }
    const fail = () => {
      this.mdm_form_alerts = [];
      this.beingSubmitted = false;
      this.throwConnectError({alertList: this.mdm_form_alerts});
    }
    return apiService.setMDMConfiguration(mdmConfig).then(success, fail);
  }

  @action breakMDMConnection() {
    const success = () => {
      this.clearAlerts({clearSuccessTally: true});
      this.pseMDMObject.clear();
      this.hasBeenSubmitted = false;
      this.formData.mdm_type = '';
      this.resetMDMForm();
      this.showSuccessAlert({
        alertList: this.mdm_form_alerts,
        message: this.userMessages.breakConnectionSuccess
      });
    }
    const fail = () => {
      this.clearAlerts({clearSuccessTally: true});
      this.hasBeenSubmitted = true;
      this.showErrorAlert({
        alertList: this.mdm_form_alerts,
        message: this.userMessages.breakConnectionFail
      });
    }
    return apiService.breakMDMConfiguration().then(success, fail);
  }

  // MDM Status Management functions
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
      }
    }
    const fail = () => {
      this.stopPolling(psk);
    }
    return apiService.getSingleMDMStatus(psk).then(success, fail)
  }

  @action processMDMStatusForAppCatalog(apps) {
    this.appsReferencedByErrorAlert = [];
    this.appsReferencedBySuccessAlert = [];
    apps.forEach(app => {
      if (app.mdm_install_status === 'INSTALLED' && this.mdmStatusIsUnresolved(app.app_psk)) {
        /* Only show success message if the user has just tried
        to install; NOT on initial render. */
        this.addPushSuccessAlert(app.app_psk);
      } else if (app.mdm_install_status === 'FAILED') {
        /* Always show error banner if failed installs are present.
        This case should be second so that it overwrites the success
        message on the catalog page, if present (error takes priority). */
        this.addPushErrorAlert(app.app_psk);
      }
      this.appCatalogMDMStatuses.set(app.app_psk, app.mdm_install_status);
    });
  }

  @action mdmStatusIsUnresolved(psk) {
    return this.appCatalogMDMStatuses.get(psk) === 'PENDING' || this.appCatalogMDMStatuses.get(psk) === 'IN_PROGRESS';
  }

  @action stopPolling(psk) {
    //set a status other than PENDING and IN_PROGRESS to stop polling
    this.appCatalogMDMStatuses.set(psk, 'NOT_INSTALLED');
    this.throwConnectError();
  }

  @action pollUntilResolved(psk) {
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
    }
    const fail = () => {
      this.appCatalogMDMStatuses.set(psk, 'FAILED');
      this.addPushErrorAlert(psk);
    }
    this.appCatalogMDMStatuses.set(psk, 'PENDING');
    return apiService.pushToMDM(psk).then(success, fail);
  }

  @action validateMDMForm() {
    let hasError = false;

    /* Note: 'undefined' is reserved for when the form is first initialized,
    or if the field has been cleared due to an error.
    Empty string occurs if the user has modified the field but ultimately
    left it blank.
    Compare to both to determine if error should be shown. */
    Object.keys(this.formData).forEach(key => {
      if(this.formData[key] === '' || this.formData[key] === undefined) {
        hasError = true;
      }
    });

    this.mdmFormIsValid = !hasError;
  }

  // COMPUTEDS
  @computed get isConfigured() {
    return this.pseMDMObject.get('mdm_type') ? true : false
  }

  @computed get formHasUnsavedChanges() {
    return this.formData.mdm_type !== '' && this.formHasChanged
  }

  @computed get visibleInputArray() {
    switch (this.formData.mdm_type) {
      case 'AIRWATCH':
        return ['mdm_type', 'aw_hostName', 'aw_tenantCode', 'aw_userName', 'aw_password'];
      case 'MAAS360':
        return ['mdm_type', 'ibm_rootURL', 'ibm_billingID', 'ibm_userName', 'ibm_password', 'ibm_platformID', 'ibm_appID', 'ibm_appVersion', 'ibm_appAccessKey'];
      case 'MOBILE_IRON':
        return ['mdm_type', 'mi_hostName', 'mi_userName', 'mi_password'];
      default:
        return [];
    }
  }

  @computed get mdmConfigDataPacket() {
    let structure = {
      mdm_type: '',
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
    let data = Object.assign(structure, this.formData);
    return data;
  }

  @computed get pushSuccessMultiple() {
    const num = this.appsReferencedBySuccessAlert.length;
    return num + ' app' + (num === 1 ? '' : 's') + ' have been pushed to MDM.';
  }

  @computed get pushFailMultiple() {
    const num = this.appsReferencedByErrorAlert.length;
    return num + ' app' + (num === 1 ? '' : 's') + ' could not be pushed to MDM.';
  }

  // OBSERVABLES
  // API
  @observable pseMDMObject = observable.map({});
  @observable appCatalogMDMStatuses = observable.map({});

  // Form
  @observable formFieldRefs = [];
  @observable formData = observable.map({});
  @observable beingSubmitted = false;
  @observable hasBeenSubmitted = false;
  @observable formHasChanged = false;
  @observable showExitModal = false;
  @observable showbreakMDMConnection = false;
  @observable interceptedRoute = '';
  @observable mdmFormIsValid = false;

  // Alerts
  @observable mdm_form_alerts = [];
  @observable manage_apps_alerts = [];
  @observable app_detail_alerts = [];
  @observable appsReferencedBySuccessAlert = [];
  @observable appsReferencedByErrorAlert = [];
  @observable userMessages = {
    missingMdm: 'Please select any MDM.',
    formError: 'Please correct the errors below.',
    connectSuccess: 'The MDM connection was successful.',
    connectFail: 'There was a problem establishing a connection with MDM.',
    breakConnectionSuccess: 'The connection to MDM has been broken.',
    breakConnectionFail: 'There was a problem breaking the connection with MDM.',
    pushSuccess: 'This app has been pushed to MDM.',
    pushFail: 'This app could not be pushed to MDM.'
  }
}

export const mdmStore = new MDMStore();
