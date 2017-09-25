import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';
import {history} from '../services/history.service';

class FeedbackStore {

  @action onChange(target, value) {
    this.values[target] = value;
  }

  @action submitForm() {
    const success = () => {
      this.clearForm();
      history.push('/feedback-success');
    }
    const failure = () => {
      this.showAlert = true;
      this.hasError = true;
    }
    apiService.submitCustomerFeedbackForm(this.values).then(success, failure);
  }

  @action clearForm() {
    this.values = this.defaultValues;
    this.showAlert = false;
    this.hasError = false;
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
    feedback_title: '',
    feedback_details: '',
    feedback_topic: '',
    feedback_email: userStore.user.email
  };
  @observable values = {
    feedback_title: '',
    feedback_details: '',
    feedback_topic: '',
    feedback_email: userStore.user.email
  };
}

export const feedbackStore = new FeedbackStore();
