import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';

class GTOCStore {
  @action submitForm() {
    if(this.formHasError) {
      this.showAlert = true;
      return;
    }
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
      if(this.values[key].toString() !== this.defaultValues[key].toString()) {
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

  @action selectAll() {
    this.values.femaList = ['Region I: Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont','Region II: New Jersey, New York, Puerto Rico, Virgin Islands','Region III: District of Columbia, Delaware, Maryland, Pennsylvania, Virginia, West Virginia','Region IV: Alabama, Florida, Georgia, Kentucky, Mississippi, North Carolina, South Carolina, Tennessee','Region V: Illinois, Indiana, Michigan, Minnesota, Ohio, Wisconsin','Region VI: Arkansas, Louisiana, New Mexico, Oklahoma, Texas','Region VII: Iowa, Kansas, Missouri, Nebraska','Region VIII: Colorado, Montana, North Dakota, South Dakota, Utah, Wyoming','Region IX: Arizona, California, Hawaii, Nevada, Pacific Islands','Region X: Alaska, Idaho, Oregon, Washington'];
  }

  @action clearAll() {
    this.values.femaList = [];
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
