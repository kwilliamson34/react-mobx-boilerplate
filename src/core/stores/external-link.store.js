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

  @computed get pushToTalkLink() {
    if(this.pushToTalkProvider === 'ATT') {
      return this.managePushToTalkKodiakLink;
    } else if(this.pushToTalkProvider === 'FN') {
      return this.managePushToTalkMotorolaLink;
    }
    return '';
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
  @observable manageServicesLink = 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn';
  @observable viewWirelessReportsLink = 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn?requestedPage=downloadReports';
  @observable shopStandardDevicesLink = 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn';
}

export const externalLinkStore = new ExternalLinkStore();
