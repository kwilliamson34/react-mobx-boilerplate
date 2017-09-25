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
    return !this.isEmpty(this.values._title) || !this.isEmpty(this.values.details);
  }

  isEmpty = (string) => {
    if(string && string.trim()) {
      return false;
    }
    return true;
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
