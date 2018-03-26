import {action, observable, computed, autorun} from 'mobx';
import {userStore} from './user.store';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';
import {utilsService} from '../services/utils.service';

class LeadCaptureStore {
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

  @action setCurrentSolution(solutionName) {
    // FPSE-1953 AT&T is URI decoded as AT&amp;T which causes problems with cookies et al, so additionally replace it before setting it.
    solutionName = solutionName.replace(/&amp;/g, '&');
    this.solutionName = solutionName;
  }

  @action toggleContactAgreement() {
    this.values.contactAgreement = !this.values.contactAgreement;
  }

  @action recordSolutionRequestInCookie() {
    if (this.solutionsRequested.indexOf(this.solutionName) < 0) {
      let solutionsRequestedCopy = this.solutionsRequested;
      solutionsRequestedCopy.push(this.solutionName);
      utilsService.setCookie('_fn_lc_solutions_requested', JSON.stringify(solutionsRequestedCopy));
    }
  }

  @action submitForm() {
    const success = () => {
      const solutionToReturnTo = history.location.pathname.substr(0, history.location.pathname.lastIndexOf('/'))
      this.recordSolutionRequestInCookie();
      this.clearForm();
      this.updateSuccess('Your request has been received. A specialist will be contacting you soon.');
      history.replace(solutionToReturnTo);
    }
    const failure = () => {
      this.updateAlert('An unknown error occured. Please try again later.');
    }
    apiService.submitLeadCaptureForm(this.values, this.solutionName).then(success, failure);
  }

  @action clearForm() {
    this.values = Object.assign({}, this.defaultValues);
    this.setCurrentSolution('');
    this.updateAlert('');
    this.clearFormFieldRefList();
  }

  @action updateAlert(alertText) {
    this.alertToDisplay = alertText;
  }

  @action updateSuccess(successText) {
    this.successToDisplay = successText;
  }

  @action clearFormFieldRefList() {
    this.formFieldRefList = [];
  }

  @computed get formIsDirty() {
    let formHasChanged = false;
    Object.keys(this.values).forEach(key => {
      if (this.values[key] !== this.defaultValues[key]) {
        formHasChanged = true;
      }
    });
    return formHasChanged;
  }

  @computed get solutionAlreadyRequested() {
    return this.solutionName && utilsService.getCookie('_fn_lc_solutions_requested').indexOf(this.solutionName) > -1;
  }

  @computed get solutionsRequested() {
    let solutionsRequested = utilsService.getCookie('_fn_lc_solutions_requested');
    if (!solutionsRequested || solutionsRequested === '') {
      return [];
    } else {
      return JSON.parse(solutionsRequested)
    }
  }

  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable alertToDisplay = '';
  @observable successToDisplay = '';
  @observable solutionName = '';
  @observable defaultValues = {
    title: '',
    firstName: userStore.user.firstName,
    lastName: userStore.user.lastName,
    email: userStore.user.email,
    phone: userStore.user.phone,
    message: '',
    contactAgreement: false
  };
  @observable values = Object.assign({}, this.defaultValues);
}

export const leadCaptureStore = new LeadCaptureStore();
