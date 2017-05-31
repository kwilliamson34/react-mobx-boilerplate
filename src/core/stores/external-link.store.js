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
      this.currentCategoryItems = res;
    }
    const fail = (res) => {
      console.log('MPDevice fetch failed\n' + res);
    }
    apiService.getDeviceCategory(this.deviceCategoryNum).then(success, fail);
  }

  @action getDeviceDetail(devicePath) {
    const success = (res) => {
      this.currentDeviceDetail = res;
    }
    const fail = (res) => {
      console.log('MPDevice fetch failed\n' + res);
    }
    apiService.getDeviceDetail(devicePath).then(success, fail);
  }

  //COMPUTEDS
  @computed get deviceCategoryNum() {
    let deviceCategories = ['phones', 'tablets', 'invehicle', 'accessories'];
    let categoryIndex = deviceCategories.indexOf(this.currentCategory);
    return (categoryIndex >= 0)? categoryIndex + 1 : 0;
  }


  @observable devicesData = {
    phones: [],
    tablets: [],
    invehicle: [],
    accessories: []
  };
  @observable currentCategoryItems = [];
  @observable currentDeviceDetail = {};
  @observable manageUsersLink = 'https://profilemgt.firstnet.att.com/ebiz/firstnet/index.jsp';
  @observable manageServicesLink = 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn';
  @observable managePushToTalkKodiakLink = 'https://wgp.eptt.kodiaknetworks.com/cat/view/catui';
  @observable managePushToTalkMotorolaLink = 'https://firstnet.att.com/ptt_upm';
  @observable viewWirelessReportsLink = 'https://www.wireless.att.com/businesscare/menu/index.jsp?subject=Reports&wtLinkName=Reports&wtLinkLoc=S1&&wtLinkType=InventoryReport';
  @observable shopStandardDevicesLink = '';
}

export const externalLinkStore = new ExternalLinkStore();
