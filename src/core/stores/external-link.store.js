import { action, observable, computed } from 'mobx';
import { apiService } from '../services/api.service';
import { utilsService } from '../services/utils.service';


class ExternalLinkStore {
  /*
  ** Retrieve Devices from Marketing Portal
  */
  @action getMarketingPortalDevices() {
    const success = (res) => {
      this.devicesData = res;
    }
    const fail = (res) => {
      utilsService.handleError(res);
    }
    apiService.getMarketingPortalDevices().then(success, fail);
  }

  @action getDeviceCategoryItems() {
    const success = (res) => {
      this.currentCategoryData = res;
    }
    const fail = (res) => {
      utilsService.handleError(res);
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
      utilsService.handleError(res);
    }
    apiService.getDeviceDetail(devicePath).then(success, fail);
  }

  @action getSolutionCards(queryString) {
    const success = (res) => {
      this.solutionCards = res;
    }

    const fail = (res) => {
      utilsService.handleError(res);
    }

    apiService.getSolutionCards(queryString).then(success, fail);
  }

  @action getSolutionHeaderImg(queryString) {
    const success = (res) => {
      this.solutionHeaderImg = res;
    }

    const fail = (res) => {
      utilsService.handleError(res);
    }

    apiService.getSolutionHeaderImg(queryString).then(success, fail);
  }


  @action resetCategoryData() {
    this.currentCategoryData = {
      title: '',
      intro: '',
      items: []
    };
  }

  @action resetDeviceDetail() {
    this.currentDeviceDetail  = {
      path: '',
      features: [],
      deviceName: '',
      deviceImg: '',
      deviceImgAlt: ''
    };
  }

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

  @observable solutionCards = [];
  @observable solutionHeaderImg = '';

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
