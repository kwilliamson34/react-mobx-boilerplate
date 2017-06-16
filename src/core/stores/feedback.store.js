import {action, observable} from 'mobx';
import {apiService} from '../services/api.service';
import {userStore} from './user.store';

class FeedbackStore {

  @action submitForm(form) {
    let inputs = form.querySelectorAll('input, select');
    console.log('inputs   ', inputs);
    for (var i = 0; i < inputs.length; i++) {
      this.feedbackObject[inputs[i].id.replace('feedback-', '')] = inputs[i].value;
    }
    console.log('this.feedbackObject   ', this.feedbackObject);
    this.validateForm();
  }

  @action validateForm() {
    this.errorObject = 
  }

  @observable feedbackObject = {};
  @observable errorObject = {};
  @observable formIsValid = false;
}

export const feedbackStore = new FeedbackStore();
