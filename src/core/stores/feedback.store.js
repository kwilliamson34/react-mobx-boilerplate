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
    }
  }

  @action changeValue(input) {
    this.feedbackObject[input.id.replace('feedback-', '')] = input.value;
  }

  @action toggleExitModal() {
      this.showExitModal = !this.showExitModal;
  }

  @action discardFormChanges() {
      this.showExitModal = false;
      this.resetFeedbackForm();
  }

  @action resetFeedbackForm() {
    this.showExitModal = false;
    this.hasBeenSubmitted = false;
    Object.keys(this.feedbackObject).forEach((v) => this.feedbackObject[v] = '');
    Object.keys(this.hasErrors).forEach((v) => this.hasErrors[v] = false);
  }

  // @action validateForm() {
  //   let inputs = Object.keys(this.feedbackObject);
  //   for (var i = 0; i < inputs.length && inputs[i].id !== 'email'; i++) {
  //     this.hasErrors[inputs[i]] = inputs[i] === '';
  //   }
  // }

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
    for (let key in this.feedbackObject) {
      if (this.feedbackObject[key].length) formHasEntries = true;
    }
    return formHasEntries;
  }

  @observable showExitModal = false;
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
