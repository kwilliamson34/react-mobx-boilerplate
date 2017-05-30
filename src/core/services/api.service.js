import axios from 'axios';
import { utilsService } from './utils.service';
import { externalContentService } from './external-content.service';

import { userStore } from '../stores/user.store';

const base = '/api'

// TODO - temp hardcode pending PSEID implementation
const pseId = '123';
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

  if (response.status === 401 && old_req.url !== `${base}/user/profile`) {
    userStore.validateUser();
    return axios(old_req);
  }
  throw error;
})


class ApiService {

    validateUserData() {
      return axios.get(`${base}/user/proile`, {
        withCredentials: true
      });
    }

    getSearchResults(query) {
      let endpoint = query
        ? `${base}/apps/admin/search?searchTxt=${query}&pseId=${pseId}`
        : `${base}/apps/admin?pseId=${pseId}`
      return axios.get(endpoint).then((res) => {
        return utilsService.conditionData(res.data.applications);
      });
    }

    getAdminApps() {
      return axios.get(`${base}/apps/admin?pseId=${pseId}`).then(res => {
        return utilsService.conditionData(res.data.applications);
      });
    }

    getAppDetails(appPSK) {
      return axios.get(`${base}/app?appPsk=${appPSK}&pseId=${pseId}`).then(res => {
        let arrayRes = [];
        arrayRes.push(res.data);
        return arrayRes;
      });
    }

    getMPDevices() {
      return axios.get(`${base}/marketing/devices`)
        .then( (res) =>{
          return externalContentService.filterDeviceData(res.data);
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
          pseId
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
          pseId
        }
      });
    }

}

export const apiService = new ApiService();
