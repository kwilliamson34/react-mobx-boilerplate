import axios from 'axios';
import { utilsService } from './utils.service';
import { externalContentService } from './external-content.service';

import { userStore } from '../stores/user.store';

const base = '/api'

// TODO - temp hardcode pending PSEID implementation
const pseId = '123';

axios.interceptors.response.use(undefined, err => {
  if (err.response.status === 401 && err.config.url !== '/api/user/profile') {
    userStore.validateUser();
  }
})


class ApiService {

    validateUserData() {
      axios.defaults.headers.common = {};
      return axios.get(`${base}/user/profile`, {
        withCredentials: true
      }).then(function(resp) {
        if(resp.data){
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data;
        }
        return resp;
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
      return axios.get('http://localhost:8080/marketing/devices')
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
