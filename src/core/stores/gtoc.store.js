import {action, observable, computed, autorun} from 'mobx';
import {userStore} from './user.store';

import {successPage} from '../services/success-page.service';
import {apiService} from '../services/api.service';
// import {history} from '../services/history.service';

class GTOCStore {
  constructor() {
    // check form for errors
    autorun(() => {
      // check that initial values are available before validating for the first time
      if(userStore.userValidationDone) {
        let hasError = false;
        this.formFieldRefList.forEach(ref => {
          if(ref && ref.hasFunctionalError) {
            hasError = true;
          }
        });
        this.formHasError = hasError;
      }
    })
  }

  @action submitForm() {
    if (this.values.gtocSelection === 'Subscribe to alerts') {
      this.subscribeToGTOC();
    }
    else if (this.values.gtocSelection === 'Unsubscribe') {
      this.unsubscribeFromGTOC();
    }
  }

  @action subscribeToGTOC() {
    const success = () => {
      this.clearForm();
      successPage({
        pageTitle: 'We&apos;ve received your request.',
        message: 'Processing your subscription can take up to 24 hours, after which you will start receiving alert notifications.',
        contactUs: true,
        returnToUrl: '/network',
        returnToButtonText: 'Network'
      });
    }
    const failure = () => {
      this.updateAlert('An unknown error occured. Please try again later.');
    }
    apiService.subscribeToGTOC(this.values).then(success, failure);
  }

  @action unsubscribeFromGTOC() {
    const success = () => {
      this.clearForm();
      successPage({
        pageTitle: 'We&apos;ve received your request.',
        message: 'Cancelling your subscription can take up to 24 hours, after which you will stop receiving alert notifications.',
        contactUs: true,
        returnToUrl: '/network',
        returnToButtonText: 'Network'
      });
    }
    const failure = () => {
      this.updateAlert('An unknown error occured. Please try again later.');
    }
    apiService.unsubscribeFromGTOC(this.values.email).then(success, failure);
  }

  @action clearForm() {
    this.values = JSON.parse(JSON.stringify(this.defaultValues));
    this.updateAlert('');
    this.clearFormFieldRefList();
  }

  @action updateAlert(alertText) {
    this.alertToDisplay = alertText;
  }

  @action clearFormFieldRefList() {
    this.formFieldRefList = [];
  }

  @computed get formIsDirty() {
    let formHasChanged = false;
    Object.keys(this.values).forEach(key => {
      //exclude gtocSelection to prevent Unsaved Changes modal from triggering after RadioGroup change.
      if (this.values[key].toString() !== this.defaultValues[key].toString()) {
        formHasChanged = true;
      }
    });
    return formHasChanged;
  }

  @action selectAll() {
    this.values.femaList = ['Region I: Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont','Region II: New Jersey, New York, Puerto Rico, Virgin Islands','Region III: District of Columbia, Delaware, Maryland, Pennsylvania, Virginia, West Virginia','Region IV: Alabama, Florida, Georgia, Kentucky, Mississippi, North Carolina, South Carolina, Tennessee','Region V: Illinois, Indiana, Michigan, Minnesota, Ohio, Wisconsin','Region VI: Arkansas, Louisiana, New Mexico, Oklahoma, Texas','Region VII: Iowa, Kansas, Missouri, Nebraska','Region VIII: Colorado, Montana, North Dakota, South Dakota, Utah, Wyoming','Region IX: Arizona, California, Hawaii, Nevada, Pacific Islands','Region X: Alaska, Idaho, Oregon, Washington'];
  }

  @action clearAll() {
    this.values.femaList = [];
  }

  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable alertToDisplay = '';
  @observable defaultValues = {
    gtocSelection: '',
    email: userStore.user.email,
    femaList: []
  };
  @observable values = JSON.parse(JSON.stringify(this.defaultValues));
}

export const gtocStore = new GTOCStore();
