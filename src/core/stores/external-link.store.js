import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';
import {externalDeviceContentService} from '../services/external-device-content.service';


class ExternalLinkStore {
  /*
  ** Retrieve Devices from Marketing Portal
  */
  @action fetchDevicesData() {
    const success = (res) => {
      this.allSpecializedDevices = externalDeviceContentService.filterDeviceData(res);
    }
    const fail = (res) => {
      utilsService.handleError(res);
    }
    return apiService.getMarketingPortalDevices().then(success, fail);
  }

  @action getDeviceLandingData() {
    let _devicesData = externalDeviceContentService.filterDeviceLandingData(this.allSpecializedDevices);
    this.devicesData = _devicesData;
  }

  @action getDeviceCategoryData() {
    if(this.deviceCategoryIsValid){
      this.currentCategoryData = externalDeviceContentService.filterDeviceCategoryData(this.allSpecializedDevices, this.currentCategory);
    } else {
      history.replace('/devices');
    }
  }

  @action getDeviceDetailData(devicePath) {
    const success = (res) => {
      let detail = filterDeviceCategoryData(res, devicePath);

      this.currentDeviceDetail = res;
      this.currentDeviceDetail.path = devicePath;
    }
    const fail = (res) => {
      utilsService.handleError(res);
    }
    apiService.getMarketingPortalDevices().then(success, fail);
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

  @action togglePushToTalkModal() {
    this.showPushToTalkModal = !this.showPushToTalkModal;
  }

  @action setPushToTalkProvider(providerCode) {
    this.pushToTalkProvider = providerCode;
  }

  //COMPUTEDS
  @computed get deviceCategoryIsValid() {
    let deviceCategories = ['phones', 'tablets', 'in-vehicle', 'accessories'];
    let categoryIndex = deviceCategories.indexOf(this.currentCategory);
    return categoryIndex >= 0;
  }

  @computed get pushToTalkLink() {
    if(this.pushToTalkProvider === 'ATT') {
      return this.managePushToTalkKodiakLink;
    } else if(this.pushToTalkProvider === 'FN') {
      return this.managePushToTalkMotorolaLink;
    }
    return '';
  }

  @observable allSpecializedDevices = [];

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
  @observable shopStandardDevicesLink = 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn';

  @observable showPushToTalkModal = false;
  @observable pushToTalkProvider = '';
}

export const externalLinkStore = new ExternalLinkStore();
