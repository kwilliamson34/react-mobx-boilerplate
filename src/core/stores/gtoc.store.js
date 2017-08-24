import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';

class GTOCStore {

  //Form event handler actions
  @action handleChange(e) {
    let input = e.target;
    // console.log('change', input);
    if(input.id === 'gtoc_email') {
      this.gtocObject[input.id] = input.value;
    } else if (input.type === 'checkbox') {
      // console.log('GO GO GO', this.gtocObject.gtoc_femaList.indexOf(input.value));
      this.gtocObject.gtoc_femaList.indexOf(input.value) < 0
        ? this.gtocObject.gtoc_femaList.push(input.value)
        : this.gtocObject.gtoc_femaList.remove(input.value);
    }
    // console.log('this.gtocObject', this.gtocObject.gtoc_femaList);
  }

  @action handleBlur(e) {
    e.preventDefault();
    let input = e.target;
    // console.log('input', input);
    this.validateInput(input);
    if (this.showAlertBar && this.requiredFieldsEntered) {
      this.toggleAlertBar();
    }
  }

  @action handleSubmit(e) {
    e.preventDefault();
    let form = e.target;
    const inputs = this.parseForm(form);
    console.log('inputs', inputs);
    this.showAlertBar = false;
    for (var i = 0; i < inputs.length; ++i) {
      this.validateInput(inputs[i]);
    }
    if (this.formIsValid) {

      let data = {};
      for (let key in this.feedbackObject) {
        data[key.replace('gtoc_', '')] = this.gtocObject[key];
      }
      const success = () => {
        this.clearForm();
        history.push('/subscribe-to-alerts-success');
      }
      const failure = (res) => {
        //prevent the unsaved changes modal from showing, and change history to allow user to navigate back to here from error page.
        // this.disableSaveDialogs();
        history.push('/subscribe-to-alerts');
        utilsService.handleError(res);
      }
      apiService.submitGTOCSubscriptionForm(data).then(success, failure);
    } else {
      console.log('DUHOH');
      this.showAlertBar = true;
    }
  }

  //Validation actions
  parseForm = (form) => {
    return form.querySelectorAll('input');
  }

  isEmpty = (string) => {
    if(string && string.trim()) {
      return false;
    }
    return true;
  }

  @action validateInput(input) {
    if (input.id.indexOf('gtoc_email') > -1) {
      this.hasErrors.gtoc_email = !this.isEmpty(input.value) && !utilsService.isValidEmailAddress(input.value);
    }
    // else if(input.type === 'checkbox'){
    //   this.hasErrors.gtoc_femaList = !this.hasErrors.gtoc_femaList.length;
    // }
  }

  //other actions
  @action toggleAlertBar() {
    this.showAlertBar = !this.showAlertBar;
  }

  @action clearForm() {
    this.showExitModal = false;
    this.showAlertBar = false;
    this.gtocObject = {
      email: '',
      femaList: []
    }
    for (let key in this.hasErrors) {
      this.hasErrors[key] = false;
    }
  }

  @computed get requiredFieldsEntered() {
    let requiredFieldsEntered = true;
    if (this.isEmpty(this.gtocObject.gtoc_email) || !utilsService.isValidEmailAddress(this.gtocObject.gtoc_email)) {
      requiredFieldsEntered = false;
    }
    if (this.gtocObject.gtoc_femaList.length === 0) {
      requiredFieldsEntered = false;
    }
    return requiredFieldsEntered;
  }

  @computed get formIsValid() {
    for (let key in this.hasErrors) {
      if (this.hasErrors[key]) {
        return false;
      }
    }
    return true;
  }

  @observable showAlertBar = false;
  @observable gtocObject = {
    gtoc_email: '',
    gtoc_femaList: []
  }
  @observable hasErrors = {
    gtoc_email: false,
    gtoc_femaList: false
  }
}

export const gtocStore = new GTOCStore();
