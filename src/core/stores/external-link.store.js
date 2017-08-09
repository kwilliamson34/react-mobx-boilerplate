import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';
import {externalDeviceContentService} from '../services/external-device-content.service';
import {externalSolutionsService} from '../services/external-solutions.service';
import config from 'config';

class ExternalLinkStore {
  /*
  ** Retrieve Devices from Marketing Portal
  */
  @action getDevicesData() {
    const success = (res) => {
      this.allSpecializedDevices = externalDeviceContentService.filterDeviceData(res);
    }
    const fail = (res) => {
      utilsService.handleError(res);
    }
    return apiService.getMarketingPortalDevices().then(success, fail);
  }

  @action fetchDeviceLandingData() {
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
      this.currentPurchasingInfo = externalDeviceContentService.filterPurchasingInfo(device[0]);
    } else {
      history.replace('/error');
    }
  }

  @action fetchDeviceDetails(devicePath) {
    return this.allSpecializedDevices.filter((device) => {
      let _devicePath = utilsService.getDevicesAndSolutionsUrl(device.device_title);
      return  _devicePath === devicePath;
    })
  }

  @action getSolutionDetails() {
    const success = (res) => {
      this.allSolutionDetails = res;
    }

    const fail = (res) => {
      utilsService.handleError(res);
    }

    return apiService.getMarketingPortalSolutionDetails().then(success, fail);
  }

  @action getSolutionCategories() {
    const success = (res) => {
      this.solutionCategories = res.solution_category;
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
      return solutionPath === utilsService.getDevicesAndSolutionsUrl(solution.promo_title);
    })
  }

  @action resetDeviceCategoryData() {
    this.currentDeviceCategoryData = {
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
  @observable currentSolutionDetailData = '';

  @observable allSpecializedDevices = [];
  @observable currentDeviceCategory = '';
  @observable devicesData = {
    phones: [],
    tablets: [],
    invehicle: [],
    accessories: []
  };
  @observable currentDeviceCategoryData = {
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

  @observable manageUsersLink = 'https://test-profilemgt.firstnet.att.com/ebiz/firstnet/index.jsp#/companyInfo/companyInfoProfile';
  @observable manageServicesLink = 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn';
  @observable viewWirelessReportsLink = config.viewWirelessReportsLink;
  @observable shopStandardDevicesLink = 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn';
  @observable manageMyProfileLink = 'https://test-profilemgt.firstnet.att.com/ebiz/firstnet/';


  @observable firstnetCom = 'https://www.firstnet.com/';
  @observable firstnetGov = 'https://firstnet.gov/';
  @observable devPortal = 'https://test-developer.firstnet.att.com';
  @observable appControl = 'https://test-appcontrol.firstnet.att.com/';
  @observable appStore = 'https://test-apps.firstnet.att.com/';

  @observable firstnetFacebook = 'https://www.facebook.com/firstnetgov/';
  @observable firstnetLinkedIn = 'https://www.linkedin.com/company/first-responder-network-authority-firstnet-';
  @observable firstnetTwitter = 'https://twitter.com/FirstNetGov';
  @observable firstnetTumblr = 'https://firstnetgov.tumblr.com/';
  @observable firstnetYoutube = 'https://www.youtube.com/user/FirstNetGov';

  @observable termsOfUse = 'https://www.att.com/legal/terms.attWebsiteTermsOfUse.html';
  @observable accessibilityLink = 'https://www.firstnet.gov/accessibility';
  @observable privacyPolicyLink = 'https://www.firstnet.gov/privacy-policy';

}

export const externalLinkStore = new ExternalLinkStore();
