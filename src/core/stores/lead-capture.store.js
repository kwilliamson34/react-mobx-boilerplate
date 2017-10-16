import {action, observable, computed} from 'mobx';
import {userStore} from './user.store';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';
import {utilsService} from '../services/utils.service';

class LeadCaptureStore {
  @action toggleContactAgreement() {
    this.values.contactAgreement = !this.values.contactAgreement;
    //validate after render stack has finished
    setTimeout(this.checkFormForErrors.bind(this), 0);
  }

  @action recordSolutionRequestInCookie() {
    if (this.solutionsRequested.indexOf(this.solutionName) === -1) {
      this.solutionsRequested.push(this.solutionName);
      utilsService.setCookie('_fn_lc_solutions_requested', JSON.stringify(this.solutionsRequested));
    }
  }

  @action submitForm() {
    if(this.formHasError) {
      this.showAllFormErrors();
      return;
    }
    const success = () => {
      this.recordSolutionRequestInCookie();
      this.clearForm();
      this.showSuccess = true;
      history.go(-1);
    }
    const failure = () => {
      this.showAllFormErrors();
    }
    apiService.submitLeadCaptureForm(this.values, this.solutionName).then(success, failure);
  }

  @action clearForm() {
    this.values = Object.assign({}, this.defaultValues);
    this.solutionName = '';
    this.showAlert = false;
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
    this.showAlert = true;
  }

  @action checkFormForErrors() {
    let hasError = false;
    this.formFieldRefList.forEach(ref => {
      if(ref && ref.hasFunctionalError) {
        hasError = true;
      }
    });
    this.formHasError = hasError;
  }

  @computed get solutionAlreadyRequested() {
    return utilsService.getCookie('_fn_lc_solutions_requested').indexOf(this.solutionName) > -1;
  }

  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable showAlert = false;
  @observable showSuccess = false;
  @observable solutionName = '';
  @observable solutionsRequested = [];
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
