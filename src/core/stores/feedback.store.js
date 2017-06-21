import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';

class FeedbackStore {

  @action submitForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    console.log('inputs   ', inputs);
    for (var i = 0; i < inputs.length && inputs[i].id !== 'feedback-email'; i++) {
      this.hasErrors[inputs[i].id.replace('feedback-', '')] = inputs[i].value === '';
    }
    if (this.formIsValid) {
      //TODO: awaiting service integration;
      console.log('Form submitted!  ', this.feedbackObject);
      this.hasBeenSubmitted = true;
      // this.clearFeedbackForm();
    }
    else {
      this.showAlertBar = true;
    }
  }

  @action changeValue(input) {
    this.feedbackObject[input.id.replace('feedback-', '')] = input.value;
  }

  @action validateInput(input) {
    let id = input.id.replace('feedback-', '');
    this.hasErrors[id] = this.feedbackObject[id].length === 0;
  }

  @action toggleExitModal() {
      this.showExitModal = !this.showExitModal;
  }

  @action toggleAlertBar() {
    this.showAlertBar = !this.showAlertBar;
  }

  @action discardFormChanges() {
      this.showExitModal = false;
      this.hasBeenSubmitted = false;
      this.clearFeedbackForm();
  }

  @action clearFeedbackForm() {
    this.showExitModal = false;
    Object.keys(this.feedbackObject).forEach((v) => this.feedbackObject[v] = '');
    Object.keys(this.hasErrors).forEach((v) => this.hasErrors[v] = false);
  }

  @computed get formIsValid() {
    return Object.keys(this.hasErrors).every((v) => this.hasErrors[v] === false);
  }

  @computed get requiredFieldsEntered() {
    let requiredFieldsEntered = true;
    for (let key in this.feedbackObject) {
      if (key !== 'email' && !this.feedbackObject[key].length) requiredFieldsEntered = false;
    }
    return requiredFieldsEntered;
  }

  @computed get formHasEntries() {
    let formHasEntries = false;
    if (this.feedbackObject.title.length && this.feedbackObject.details.length) formHasEntries = true;
    return formHasEntries;
  }

  @observable showExitModal = false;
  @observable showAlertBar = false;
  @observable hasBeenSubmitted = false;
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
