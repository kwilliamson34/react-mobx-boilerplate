import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';
import {history} from '../services/history.service';

class LeadCaptureStore {
  @action toggleContactAgreement() {
    this.values.contactAgreement = !this.values.contactAgreement;
    //validate after a short delay, allowing the store to re-render the checkbox
    setTimeout(this.checkFormForErrors.bind(this), 100);
  }

  @action submitForm() {
    if(this.formHasError) {
      this.showAllFormErrors();
      return;
    }
    const success = () => {
      this.clearForm();
      this.showSuccess = true;
      history.back();
    }
    const failure = () => {
      this.showAllFormErrors();
    }
    apiService.submitLeadCaptureForm(this.values, this.solutionName).then(success, failure);
  }

  @action clearForm() {
    this.values = Object.assign({}, this.defaultValues);
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

  @observable formFieldRefList = [];
  @observable formHasError = true;
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
