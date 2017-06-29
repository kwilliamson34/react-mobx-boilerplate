import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';
import {externalDeviceContentService} from '../services/external-device-content.service';
import {externalSolutionsService} from '../services/external-solutions.service';

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

  @action fetchAndShowDeviceCategory() {
    if(this.deviceCategoryIsValid){
      this.currentDeviceCategoryData = externalDeviceContentService.filterDeviceCategoryData(this.allSpecializedDevices, this.currentDeviceCategory);
    } else {
      history.replace('/admin/devices');
    }
  }

  @action fetchAndShowDeviceDetails(devicePath) {
    let device = this.fetchDeviceDetails(devicePath);
    if (device.length === 1) {
      this.currentDeviceDetail = externalDeviceContentService.filterDeviceDetailData(device[0]);
      this.currentPurchasingInfo = externalDeviceContentService.filterDevicePurchasingInfo(device[0]);
    } else {
      history.replace('/error');
    }
  }

  @action fetchDeviceDetails(devicePath) {
    return this.allSpecializedDevices.filter((device) => {
      let _devicePath = encodeURIComponent(device.device_title).replace(/%20/g, '+');
      return  _devicePath === devicePath;
    })
  }

  //TODO: restore when API issues are sorted. Currently setting from copied data put in mock files;
  // @action fetchSolutionDetails() {
  //   const success = (res) => {
  //     console.log('RESSSSSS     ', res);
  //   }
  //
  //   const fail = (res) => {
  //     console.log('RUROH', res);
  //     // utilsService.handleError(res);
  //   }
  //
  //   return apiService.getMarketingPortalSolutionDetails().then(success, fail);
  // }
  //
  @action fetchSolutionCategories() {
    const success = (res) => {
      this.solutionCategories = res;
    }

    const fail = (res) => {
      utilsService.handleError(res);
    }

    return apiService.getMarketingPortalSolutionCategories().then(success, fail);
  }

  @action fetchAndShowSolutionCategory() {
    if(this.solutionCategoryIsValid){
      this.currentSolutionCategoryData = externalSolutionsService.filterSolutionCategoryData(this.allSolutionDetails, this.currentSolutionCategory);
    } else {
      history.replace('/admin/solutions');
    }
  }

  @action fetchAndShowSolutionDetails(solutionPath) {
    let solution = this.fetchSolutionDetails(solutionPath);
    if (solution.length === 1) {
      this.currentSolutionDetail = externalSolutionsService.filterSolutionDetailData(solution[0]);
      this.currentPurchasingInfo = externalDeviceContentService.filterPurchasingInfo(solution[0]);
    } else {
      history.replace('/error');
    }
  }

  @action fetchSolutionDetails(solutionPath) {
    return this.allSolutionDetails.filter((solution) => {
      return solutionPath.replace(/\+/g, ' ') === solution.promo_title.toLowerCase();
    })
  }

  @action resetDeviceCategoryData() {
    this.currentDeviceCategoryData = {
      title: '',
      intro: '',
      items: []
    };
  }

  @action resetSolutionDetail() {
    this.currentSolutionDetail = {
      title: '',
      body: ''
    }
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

  @action resetSolutionCategoryData() {
    this.currentSolutionCategoryData = {
      title: '',
      cards: []
    }
  }

  //COMPUTEDS
  @computed get deviceCategoryIsValid() {
    let deviceCategories = ['phones', 'tablets', 'in-vehicle', 'accessories'];
    let categoryIndex = deviceCategories.indexOf(this.currentDeviceCategory);
    return categoryIndex >= 0;
  }

  @computed get solutionCategoryIsValid() {
    let solutionCategories = ['tools', 'device-security', 'secured-connections', 'cloud-services'];
    let categoryIndex = solutionCategories.indexOf(this.currentSolutionCategory);
    return categoryIndex >= 0;
  }

  @computed get showPurchasingInfo() {
    let showPurchasingInfo = false;
    for (let key in this.currentPurchasingInfo) {
      if (this.currentPurchasingInfo[key] !== '') {
        showPurchasingInfo = true;
      }
    }
    return showPurchasingInfo;
  }

  @observable allSolutionDetails = [];
  @observable solutionCategories = [];

  @observable currentSolutionCategory = '';
  @observable currentSolutionCategoryData = {
    title: '',
    cards: []
  }
  @observable currentSolutionDetail = '';
  @observable currentSolutionDetailData = {
    title: '',
    body: ''
  }

  @observable allSpecializedDevices = [];
  @observable currentDeviceCategory = '';
  @observable devicesData = {
    phones: [],
    tablets: [],
    invehicle: [],
    accessories: []
  };
  @observable currentDeviceCategoryData = {
    title: '',
    intro: '',
    items: []
  };
  @observable currentDeviceDetail = {
    path: '',
    features: '',
    deviceName: '',
    deviceImg: '',
    deviceImgAlt: ''
  };

  @observable currentPurchasingInfo: {};

  @observable manageUsersLink = 'https://test-profilemgt.firstnet.att.com/ebiz/firstnet/';
  @observable manageServicesLink = 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn';
  @observable viewWirelessReportsLink = 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn?requestedPage=downloadReports';
  @observable shopStandardDevicesLink = 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn';
  @observable manageMyProfileLink = 'https://test-profilemgt.firstnet.att.com/ebiz/firstnet/';
}

export const externalLinkStore = new ExternalLinkStore();
