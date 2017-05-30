import { action, observable } from 'mobx';
import { apiService } from '../services/api.service';

class ExternalContentStore {
  /*
  ** Retrieve Devices from Marketing Portal
  */
  @action getMPDevices() {
    const success = (res) => {
      this.devicesData = res;
    }

    const fail = (res) => {
      console.log('MPDevice fetch failed\n' + res);
    }

    apiService.getMPDevices().then(success, fail);
  }

  @action getPublicSafetySolutions() {
    const success = (res) => {
      this.solutionsArray = res;
    }

    const fail = (res) => {
      console.log('getPublicSafetySolutions fetch failed\n' + res);
    }

    apiService.getPublicSafetySolutions().then(success, fail);
  }

  @observable devicesData = {
    phones: [],
    tablets: [],
    invehicles: [],
    accessories: []
  };
  @observable solutionsArray = [];


}

export const mpStore = new ExternalContentStore();
