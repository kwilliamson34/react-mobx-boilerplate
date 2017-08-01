import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';

class FeedbackStore {

  getBrowserCloseAlert = (event) => {
    if (this.formHasEntries) {
      event.returnValue = true;
    } else {
      return;
    }
  }

  parseForm = (form) => {
    return form.querySelectorAll('input, select, textarea');
  }

  hasSomeText = (string) => {
    const _string = string.trim();
    return _string.length > 0;
  }

  @action submitForm(form) {
    const inputs = this.parseForm(form);
    this.showAlertBar = false;
    this.hasBeenSubmitted = false;
    for (var i = 0; i < inputs.length; ++i) {
      if (inputs[i].id !== 'feedback_email') {
        this.hasErrors[inputs[i].id] = !this.hasSomeText(inputs[i].value);
      } else if (inputs[i].id === 'feedback_email') {
        this.hasErrors[inputs[i].id] = this.hasSomeText(inputs[i].value) && !utilsService.testEmailRegex(inputs[i].value);
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
        //prevent the unsaved changes modal from showing, and change history to allow user to navigate back to here from error page.
        this.disableSaveDialogs();
        history.push('/feedback');
        utilsService.handleError(res);
      }
      apiService.submitCustomerFeedbackForm(data)
      .then(success, failure);
    } else {
      this.showAlertBar = true;
    }
  }

  @action changeValue(input, num) {
    this.feedbackObject[input.id] = input.value.substr(0, num);
  }

  @action validateInput(input) {
    if (input.id !== 'feedback_email') {
      this.hasErrors[input.id] = !this.hasSomeText(this.feedbackObject[input.id]);
    } else if (input.id === 'feedback_email') {
      this.hasErrors[input.id] = this.hasSomeText(input.value) && !utilsService.testEmailRegex(input.value);
    }
    if (this.showAlertBar && this.requiredFieldsEntered) {
      this.toggleAlertBar();
    }
  }

  @action toggleExitModal() {
      this.showExitModal = !this.showExitModal;
  }

  @action disableSaveDialogs() {
      window.removeEventListener('beforeunload', this.getBrowserCloseAlert);
      this.unblock();
  }

  @action enableSaveDialogs() {
      window.addEventListener('beforeunload', this.getBrowserCloseAlert);
      this.unblock = history.block((location) => {
        this.interceptedRoute = location.pathname;
        if (!this.formHasEntries) {
          return true;
        } else {
          this.showExitModal = true;
          return false;
        }
    });
  }

  @action toggleHasBeenSubmitted() {
    this.hasBeenSubmitted = !this.hasBeenSubmitted;
  }

  @action toggleAlertBar() {
    this.showAlertBar = !this.showAlertBar;
  }

  @action clearFeedbackForm() {
    this.showExitModal = false;
    this.showAlertBar = false;
    for (let key in this.feedbackObject) {
      if (key === 'feedback_email') {
        this.feedbackObject[key] = userStore.user.email;
      } else {
        this.feedbackObject[key] = '';
      }
    }
    for (let key in this.hasErrors) {
      this.hasErrors[key] = false;
    }
  }

  @action setDefaultEmail() {
    if (!this.hasSomeText(this.feedbackObject.feedback_email)) {
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
      if (key !== 'feedback_email' && !this.hasSomeText(this.feedbackObject[key])) requiredFieldsEntered = false;
    }
    return requiredFieldsEntered;
  }

  @computed get formHasEntries() {
    let formHasEntries = false;
    if (this.hasSomeText(this.feedbackObject.feedback_title) || this.hasSomeText(this.feedbackObject.feedback_details)) formHasEntries = true;
    return formHasEntries;
  }

  @observable showExitModal = false;
  @observable showAlertBar = false;
  @observable hasBeenSubmitted = false;
  @observable interceptedRoute = '';
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
