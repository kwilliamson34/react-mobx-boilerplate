import {action, observable, computed, autorun} from 'mobx';
import {userStore} from './user.store';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';
import {utilsService} from '../services/utils.service';

class LeadCaptureStore {
  constructor() {
    // check form for errors
    autorun(() => {
      // check that initial values are available before valudating for the first time
      if(userStore.userValidationDone) {
        let hasError = false;
        this.formFieldRefList.forEach(ref => {
          if(ref && ref.hasFunctionalError) {
            hasError = true;
          }
        });
        this.formHasError = hasError;
      }
    })
  }

  @action setCurrentSolution(solutionName) {
    this.solutionName = solutionName;
  }

  @action toggleContactAgreement() {
    this.values.contactAgreement = !this.values.contactAgreement;
  }

  @action recordSolutionRequestInCookie() {
    if (this.solutionsRequested.indexOf(this.solutionName) < 0) {
      let solutionsRequestedCopy = this.solutionsRequested;
      solutionsRequestedCopy.push(this.solutionName);
      utilsService.setCookie('_fn_lc_solutions_requested', JSON.stringify(solutionsRequestedCopy));
    }
  }

  @action submitForm() {
    const success = () => {
      this.recordSolutionRequestInCookie();
      this.clearForm();
      this.showSuccess = true;
      history.go(-1);
    }
    const failure = () => {
      this.alertText = 'An unknown error occured. Please try again later.';
      this.showAlert = true;
    }
    apiService.submitLeadCaptureForm(this.values, this.solutionName).then(success, failure);
  }

  @action clearForm() {
    this.values = Object.assign({}, this.defaultValues);
    this.solutionName = '';
    this.showAlert = false;
    this.clearFormFieldRefList();
  }

  @action clearAlert() {
    this.showAlert = false;
  }

  @action clearSuccess() {
    this.showSuccess = false;
  }

  @action clearFormFieldRefList() {
    this.formFieldRefList = [];
  }

  @computed get formIsDirty() {
    let formHasChanged = false;
    Object.keys(this.values).forEach(key => {
      if (this.values[key] !== this.defaultValues[key]) {
        formHasChanged = true;
      }
    });
    return formHasChanged;
  }

  @action showSuccess() {
    this.showSuccess = true;
  }

  @action hideSuccess() {
    this.showSuccess = false;
  }

  @computed get solutionAlreadyRequested() {
    return this.solutionName && utilsService.getCookie('_fn_lc_solutions_requested').indexOf(this.solutionName) > -1;
  }

  @computed get solutionsRequested() {
    let solutionsRequested = utilsService.getCookie('_fn_lc_solutions_requested');
    if (!solutionsRequested || solutionsRequested === '') {
      return [];
    } else {
      return JSON.parse(solutionsRequested)
    }
  }

  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable alertText = 'Please fix the following errors.';
  @observable showAlert = false;
  @observable showSuccess = false;
  @observable solutionName = '';
  @observable defaultValues = {
    title: '',
    firstName: userStore.user.firstName,
    lastName: userStore.user.lastName,
    email: userStore.user.email,
    phone: userStore.user.phone,
    message: '',
    contactAgreement: false
  };
  @observable values = {
    title: '',
    firstName: userStore.user.firstName,
    lastName: userStore.user.lastName,
    email: userStore.user.email,
    phone: userStore.user.phone,
    message: '',
    contactAgreement: false
  };
}

export const leadCaptureStore = new LeadCaptureStore();
