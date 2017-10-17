import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';
import {history} from '../services/history.service';

class FeedbackStore {
  @action submitForm() {
    if(this.formHasError) {
      this.showAllFormErrors();
      return;
    }
    const success = () => {
      this.clearForm();
      history.push('/feedback-success');
    }
    const failure = () => {
      this.showAllFormErrors();
    }
    apiService.submitCustomerFeedbackForm(this.values).then(success, failure);
  }

  @action toggleContactAgreement() {
    this.values.contactAgreement = !this.values.contactAgreement;
    setTimeout(this.checkFormForErrors.bind(this), 0);
  }

  @action clearForm() {
    this.values = Object.assign({}, this.defaultValues);
    this.showAlert = false;
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

  @computed get formIsDirty() {
    let formHasChanged = false;
    Object.keys(this.values).forEach(key => {
      if(this.values[key] !== this.defaultValues[key]) {
        formHasChanged = true;
      }
    });
    return formHasChanged;
  }

  @computed get showContactAgreement() {
    return this.values.email.length > 0;
  }

  @computed get emailIsRequired() {
    const topicsRequiringEmail = [
      'Credential & Account Management',
      'Purchasing & Provisioning',
      'Billing & Payment'
    ];
    let emailIsRequired = false;
    topicsRequiringEmail.forEach(topic => {
      if (this.values.topic === topic) {
        emailIsRequired = true;
      }
    });
    return emailIsRequired;
  }

  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable showAlert = false;
  @observable defaultValues = {
    topic: '',
    subject: '',
    details: '',
    operatingSystem: '',
    email: userStore.user.email,
    phone: '',
    likelihood: '',
    contactAgreement: ''
  };
  @observable values = {
    topic: '',
    subject: '',
    details: '',
    operatingSystem: '',
    email: userStore.user.email,
    phone: '',
    likelihood: '',
    contactAgreement: ''
  };
}

export const feedbackStore = new FeedbackStore();
