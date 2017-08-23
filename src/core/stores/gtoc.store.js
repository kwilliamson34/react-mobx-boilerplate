import {action, observable, computed} from 'mobx';
// import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';

class GTOCStore {

  //Form event handler actions
  @action handleChange(e) {
    e.preventDefault();
    let input = e.target;
    console.log('change', input);
    if(input.dataset.charlimit && input.id) {
      this.gtocObject[input.id] = input.value.substr(0, input.dataset.charlimit);
    } else if(input.id) {
      this.gtocObject[input.id] = input.value;
    }
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
    this.showAlertBar = false;
    for (var i = 0; i < inputs.length; ++i) {
      this.validateInput(inputs[i]);
    }
    if (this.formIsValid) {
      console.log('SUCCESS!!!!');
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
      this.hasErrors[input.id] = !this.isEmpty(input.value) && !utilsService.isValidEmailAddress(input.value);
    } else if(input.id){
      this.hasErrors[input.id] = this.isEmpty(this.gtocObject[input.id]);
    }
  }

  //other actions
  @action toggleAlertBar() {
    this.showAlertBar = !this.showAlertBar;
  }

  @action clearForm() {
    this.showExitModal = false;
    this.showAlertBar = false;
    // this.gtocObject = {
    //   email: '',
    //   femaList: []
    // }
    this.gtocObject = {
      email: ''
    }
    for (let key in this.hasErrors) {
      this.hasErrors[key] = false;
    }
  }

  //email will need validation
  @computed get requiredFieldsEntered() {
    let requiredFieldsEntered = true;
    for (let key in this.gtocObject) {
      if (key === 'gtoc_email') {
        if (this.isEmpty(this.gtocObject[key]) || !utilsService.isValidEmailAddress(this.gtocObject[key])) {
          requiredFieldsEntered = false;
        }
      } else {
        if (this.isEmpty(this.gtocObject[key])) requiredFieldsEntered = false;
      }
    }
    return requiredFieldsEntered;
  }

  @observable showAlertBar = false;
  @observable gtocObject = {
    gtoc_email: ''
  }
  @observable hasErrors = {
    gtoc_email: false
  }
}

export const gtocStore = new GTOCStore();
