import { action, computed, observable } from 'mobx';
//import { apiService } from '../services/api.service';

import { homeStore } from './home.store';
import { searchStore } from './search.store';
import { headerStore } from './header.store';

class PSEStore {

  constructor() {
    this.homeStore = homeStore;
    this.searchStore = searchStore;
    this.headerStore = headerStore;
  }

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

export const pseMasterStore = new PSEStore();
