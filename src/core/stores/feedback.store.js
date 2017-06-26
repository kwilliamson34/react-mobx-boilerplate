import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';
import {utilsService} from '../services/utils.service';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class FeedbackStore {

  @action submitForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    this.showAlertBar = false;
    this.hasBeenSubmitted = false;
    for (var i = 0; i < inputs.length; ++i) {
      if (inputs[i].id !== 'feedback_email') {
        this.hasErrors[inputs[i].id] = inputs[i].value === '';
      } else if (inputs[i].id === 'feedback_email') {
        this.hasErrors[inputs[i].id] = inputs[i].value.length > 0 ? !emailRegex.test(inputs[i].value) : false;
      }
    }
    if (this.formIsValid) {
      let data = {};
      for (let key in this.feedbackObject) {
        data[key.replace('feedback_', '')] = this.feedbackObject[key];
      }
      const success = () => {
        this.hasBeenSubmitted = true;
        this.clearFeedbackForm();
      }
      const failure = (res) => {
        utilsService.handleError(res);
        this.showExitModal = false;
      }
      apiService.submitCustomerFeedbackForm(data)
      .then(success, failure);
    } else {
      this.showAlertBar = true;
      this.submissionAttempted = true;
    }
  }

  @action changeValue(input, num) {
    this.feedbackObject[input.id] = input.value.substr(0, num);
  }

  @action validateInput(input) {
    if (input.id !== 'feedback_email') {
      this.hasErrors[input.id] = this.feedbackObject[input.id].length === 0;
    } else if (input.id === 'feedback_email') {
      this.hasErrors[input.id] = input.value.length > 0 ? !emailRegex.test(input.value) : false;
    }
    if (this.showAlertBar && this.requiredFieldsEntered) {
      this.toggleAlertBar();
    }
  }

  @action toggleExitModal() {
      this.showExitModal = !this.showExitModal;
  }

  @action toggleHasBeenSubmitted() {
    this.hasBeenSubmitted = !this.hasBeenSubmitted;
  }

  @action toggleAlertBar() {
    this.showAlertBar = !this.showAlertBar;
  }

  @action clearFeedbackForm() {
    this.showExitModal = false;
    for (let key in this.feedbackObject) {
      this.feedbackObject[key] = '';
    }
    for (let key in this.hasErrors) {
      this.hasErrors[key] = false;
    }
  }

  @action setDefaultEmail() {
    if (this.feedbackObject.feedback_email === '') {
      this.feedbackObject.feedback_email = userStore.user.email;
    }
  }

  @computed get formIsValid() {
    for (let key in this.hasErrors) {
      if (this.hasErrors[key]) {
        return false;
      }
    }
    return true;
  }

  @computed get requiredFieldsEntered() {
    let requiredFieldsEntered = true;
    for (let key in this.feedbackObject) {
      if (key !== 'feedback_email' && !this.feedbackObject[key].length) requiredFieldsEntered = false;
    }
    return requiredFieldsEntered;
  }

  @computed get formHasEntries() {
    let formHasEntries = false;
    if (this.feedbackObject.feedback_title.length || this.feedbackObject.feedback_details.length) formHasEntries = true;
    return formHasEntries;
  }

  @observable showExitModal = false;
  @observable showAlertBar = false;
  @observable hasBeenSubmitted = false;
  @observable feedbackObject = {
    feedback_title: '',
    feedback_details: '',
    feedback_topic: '',
    feedback_email: userStore.user.email
  };
  @observable hasErrors = {
    feedback_title: false,
    feedback_details: false,
    feedback_topic: false,
    feedback_email: false
  };
}

export const feedbackStore = new FeedbackStore();
