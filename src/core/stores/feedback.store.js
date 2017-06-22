import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';

class FeedbackStore {

  @action submitForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    console.log('inputs   ', inputs);
    this.showAlertBar = false;
    this.hasBeenSubmitted = false;
    for (var i = 0; i < inputs.length && inputs[i].id !== 'feedback_email'; i++) {
      this.hasErrors[inputs[i].id] = inputs[i].value === '';
    }
    if (this.formIsValid) {
      console.log('Form submitted!  ', this.feedbackObject);
      // apiService.submitCustomerFeedbackForm(this.feedbackObject)
      // .then((res) => {
      //   console.log('RES.DATA    ', res.data);
        this.clearFeedbackForm();
      // })
      // .catch((res) => {
      //   utilsService.handleError(res);
      // })
    }
    else {
      this.showAlertBar = true;
    }
  }

  @action changeValue(input) {
    this.feedbackObject[input.id] = input.value;
  }

  @action validateInput(input) {
    this.hasErrors[input.id] = this.feedbackObject[input.id].length === 0;
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

  @action discardFormChanges() {
      this.showExitModal = false;
      this.clearFeedbackForm();
  }

  @action clearFeedbackForm() {
    console.log('FORM CLEAARED');
    this.showExitModal = false;
    this.hasBeenSubmitted = false;
    for (let prop in this.feedbackObject) {
      this.feedbackObject[prop] = '';
    }
    for (let prop in this.hasErrors) {
      this.hasErrors[prop] = false;
    }
    // Object.keys(this.feedbackObject).forEach((v) => this.feedbackObject[v] = '');
    // Object.keys(this.hasErrors).forEach((v) => this.hasErrors[v] = false);
  }

  @computed get formIsValid() {
    for (let prop in this.hasErrors) {
      if (this.hasErrors[prop]) {
        return false;
      }
    }
    return true;
  }

  @computed get requiredFieldsEntered() {
    let requiredFieldsEntered = true;
    for (let prop in this.feedbackObject) {
      if (prop !== 'feedback_email' && !this.feedbackObject[prop].length) requiredFieldsEntered = false;
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
    feedback_topic: false
  };
}

export const feedbackStore = new FeedbackStore();
