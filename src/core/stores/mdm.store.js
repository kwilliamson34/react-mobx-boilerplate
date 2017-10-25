import {action, computed, observable, autorun} from 'mobx';
import {apiService} from '../services/api.service';
import {appCatalogStore} from './app-catalog.store';

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
    this.showAlert = false;
    this.values = Object.assign({}, this.defaultValues);
    this.showbreakMDMConnection = false;
    this.clearFormFieldRefList();
  }

  @action clearAlert() {
    console.log('here');
    this.showAlert = false;
    this.appsReferencedByErrorAlert = [];
  }

  @action clearSuccess() {
    this.showSuccess = false;
    this.appsReferencedBySuccessAlert = [];
  }

  @action clearFormFieldRefList() {
    this.formFieldRefList = [];
    this.formHasError = true;
  }

  // Alert functions
  @action removeAlert(alertList, idx) {
    const alertToRemove = alertList[idx];
    alertList.splice(idx, 1);

    if(alertToRemove.type === 'error') {
      this.appsReferencedByErrorAlert = [];
    }
  }

  @action addPushErrorAlert(psk) {
    //add to reference list if not already there
    if(!this.appsReferencedByErrorAlert.find(item => item == psk)) {
      this.appsReferencedByErrorAlert.push(psk);
    }
  }

  @action addPushSuccessAlert(psk) {
    //add to reference list if not already there
    if(!this.appsReferencedBySuccessAlert.find(item => item == psk)) {
      this.appsReferencedBySuccessAlert.push(psk);
    }
  }

  @action throwConnectError() {
    this.alertText = this.userMessages.connectFail;
    this.showAlert = true;
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
      this.throwConnectError();
      this.mdmIsConfigured = false;
    }
    return apiService.getMDMConfiguration().then(success, fail);
  }

  @action submitForm() {
    const success = (resp) => {
      let messageObj = resp.data;
      if (messageObj.error) {
        this.alertText = messageObj.error;
        this.showAlert = true;
        if (messageObj.error.toLowerCase().includes('credentials')) {
          this.clearStoredCredentials();
        }
      } else {
        this.mdmIsConfigured = true;
        this.successText = this.userMessages.connectSuccess;
        this.showSuccess = true;
      }
    }
    const fail = () => {
      this.throwConnectError();
    }
    return apiService.setMDMConfiguration(this.values).then(success, fail);
  }

  @action breakMDMConnection() {
    const success = () => {
      this.clearForm();
      this.showAllFormErrors = false;
      this.showAlertOnManageApps = false;
      this.appsReferencedByErrorAlert = [];
      this.appsReferencedBySuccessAlert = [];
      this.mdmIsConfigured = false;
      this.successText = this.userMessages.breakConnectionSuccess;
      this.showSuccess = true;
    }
    const fail = () => {
      this.alertText = this.userMessages.breakConnectionFail;
      this.showAlert = true;
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

  @computed get showAlertOnManageApps() {
    return this.appsReferencedByErrorAlert.length > 0;
  }

  @computed get showSuccessOnManageApps() {
    return this.appsReferencedBySuccessAlert.length > 0;
  }

  @computed get showAlertOnAppDetails() {
    return this.appsReferencedByErrorAlert.find(psk => psk == appCatalogStore.currentAppObject.app_psk) !== undefined;
  }

  @computed get showSuccessOnAppDetails() {
    return this.appsReferencedBySuccessAlert.find(psk => psk == appCatalogStore.currentAppObject.app_psk) !== undefined;
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

  // OBSERVABLES
  // API
  @observable appCatalogMDMStatuses = observable.map({});
  @observable mdmIsConfigured = false;

  // Form
  @observable showbreakMDMConnection = false;
  @observable formFieldRefList = [];
  @observable formHasError = true;

  // Alerts
  @observable alertText = 'Please fix the following errors.';
  @observable showAlert = false;
  @observable successText = '';
  @observable showSuccess = false;

  @observable appsReferencedBySuccessAlert = [];
  @observable appsReferencedByErrorAlert = [];
  @observable userMessages = {
    missingMdm: 'Please select any MDM.',
    formError: 'Please correct the errors below.',
    connectSuccess: 'The MDM connection was successful.',
    connectFail: 'There was a problem establishing a connection with MDM.',
    breakConnectionSuccess: 'The connection to MDM has been broken.',
    breakConnectionFail: 'There was a problem breaking the connection with MDM.'
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
