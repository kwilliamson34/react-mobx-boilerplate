import {action, computed, observable, autorun} from 'mobx';
import {apiService} from '../services/api.service';

class MDMStore {
  constructor() {
    // check form for errors
    autorun(() => {
      let hasError = false;
      this.formFieldRefList.forEach(ref => {
        if(ref && ref.hasFunctionalError) {
          hasError = true;
        }
      });
      this.formHasError = hasError;
    })
  }

  // ACTIONS
  // Form Functions
  @action updateMDM(mdm_type) {
    this.clearForm();
    this.values.mdm_type = mdm_type;
  }

  @action clearStoredCredentials() {
    this.values = Object.assign(this.values, {
      aw_password: '',
      aw_userName: '',
      ibm_password: '',
      ibm_userName: '',
      mi_password: '',
      mi_userName: ''
    });
  }

  @action clearForm() {
    this.clearAlerts();
    this.values = Object.assign({}, this.defaultValues);
    this.showbreakMDMConnection = false;
  }

  // Alert functions
  @action removeAlert(alertList, idx) {
    const alertToRemove = alertList[idx];
    alertList.splice(idx, 1);

    if(alertToRemove.type === 'error') {
      this.appsReferencedByErrorAlert = [];
    }
  }

  @action clearAlerts(args) {
    this.mdm_form_alerts = [];
    this.manage_apps_alerts = [];
    this.app_detail_alerts = [];
    this.appsReferencedByErrorAlert = [];
    /* Do not clear appsReferencedBySuccessAlert unless connection is broken,
    as we generally want a running total */
    if(args && args.clearSuccessTally) {
      this.appsReferencedBySuccessAlert = [];
    }
  }

  @action addPushErrorAlert(psk) {
    //add to reference list if not already there
    if(!this.appsReferencedByErrorAlert.find(item => item == psk)) {
      this.appsReferencedByErrorAlert.push(psk);
    }

    //show alert on Manage Apps page
    this.updateAlert({
      alertList: this.manage_apps_alerts,
      type: 'error',
      message: this.pushFailMultiple,
      psk: 'generic_error'
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
    //add to reference list if not already there
    if(!this.appsReferencedBySuccessAlert.find(item => item == psk)) {
      this.appsReferencedBySuccessAlert.push(psk);
    }

    //show alert on Manage Apps page
    this.updateAlert({
      alertList: this.manage_apps_alerts,
      type: 'success',
      message: this.pushSuccessMultiple,
      psk: 'generic_success'
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
    })[0];
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

  // Modal functions
  @action togglebreakMDMConnection() {
    this.showbreakMDMConnection = !this.showbreakMDMConnection;
  }

  // MDM Connection functions
  @action getMDMConfiguration() {
    const success = (resp) => {
      this.values = Object.assign({}, this.defaultValues, resp.data);
      if(this.values.mdm_type) {
        this.mdmIsConfigured = true;
      }
    }
    const fail = () => {
      this.throwConnectError({alertList: this.mdm_form_alerts});
      this.mdmIsConfigured = false;
    }
    return apiService.getMDMConfiguration().then(success, fail);
  }

  @action submitForm() {
    if(this.formHasError) {
      this.showAllFormErrors();
      return;
    }
    const success = (resp) => {
      let messageObj = resp.data;
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
        this.mdmIsConfigured = true;
        this.showSuccessAlert({
          alertList: this.mdm_form_alerts,
          message: this.userMessages.connectSuccess
        });
      }
    }
    const fail = () => {
      this.mdm_form_alerts = [];
      this.throwConnectError({alertList: this.mdm_form_alerts});
    }
    return apiService.setMDMConfiguration(this.values).then(success, fail);
  }

  @action breakMDMConnection() {
    const success = () => {
      this.clearAlerts({clearSuccessTally: true});
      this.clearForm();
      this.mdmIsConfigured = false;

      this.showSuccessAlert({
        alertList: this.mdm_form_alerts,
        message: this.userMessages.breakConnectionSuccess
      });
    }
    const fail = () => {
      this.clearAlerts({clearSuccessTally: true});
      this.showErrorAlert({
        alertList: this.mdm_form_alerts,
        message: this.userMessages.breakConnectionFail
      });
    }
    return apiService.breakMDMConfiguration().then(success, fail);
  }

  // MDM Status Management functions
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

  @action processMDMStatusForAppCatalog({apps, addBatchAlerts}) {
    this.appsReferencedByErrorAlert = [];
    this.appsReferencedBySuccessAlert = [];
    apps.forEach(app => {
      if (app.mdm_install_status === 'INSTALLED' && this.mdmStatusIsUnresolved(app.app_psk)) {
        /* Only show success message if the user has just tried
        to install; NOT on initial render. */
        this.addPushSuccessAlert(app.app_psk);
      } else if (app.mdm_install_status === 'FAILED' && addBatchAlerts) {
        /* Show error banner on initial render if failed installs are present.
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

  // COMPUTEDS
  @computed get pushSuccessMultiple() {
    const num = this.appsReferencedBySuccessAlert.length;
    return num + ' app' + (num === 1 ? ' has' : 's have') + ' been pushed to MDM.';
  }

  @computed get pushFailMultiple() {
    const num = this.appsReferencedByErrorAlert.length;
    return num + ' app' + (num === 1 ? '' : 's') + ' could not be pushed to MDM.';
  }

  @computed get formIsDirty() {
    let formHasChanged = false;
    Object.keys(this.values).forEach(key => {
      if(this.values[key] !== this.defaultValues[key]) {
        formHasChanged = true;
      }
    });
    return formHasChanged;
  }

  @action showAllFormErrors() {
    this.formFieldRefList.forEach(ref => {
      if(ref && ref.hasFunctionalError) {
        ref.hasVisibleError = ref.hasFunctionalError;
      }
    });
    this.showErrorAlert({
      alertList: this.mdm_form_alerts,
      message: 'Please fix the following errors.'
    });
  }

  // OBSERVABLES
  // API
  @observable appCatalogMDMStatuses = observable.map({});
  @observable mdmIsConfigured = false;

  // Form
  @observable showbreakMDMConnection = false;
  @observable formFieldRefList = [];
  @observable formHasError = true;

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

  @observable defaultValues = {
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
  }
  @observable values = {
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
  }
}

export const mdmStore = new MDMStore();
