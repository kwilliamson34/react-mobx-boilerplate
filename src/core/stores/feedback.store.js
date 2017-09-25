import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';
import {history} from '../services/history.service';

class FeedbackStore {
  @action submitForm() {
    const success = () => {
      this.clearForm();
      history.push('/feedback-success');
    }
    const failure = () => {
      this.showAlert = true;
    }
    apiService.submitCustomerFeedbackForm(this.values).then(success, failure);
  }

  @action clearForm() {
    this.values = this.defaultValues;
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

  @observable showAlert = false;
  @observable hasError = false;
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
