import { action, observable, computed } from 'mobx';
import { apiService } from '../services/api.service';

class ExternalLinkStore {
  /*
  ** Retrieve Devices from Marketing Portal
  */
  @action getMarketingPortalDevices() {
    const success = (res) => {
      this.devicesData = res;
    }
    const fail = (res) => {
      console.log('MPDevice fetch failed\n' + res);
    }
    apiService.getMarketingPortalDevices().then(success, fail);
  }

  @action getDeviceCategoryItems() {
    const success = (res) => {
      this.currentCategoryData = res;
    }
    const fail = (res) => {
      console.log('Device Category Items fetch failed\n' + res);
    }
    if(this.deviceCategoryNum){
      apiService.getDeviceCategory(this.deviceCategoryNum).then(success, fail);
    }
  }

  @action getDeviceDetail(devicePath) {
    const success = (res) => {
      this.currentDeviceDetail = res;
      this.currentDeviceDetail.path = devicePath;
    }
    const fail = (res) => {
      console.log('MPDevice Detail fetch failed\n' + res);
    }
    apiService.getDeviceDetail(devicePath).then(success, fail);
  }

  @action getPSSCells(queryString) {
    const success = (res) => {
      this.cellsArray = res;
    }

    const fail = (res) => {
      console.log('getPSSCells fetch failed\n' + res);
    }

    apiService.getPSSCells(queryString).then(success, fail);
  }

  @action getPSSHeaderImg(queryString) {
    const success = (res) => {
      this.headerImg = res;
    }

    const fail = (res) => {
      console.log('getPSSHeaderImg fetch failed\n' + res);
    }

    apiService.getPSSHeaderImg(queryString).then(success, fail);
  }

  // @action getPSSDetails(queryString) {
  //   const success = (res) => {
  //     this.pssDetails = res;
  //   }
  //
  //   const fail = (res) => {
  //     console.log('getPSSDetails fetch failed\n' + res);
  //   }
  //
  //   apiService.getPSSDetails(queryString).then(success, fail);
  // }


  //COMPUTEDS
  @computed get deviceCategoryNum() {
    let deviceCategories = ['phones', 'tablets', 'in-vehicle', 'accessories'];
    let categoryIndex = deviceCategories.indexOf(this.currentCategory);
    return (categoryIndex >= 0)? categoryIndex + 1 : undefined;
  }

  @observable devicesData = {
    phones: [],
    tablets: [],
    invehicle: [],
    accessories: []
  };

  @observable cellsArray = [];
  @observable headerImg = '';
  @observable pssDetails = {};

  @observable currentCategory = '';
  @observable currentCategoryData = {
    title: '',
    intro: '',
    items: []
  };
  @observable currentDeviceDetail = {
    path: '',
    features: [],
    deviceName: '',
    deviceImg: '',
    deviceImgAlt: ''
  };

  @observable manageUsersLink = 'https://profilemgt.firstnet.att.com/ebiz/firstnet/index.jsp';
  @observable manageServicesLink = 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn';
  @observable managePushToTalkKodiakLink = 'https://wgp.eptt.kodiaknetworks.com/cat/view/catui';
  @observable managePushToTalkMotorolaLink = 'https://firstnet.att.com/ptt_upm';
  @observable viewWirelessReportsLink = 'https://www.wireless.att.com/businesscare/menu/index.jsp?subject=Reports&wtLinkName=Reports&wtLinkLoc=S1&&wtLinkType=InventoryReport';
  @observable shopStandardDevicesLink = '';



}

export const externalLinkStore = new ExternalLinkStore();
