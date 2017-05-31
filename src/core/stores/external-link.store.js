import { action, observable } from 'mobx';
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

  @action getPSSDetails(queryString) {
    const success = (res) => {
      this.pssDetails = res;
    }

    const fail = (res) => {
      console.log('getPSSDetails fetch failed\n' + res);
    }

    apiService.getPSSDetails(queryString).then(success, fail);
  }

  @observable devicesData = {
    phones: [],
    tablets: [],
    invehicles: [],
    accessories: []
  };

  @observable cellsArray = [];
  @observable headerImg = '';
  @observable pssDetails = {};

  @observable manageUsersLink = 'https://profilemgt.firstnet.att.com/ebiz/firstnet/index.jsp';
  @observable manageServicesLink = 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn';
  @observable managePushToTalkKodiakLink = 'https://wgp.eptt.kodiaknetworks.com/cat/view/catui';
  @observable managePushToTalkMotorolaLink = 'https://firstnet.att.com/ptt_upm';
  @observable viewWirelessReportsLink = 'https://www.wireless.att.com/businesscare/menu/index.jsp?subject=Reports&wtLinkName=Reports&wtLinkLoc=S1&&wtLinkType=InventoryReport';
  @observable shopStandardDevicesLink = '';



}

export const externalLinkStore = new ExternalLinkStore();
