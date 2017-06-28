import axios from 'axios';
import {utilsService} from './utils.service';
import {externalSolutionsService} from './external-solutions.service';
import {userStore} from '../stores/user.store';
import config from 'config';

const base = config.apiBase;

axios.interceptors.request.use(request => {
  if (request.url !== `${base}/user/profile` && request.url !== `${base}/user/logout`) {
    request.headers['Authorization'] = `Bearer ${userStore.api_token}`;
  }
  return request;
})

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {

  if(error.response) {
    let response = error.response;
    let old_req = response.config;

    if (response.status === 401 && old_req.url !== `${base}/user/profile`) {
      return userStore.revalidateUser().then(() => axios(old_req));
    }
  }

  throw error;
})


class ApiService {

    validateUserData() {
      return axios.get(`${base}/user/profile`, {
        withCredentials: true
      });
    }

    logoutUser() {
      return axios.get(`${base}/user/logout`, {
        withCredentials: true
      });
    }

    getSearchResults(query) {
      let endpoint = query
        ? `${base}/apps/admin/search?searchTxt=${query}&pseId=${userStore.user.pse}`
        : `${base}/apps/admin?pseId=${userStore.user.pse}`
      return axios.get(endpoint).then((res) => {
        return utilsService.conditionData(res.data.applications);
      });
    }

    getAdminApps() {
      return axios.get(`${base}/apps/admin?pseId=${userStore.user.pse}`).then(res => {
        return utilsService.conditionData(res.data.applications);
      });
    }

    getAppDetails(appPSK) {
      return axios.get(`${base}/app/admin?appPsk=${appPSK}&pseId=${userStore.user.pse}`).then(res => {
        let arrayRes = [];
        arrayRes.push(res.data);
        return arrayRes;
      });
    }

    getMarketingPortalDevices() {
      return axios.get(`${base}/marketing/api/devices?_format=json`)
        .then((res) => {
          return res.data;
        });
    }

    getMarketingPortalSolutionDetails() {
      return axios.get(`${base}/marketing/api/solutions?_format=json`)
        .then((res) => {
          return res.data;
        });
    }

    getSolutionCards(queryString) {
      return axios.get(`${base}/marketing${queryString}`)
        .then((res) => {
          return externalSolutionsService.filterSolutionCards(res.data);
        })
    }

    getSolutionHeaderImg(queryString) {
      return axios.get(`${base}/marketing${queryString}`)
        .then((res) => {
          return externalSolutionsService.filterSolutionHeaderImg(res.data);
        })
    }

    addAppToGroup(appPsk, groupIdentifier) {
      console.log('Adding app with appPsk=' + appPsk + ' to groupIdentifier="' + groupIdentifier + '"...');
      return axios({
        method: 'post',
        url: `${base}/app/group`,
        data: {
          appPsk,
          groupIdentifier,
          pseId: userStore.user.pse
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
          pseId: userStore.user.pse
        }
      });
    }

    getMDMConfiguration() {
      return axios.get(`${base}/pse/mdm?pseId=${userStore.user.pse}`);
    }

    setMDMConfiguration(mdmConfig) {
      mdmConfig.pse_id = userStore.user.pse;

      return axios({
        method: 'post',
        url: `${base}/pse/mdm`,
        data: mdmConfig
      });
    }

    breakMDMConfiguration() {
      return axios.delete(`${base}/pse/mdm/${userStore.user.pse}`);
    }

    submitCustomerFeedbackForm(feedbackObject) {
      return axios({
        method: 'post',
        url: `${base}/customerfeedback`,
        data: feedbackObject
      });
    }
}

export const apiService = new ApiService();
