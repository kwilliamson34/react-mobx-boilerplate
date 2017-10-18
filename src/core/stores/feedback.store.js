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

  @action clearForm() {
    this.values = Object.assign({}, this.defaultValues);
    this.showAlert = false;
    this.clearFormFieldRefList();
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

  @action showAllFormErrors() {
    this.formFieldRefList.forEach(ref => {
      if(ref && ref.hasFunctionalError) {
        ref.hasVisibleError = ref.hasFunctionalError;
      }
    });
    this.showAlert = true;
  }

  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable showAlert = false;
  @observable defaultValues = {
    title: '',
    details: '',
    topic: '',
    email: userStore.user.email
  };
  @observable values = {
    title: '',
    details: '',
    topic: '',
    email: userStore.user.email
  };
}

export const feedbackStore = new FeedbackStore();
