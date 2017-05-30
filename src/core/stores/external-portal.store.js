import { action, observable, computed } from 'mobx';
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

  @action getMPDeviceDetail(deviceLink){
    apiService.getMPDeviceDetail(deviceLink).then(success, fail);
  } 

  //COMPUTEDS
  @computed get deviceCategoryNum() {
    let deviceCategories = ['phones', 'tablets', 'invehicle', 'accessories'];
    let categoryIndex = deviceCategories.indexOf(this.currentCategory);
    return (categoryIndex >= 0)? categoryIndex + 1 : 0;
  }

  //OBSERVABLES
  @observable devicesData = {
    phones: [],
    tablets: [],
    invehicle: [],
    accessories: []
  };

  @observable currentCategory = '';
  @observable currentDeviceId = '';

}

export const mpStore = new ExternalContentStore();
