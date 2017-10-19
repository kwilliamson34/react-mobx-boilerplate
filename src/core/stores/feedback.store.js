import {action, observable, computed, autorun} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';
import {history} from '../services/history.service';

class FeedbackStore {
  constructor() {
    // check form for errors
    autorun(() => {
      // check that initial values are available before valudating for the first time
      if(userStore.userValidationDone) {
        let hasError = false;
        this.formFieldRefList.forEach(ref => {
          if(ref && ref.hasFunctionalError) {
            // ensure that hidden checkbox doesn't prevent form submission if it still has a functional error;
            if (ref.refs.input.id === 'contactAgreement' && !this.requireContactAgreement) {
              return;
            } else {
              hasError = true;
            }
          }
        });
        this.formHasError = hasError;

        if(!this.requireContactAgreement) {
          // ensure contactAgreement doesn't render checked when user deletes their email and enters a new one;
          this.contactAgreement = false;
        }
      }
    })
  }

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
    this.contactAgreement = !this.contactAgreement;
  }

  @action clearForm() {
    this.values = Object.assign({}, this.defaultValues);
    this.contactAgreement = false;
    this.showAlert = false;
    this.clearFormFieldRefList();
  }

  @action clearFormFieldRefList() {
    this.formFieldRefList = [];
  }

  @action showAllFormErrors() {
    this.formFieldRefList.forEach(ref => {
      if(ref && ref.hasFunctionalError) {
        ref.hasVisibleError = ref.hasFunctionalError;
      }
    });
    this.showAlert = true;
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

  @computed get requireContactAgreement() {
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
  @observable contactAgreement = false;
  @observable defaultValues = {
    topic: '',
    subject: '',
    details: '',
    operatingSystem: '',
    email: userStore.user.email,
    phone: userStore.user.phone,
    likely: ''
  };
  @observable values = {
    topic: '',
    subject: '',
    details: '',
    operatingSystem: '',
    email: userStore.user.email,
    phone: userStore.user.phone,
    likely: ''
  };
}

export const feedbackStore = new FeedbackStore();
