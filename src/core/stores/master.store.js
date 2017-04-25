import { action, computed, observable } from 'mobx';
//import { apiService } from '../services/api.service';


class PSEStore {

	// ACTIONS
  @action nameFieldChange(value) {
    this.nameFieldStr = value;
  }

  // COMPUTEDS
  @computed get lastNameAdded() {
    return this.names[this.names.length - 1];
  }

	// OBSERVABLES
  @observable names = [];

}

export const pseStore = new PSEStore();
