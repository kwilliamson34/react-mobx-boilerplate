import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';

class FeedbackStore {
  //Form event handler actions
  @action handleChange(e) {
    e.preventDefault();
    let input = e.target;
    if(input.dataset.charlimit && input.id) {
      this.feedbackObject[input.id] = input.value.substr(0, input.dataset.charlimit);
      console.log('right', this.feedbackObject[input.id]);
    } else if (input.id) {
      this.feedbackObject[input.id] = input.value;
    }
  }

  @action handleBlur(e) {
    e.preventDefault();
    let input = e.target;
    this.validateInput(input);
    if (this.showAlertBar && this.requiredFieldsEntered) {
      this.toggleAlertBar();
    }
  }

  @action handleSubmit(e) {
    e.preventDefault();
    let form = e.target;
    const inputs = this.parseForm(form);
    this.showAlertBar = false;
    for (var i = 0; i < inputs.length; ++i) {
      this.validateInput(inputs[i]);
    }
    if (this.formIsValid) {
      let data = {};
      for (let key in this.feedbackObject) {
        data[key.replace('feedback_', '')] = this.feedbackObject[key];
      }
      const success = () => {
        this.clearForm();
        history.push('/feedback-success');
      }
      const failure = (res) => {
        //change history to allow user to navigate back to here from error page.
        history.push('/feedback');
        utilsService.handleError(res);
      }
      apiService.submitCustomerFeedbackForm(data).then(success, failure);
    } else {
      this.showAlertBar = true;
    }
  }

  //Other actions
  @action validateInput(input) {
    if (input.id.indexOf('email') > -1) {
      this.hasErrors[input.id] = !this.isEmpty(input.value) && !utilsService.isValidEmailAddress(input.value);
    } else if(input.id){
      this.hasErrors[input.id] = this.isEmpty(this.feedbackObject[input.id]);
    }
  }

  parseForm = (form) => {
    return form.querySelectorAll('input, select, textarea');
  }

  isEmpty = (string) => {
    if(string && string.trim()) {
      return false;
    }
    return true;
  }

  @action toggleAlertBar() {
    this.showAlertBar = !this.showAlertBar;
  }

  @action clearForm() {
    this.showAlertBar = false;
    for (let key in this.feedbackObject) {
      if (key === 'feedback_email') {
        this.feedbackObject[key] = userStore.user.email || '';
      } else {
        this.feedbackObject[key] = '';
      }
    }
    for (let key in this.hasErrors) {
      this.hasErrors[key] = false;
    }
  }

  @action setDefaultEmail() {
    if (this.isEmpty(this.feedbackObject.feedback_email)) {
      this.feedbackObject.feedback_email = userStore.user.email || '';
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
      if (key !== 'feedback_email' && this.isEmpty(this.feedbackObject[key])) requiredFieldsEntered = false;
    }
    return requiredFieldsEntered;
  }

  @computed get formHasEntries() {
    return !this.isEmpty(this.feedbackObject.feedback_title) || !this.isEmpty(this.feedbackObject.feedback_details);
  }

  @observable showAlertBar = false;
  @observable feedbackObject = {
    feedback_title: '',
    feedback_details: '',
    feedback_topic: '',
    feedback_email: ''
  };
  @observable hasErrors = {
    feedback_title: false,
    feedback_details: false,
    feedback_topic: false,
    feedback_email: false
  };
}

export const feedbackStore = new FeedbackStore();
