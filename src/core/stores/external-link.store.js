import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';
import _ from 'lodash';

class ExternalLinkStore {
  /*
   * Retrieve Devices from Marketing Portal
   */
  @action getDevicesData() {
    const success = (res) => {
      this.allSpecializedDevices = res.filter((device) => device.device_is_specialized === '1');
    }
    const fail = (res) => {
      utilsService.handleError(res);
    }
    return apiService.getMarketingPortalDevices().then(success, fail);
  }

  @action fetchDeviceDetails({devicePath, setAsCurrent}) {
    let matches = this.allSpecializedDevices.filter((device) => {
      return devicePath === utilsService.getDevicesAndSolutionsUrl(device.device_title);
    });
    this.checkMatches({matches, shouldBeOne: true});

    if(setAsCurrent) {
      this.currentDeviceDetailRaw = matches[0];
    }
    return matches[0];
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

  @action fetchSolutionDetails({solutionPath, setAsCurrent}) {
    let matches = this.allSolutionDetails.filter((solution) => {
      return solutionPath === utilsService.getDevicesAndSolutionsUrl(solution.promo_title);
    });
    this.checkMatches({matches, shouldBeOne: true});

    if(setAsCurrent) {
      this.currentSolutionDetail = matches[0];
    }
    return matches[0];
  }

  @action resetSolutionDetail() {
    this.currentSolutionDetail = {}
  }

  @action resetDeviceDetail() {
    this.currentDeviceDetailRaw = {};
  }

  @action checkMatches({matches, shouldBeOne, shouldNotBeZero}) {
    if(shouldNotBeZero && matches.length < 1){
      history.replace('/error');
    } else if (shouldBeOne && matches.length !== 1) {
      history.replace('/error');
    }
  }

  @action hasRelatedApp(solutionObject) {
    if(solutionObject.related_app_psk) {
      const digitsRegex = /^[0-9]+$/;
      return digitsRegex.test(solutionObject.related_app_psk);
    }
    return false;
  }

  //COMPUTEDS
  @computed get filteredSolutionCategoryData() {
    const _category = this.currentSolutionCategory.replace(/-/g, ' ');
    const matches = this.allSolutionDetails.filter((solution) => {
      return solution.page_category.toLowerCase() == _category.toLowerCase();
    });
    this.checkMatches({matches, shouldNotBeZero: true});

    return {
      title: _category,
      solutions: matches
    }
  }

  @computed get filteredDeviceCategoryData() {
    const matches = this.allSpecializedDevices.filter((device) => {
      return this.currentDeviceCategory.toLowerCase() == device.device_category.toLowerCase();
    });
    this.checkMatches({matches, shouldNotBeZero: true});
    return matches;
  }

  @computed get categorizedDeviceData() {
    const devicesObj = {
      phones: [],
      tablets: [],
      invehicle: [],
      accessories: []
    }

    this.allSpecializedDevices.forEach((obj) => {
      let category = obj.device_category.replace('-', '').toLowerCase();
      devicesObj[category].push(obj);
    });
    return devicesObj;
  }

  @computed get currentDeviceDetail() {
    let device = this.currentDeviceDetailRaw;
    return {
      path: encodeURIComponent(device.device_title).replace(/%20/g, '+'),
      features: device.device_features,
      deviceName: device.device_title,
      deviceImg: device.device_image_url,
      deviceImgAlt: device.device_image_alt,
      terms: (device.device_tnc && device.device_tnc.length > 0) ? device.device_tnc : null
    }
  }

  @computed get currentDevicePurchasingInfo() {
    let contactInfoObject = _.pick(this.currentDeviceDetailRaw, Object.keys(this.currentDeviceDetailRaw).filter((key) => {
      return key.includes('contact_') && this.currentDeviceDetailRaw[key] !== ''
    }));
    return Object.keys(contactInfoObject).length > 0 ? contactInfoObject : null;
  }

  @computed get currentSolutionPurchasingInfo() {
    let contactInfoObject = _.pick(this.currentSolutionDetail, Object.keys(this.currentSolutionDetail).filter((key) => {
      return key.includes('contact_') && this.currentSolutionDetail[key] !== ''
    }));
    return Object.keys(contactInfoObject).length > 0 ? contactInfoObject : null;
  }

  @observable allSolutionDetails = [];
  @observable solutionCategories = [];
  @observable currentSolutionCategory = '';
  @observable currentSolutionDetail = {};

  @observable allSpecializedDevices = [];
  @observable currentDeviceCategory = '';
  @observable currentDeviceDetailRaw = {};

  @observable solutionsConsultantPhone = '833-717-8638';

  @observable firstnetFacebook = 'https://www.facebook.com/firstnetgov/';
  @observable firstnetLinkedIn = 'https://www.linkedin.com/company/first-responder-network-authority-firstnet-';
  @observable firstnetTwitter = 'https://twitter.com/FirstNetGov';
  @observable firstnetTumblr = 'https://firstnetgov.tumblr.com/';
  @observable firstnetYoutube = 'https://www.youtube.com/user/FirstNetGov';

  @observable termsOfUse = 'https://www.att.com/legal/terms.attWebsiteTermsOfUse.html';
  @observable accessibilityLink = 'https://www.firstnet.com/accessibility';
  @observable privacyPolicyLink = 'https://www.firstnet.com/privacy-policy';
}

export const externalLinkStore = new ExternalLinkStore();
