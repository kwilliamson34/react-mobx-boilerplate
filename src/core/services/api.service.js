import axios from 'axios';
import {utilsService} from './utils.service';
import {externalDeviceContentService} from './external-device-content.service';
import {userStore} from '../stores/user.store';

const base = '/api'
let user_token = '';

axios.interceptors.request.use(request => {
  if (request.url !== `${base}/user/profile`) {
    request.headers['Authorization'] = `Bearer ${user_token}`;
  }
  return request;
})

axios.interceptors.response.use((response) => {
  if(response.config.url == `${base}/user/profile`){
    user_token = response.data
  }
  return response;
}, (error) => {
    let response = error.response;
    let old_req = response.config;

  if ((response.status === 403 || response.status === 401) && old_req.url !== `${base}/user/profile`) {
    userStore.validateUser();
    return axios(old_req);
  }
  throw error;
})


class ApiService {

    validateUserData() {
      return axios.get(`${base}/user/profile`, {
        withCredentials: true
      });
    }

    getSearchResults(query) {
      let endpoint = query
        ? `${base}/apps/admin/search?searchTxt=${query}&pseId=${userStore.pseId}`
        : `${base}/apps/admin?pseId=${pseId}`
      return axios.get(endpoint).then((res) => {
        return utilsService.conditionData(res.data.applications);
      });
    }

    getAdminApps() {
      return axios.get(`${base}/apps/admin?pseId=${userStore.pseId}`).then(res => {
        return utilsService.conditionData(res.data.applications);
      });
    }

    getAppDetails(appPSK) {
      return axios.get(`${base}/app?appPsk=${appPSK}&pseId=${userStore.pseId}`).then(res => {
        let arrayRes = [];
        arrayRes.push(res.data);
        return arrayRes;
      });
    }

    getMarketingPortalDevices() {
      return axios.get(`${base}/marketing/devices`)
        .then( (res) =>{
          return externalDeviceContentService.filterDeviceLandingData(res.data);
        });
    }

    getDeviceCategory(categoryNum) {
      return axios.get(`${base}/marketing/devices/${categoryNum}`)
        .then( (res) =>{
          return externalDeviceContentService.filterDeviceCategoryData(res.data);
        });
    }

    getDeviceDetail(deviceLink) {
      return axios.get(`${base}/marketing${deviceLink}`)
        .then( (res) =>{
          return externalDeviceContentService.filterDeviceDetailData(res.data);
        });
    }

    addAppToGroup(appPsk, groupIdentifier) {
      console.log('Adding app with appPsk=' + appPsk + ' to groupIdentifier="' + groupIdentifier + '"...');
      return axios({
        method: 'post',
        url: `${base}/app/group`,
        data: {
          appPsk,
          groupIdentifier,
          pseId: userStore.pseId
        }
      });
    }

    removeAppFromGroup(appPsk, groupIdentifier) {
      console.log('Removing app with appPsk=' + appPsk + ' from groupIdentifier="' + groupIdentifier + '"...');
      return axios({
        method: 'delete',
        url: `${base}/app/group`,
        data: {
          appPsk,
          groupIdentifier,
          pseId: userStore.pseId
        }
      });
    }

    setMDMConfiguration(mdmConfig) {
      return axios({
        method: 'post',
        url: `${base}/pse/mdm`,
        data: mdmConfig
      });
    }

}

export const apiService = new ApiService();
