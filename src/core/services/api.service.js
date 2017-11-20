import axios from 'axios';
import {utilsService} from './utils.service';
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
});

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
        return utilsService.mapAppsToCards(res.data.applications);
      });
    }

    getAdminApps() {
      return axios.get(`${base}/apps/admin?pseId=${userStore.user.pse}`).then(res => {
        return utilsService.mapAppsToCards(res.data.applications);
      });
    }

    getAppDetails(appPSK) {
      return axios.get(`${base}/app/admin?appPsk=${appPSK}&pseId=${userStore.user.pse}`).then(res => {
        let arrayRes = [];
        arrayRes.push(res.data);
        return arrayRes;
      });
    }

    getCategoriesAndSegments() {
      return axios.get(`${base}/categoriesandsegments`, {
        data: {}, // this is required to unset the media type and avoid a 415 error
        headers: {
          'Accept': 'application/json'
        }
      });
    }

    getMarketingPortalDevices() {
      return axios.get(`${base}/marketing/api/devices?_format=json`);
    }

    getMarketingPortalSolutionDetails() {
      return axios.get(`${base}/marketing/api/solutions?_format=json`);
    }

    getMarketingPortalSolutionCategories() {
      return axios.get(`${base}/marketing/api/category/solutions?_format=json`);
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

    getSingleMDMStatus(app_psk) {
      return axios.get(`${base}/pse/mdm/app?appPsk=${app_psk}&pseId=${userStore.user.pse}`).then((res) => {
        return res.data;
      });
    }

    pushToMDM(app_psk) {
      console.log('Pushing app to MDM with appPsk=' + app_psk + ' for pse="' + userStore.user.pse + '"...');
      return axios({
        method: 'post',
        url: `${base}/pse/mdm/push?appPsk=${app_psk}&pseId=${userStore.user.pse}`,
        data: {}
      });
    }

    submitCustomerFeedbackForm(feedbackObject) {
      return axios({
        method: 'post',
        url: `${base}/customerfeedback`,
        data: feedbackObject
      });
    }

    submitGTOCSubscriptionForm(gtocObject) {
      return axios({
        method: 'post',
        url: `${base}/gtocalertssubscription`,
        data: gtocObject
      });
    }

    getLocationFavorites() {
      return axios.get(`${base}/user/location/favorite?pseId=${userStore.user.pse}`);
    }

    deleteLocationFavorites(array) {
      return axios({
        method: 'delete',
        url: `${base}/user/location/favorite/`,
        data: {
          pseId: userStore.user.pse,
          userlocationfavoriteId: array
        }
      });
    }

    searchLocationFavorites(query) {
      return axios.get(`${base}/user/location/favorite/search?pseId=${userStore.user.pse}&location=${query}`);
    }

    addLocationFavorite(data) {
      return axios({
        method: 'post',
        url: `${base}/user/location/favorite/`,
        data: {
          favoriteName: data.locationName,
          locationFavoriteAddress: data.locationAddress,
          pseId: userStore.user.pse
        }
      });
    }

    editLocationFavorite(data) {
      return axios({
        method: 'put',
        url: `${base}/user/location/favorite/${data.locationId}`,
        data: {
          favoriteName: data.locationName,
          locationFavoriteAddress: data.locationAddress,
          pseId: userStore.user.pse
        }
      });
    }

    submitLeadCaptureForm(data, solutionName) {
      return axios({
        method: 'post',
        url: `${base}/leadcapture`,
        data: {
          name: data.firstName + ' ' + data.lastName,
          email: data.email,
          phoneNumber: data.phone,
          message: data.message,
          solutionName: solutionName
        }
      });
    }
}

export const apiService = new ApiService();
