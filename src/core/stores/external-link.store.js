import {action, observable, computed, autorun} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {appCatalogStore} from './app-catalog.store';
import _ from 'lodash';

class ExternalLinkStore {
  /*
   * Retrieve Devices from Marketing Portal
   */
  constructor() {
    //fetch related app
    autorun(() => {
      if (this.hasValidRelatedApp(this.currentSolutionDetail)) {
        appCatalogStore.setCurrentApp(this.currentSolutionDetail.related_app_psk);
        if (!appCatalogStore.currentAppObject || !appCatalogStore.currentAppObject.detailsFetched) {
          appCatalogStore.fetchAppDetailByPsk({
            psk: this.currentSolutionDetail.related_app_psk,
            suppressFetchFailure: true
          });
        }
      }
    })
  }

  @action fetchMarketingPortalData() {
    if(!this.allSpecializedDevices || !this.allSpecializedDevices.length) {
      this.getDevicesData();
    }
    if(!this.solutionCategories || !this.solutionCategories.length) {
      this.getSolutionCategories();
    }
    if(!this.allSolutionDetails || !this.allSolutionDetails.length) {
      this.getSolutionDetails();
    }
  }

  @action getDevicesData() {
    const success = (res) => {
      this.allSpecializedDevices = res.data.filter((device) => device.device_is_specialized === '1');
    }
    const fail = (res) => {
      utilsService.handleError(res);
    }
    return apiService.getMarketingPortalDevices().then(success, fail);
  }

  @action getSolutionDetails() {
    const success = (res) => {
      this.allSolutionDetails = res.data;
    }
    const fail = (res) => {
      utilsService.handleError(res);
    }
    return apiService.getMarketingPortalSolutionDetails().then(success, fail);
  }

  @action getSolutionCategories() {
    const success = (res) => {
      this.solutionCategories = res.data.solution_category;
    }
    const fail = (res) => {
      utilsService.handleError(res);
    }
    return apiService.getMarketingPortalSolutionCategories().then(success, fail);
  }

  @action setCurrentSolutionCategory(name) {
    this.currentSolutionCategory = name;
  }

  @action setCurrentSolution(name) {
    this.currentSolutionName = name;
  }

  @action setCurrentDeviceCategory(name) {
    this.currentDeviceCategory = name;
  }

  @action setCurrentDevice(name) {
    this.currentDeviceName = name;
  }

  @action resetSolutionDetail() {
    this.currentSolutionDetail = {}
  }

  @action resetDeviceDetail() {
    this.currentDeviceDetailRaw = {};
  }

  @action hasValidRelatedApp(solutionObject) {
    if(solutionObject && solutionObject.related_app_psk) {
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
    return {
      title: _category,
      solutions: matches
    }
  }

  @computed get currentSolutionDetail() {
    let matches = this.allSolutionDetails.filter((solution) => {
      // Drupal allows trailing spaces, so make sure to trim
      return decodeURIComponent(this.currentSolutionName).trim() == decodeURIComponent(solution.promo_title).trim();
    });

    // Return the first result, or fail gracefully
    return matches[0];
  }

  @computed get filteredDeviceCategoryData() {
    const matches = this.allSpecializedDevices.filter((device) => {
      return this.currentDeviceCategory.toLowerCase() == device.device_category.toLowerCase();
    });
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
    let matches = this.allSpecializedDevices.filter((device) => {
      // Drupal allows trailing spaces, so make sure to trim
      return decodeURIComponent(this.currentDeviceName).trim() == decodeURIComponent(device.device_title).trim();
    });

    // Return the first result, or fail gracefully
    let device = matches[0];
    if(device) {
      return {
        path: encodeURIComponent(device.device_title).replace(/%20/g, '+'),
        features: device.device_features,
        deviceName: device.device_title,
        deviceImg: device.device_image_url,
        deviceImgAlt: device.device_image_alt,
        terms: (device.device_tnc && device.device_tnc.length > 0) ? device.device_tnc : null
      }
    }
    return {};
  }

  @computed get currentDevicePurchasingInfo() {
    if(!this.currentDeviceDetailRaw) {
      return;
    }
    let contactInfoObject = _.pick(this.currentDeviceDetailRaw, Object.keys(this.currentDeviceDetailRaw).filter((key) => {
      return key.includes('contact_') && this.currentDeviceDetailRaw[key] !== ''
    }));
    return Object.keys(contactInfoObject).length > 0 ? contactInfoObject : null;
  }

  @computed get currentSolutionPurchasingInfo() {
    if(!this.currentSolutionDetail) {
      return;
    }
    let contactInfoObject = _.pick(this.currentSolutionDetail, Object.keys(this.currentSolutionDetail).filter((key) => {
      return key.includes('contact_') && this.currentSolutionDetail[key] !== ''
    }));
    return Object.keys(contactInfoObject).length > 0 ? contactInfoObject : null;
  }

  @observable allSolutionDetails = [];
  @observable solutionCategories = [];
  @observable currentSolutionCategory = '';
  @observable currentSolutionName = '';

  @observable allSpecializedDevices = [];
  @observable currentDeviceCategory = '';
  @observable currentDeviceName = '';

  @observable solutionsConsultantPhone = '833-717-8638';
  @observable firstnetTraining = 'http://mmsrv01b.intellor.com/att/digitalexperience/firstnet.html';

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
