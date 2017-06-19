import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';

class FeedbackStore {

  @action submitForm(form) {
    const inputs = form.querySelectorAll('input, select');
    console.log('inputs   ', inputs);
    for (var i = 0; i < inputs.length && inputs[i].id !== 'feedback-email'; i++) {
      this.hasErrors[inputs[i].id.replace('feedback-', '')] = inputs[i].value === '';
    }
    if (this.formIsValid) {
      //awaiting service integration;
      console.log('Form submitted!  ', this.feedbackObject);
    }
  }

  @action changeValue(input) {
    this.feedbackObject[input.id.replace('feedback-', '')] = input.value;
  }

  @computed get formIsValid() {
    return Object.keys(this.hasErrors).every((v) => this.hasErrors[v] === false);
  }

  @computed get requiredFieldsEntered() {
    return Object.keys(this.feedbackObject).every((v) => this.feedbackObject[v].length > 0);
  }

  @observable feedbackObject = {
    title: '',
    details: '',
    topic: '',
    email: ''
  };
  @observable hasErrors = {
    title: false,
    details: false,
    topic: false
  };
}

export const feedbackStore = new FeedbackStore();
