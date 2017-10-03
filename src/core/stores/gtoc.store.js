import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';

class GTOCStore {
  @action submitForm() {
    const success = () => {
      this.clearForm();
      history.push('/subscribe-to-alerts-success');
    }
    const failure = () => {
      this.showAlert = true;
    }
    apiService.submitGTOCSubscriptionForm(this.values).then(success, failure);
  }

  @action clearForm() {
    this.values = Object.assign({}, this.defaultValues);
    this.showAlert = false;
  }

  @computed get formIsDirty() {
    let formHasChanged = false;
    Object.keys(this.values).forEach(key => {
      if(this.values[key] !== this.defaultValues[key]) {
        formHasChanged = true;
      }
    });
    return formHasChanged;
  }

  @action checkFormForErrors() {
    let hasError = false;
    this.formFieldRefList.forEach(ref => {
      if(ref && ref.hasFunctionalError) {
        hasError = true;
      }
    });
    this.formHasError = hasError;
  }

  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable showAlert = false;
  @observable defaultValues = {
    email: '',
    femaList: []
  };
  @observable values = {
    email: '',
    femaList: []
  };
}

export const gtocStore = new GTOCStore();
