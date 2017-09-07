import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';

class GTOCStore {

  //Form event handler actions
  @action handleChange(e) {
    let input = e.target;
    if(input.id === 'gtoc_email') {
      this.gtocObject[input.id] = input.value;
    } else if (input.type === 'checkbox') {
      this.gtocObject.gtoc_femaList.indexOf(input.value) < 0
        ? this.gtocObject.gtoc_femaList.push(input.value)
        : this.gtocObject.gtoc_femaList.remove(input.value);
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
      for (let key in this.gtocObject) {
        data[key.replace('gtoc_', '')] = this.gtocObject[key];
      }
      const success = () => {
        this.clearForm();
        history.push('/subscribe-to-alerts-success');
      }
      const failure = (res) => {
        //prevent the unsaved changes modal from showing, and change history to allow user to navigate back to here from error page.
        this.disableSaveDialogs();
        history.push('/subscribe-to-alerts');
        utilsService.handleError(res);
      }
      apiService.submitGTOCSubscriptionForm(data).then(success, failure);
    } else {
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
    if (input.id === 'gtoc_email') {
      this.hasErrors.gtoc_email = this.isEmpty(input.value) || !utilsService.isValidEmailAddress(input.value);
    }
    else if(input.type === 'checkbox'){
      this.hasErrors.gtoc_femaList = this.gtocObject.gtoc_femaList.length === 0;
    }
  }

  //Modal actions
  getBrowserCloseAlert = (event) => {
    if (this.formHasEntries) {
      event.returnValue = true;
    } else {
      return;
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

  //other actions
  @action toggleAlertBar() {
    this.showAlertBar = !this.showAlertBar;
  }

  @action clearForm() {
    this.showExitModal = false;
    this.showAlertBar = false;
    this.gtocObject = {
      gtoc_email: '',
      gtoc_femaList: []
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

  @computed get formHasEntries() {
    return !this.isEmpty(this.gtocObject.gtoc_email);
  }


  @observable showExitModal = false;
  @observable interceptedRoute = '';
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
