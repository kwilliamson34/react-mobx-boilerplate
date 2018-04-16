import {action, observable, computed, autorun} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';
import {history} from '../services/history.service';

class FeedbackStore {
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
    });
  }

  @action submitForm() {
    const success = () => {
      this.clearForm();
      this.alertToDisplay = '';
      history.push('/success');
    }
    const failure = () => {
      history.push('/error');
    }
    apiService.submitFeedbackForm(this.values).then(success, failure);
  }

  @action toggleContactAgreement() {
    this.contactAgreement = !this.contactAgreement;
  }

  @action clearForm() {
    this.clearFormFieldRefList();
    this.values = Object.assign({}, this.defaultValues);
    this.contactAgreement = false;
    this.alertToDisplay = '';
  }

  @action updateAlert(alertText) {
    this.alertToDisplay = alertText;
  }

  @action clearFormFieldRefList() {
    this.formFieldRefList = [];
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

  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable alertToDisplay = '';
  @observable contactAgreement = false;
  @observable defaultValues = {
    topic: '',
    subject: '',
    details: '',
    operatingSystem: '',
    email: userStore.user.email,
    phoneNo: userStore.user.phone,
    likely: ''
  };
  @observable values = Object.assign({}, this.defaultValues);
}

export const feedbackStore = new FeedbackStore();
