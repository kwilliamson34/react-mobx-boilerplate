import axios from 'axios';
import { utilsService } from './utils.service';

const base = '/api'

// TODO - temp hardcode pending PSEID implementation
const pseId = '123';
const pseIdQueryParam = 'pseId=' + pseId;

class ApiService {

    loadUserData() {
        return axios.get('http://localhost:3000/user');
    }

    getSearchResults(query) {
      let endpoint = query ?
        `${base}/apps/search?searchTxt=${query}&${pseIdQueryParam}` : `${base}/apps/admin?${pseIdQueryParam}`
      return axios.get(endpoint)
        .then((res) => {
          return utilsService.conditionData(res.data.applications);
      });
    }

    getAdminApps() {
      return axios.get(`${base}/apps/admin?${pseIdQueryParam}`, {
          headers: {
              'x-auth-token': '34234'
          }
      }).then(res => {
        return utilsService.conditionData(res.data.applications);
      });
    }

    getAppDetails(appPSK) {
      return axios.get(`${base}/app?app_psk=${appPSK}`,{
        headers: {
          'x-auth-token': '34234'
        }
      });
    }

    addAppToGroup(appPsk, groupIdentifier) {
      console.log('Adding app with appPsk=' + appPsk + ' to groupIdentifier="' + groupIdentifier + '"...');
      return axios({
        method: 'post',
        url: `${base}/app/group`,
        headers: {
          'x-auth-token': '34234'
        },
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
        headers: {
          'x-auth-token': '34234'
        },
        data: {
          appPsk,
          groupIdentifier,
          pseId
        }
      });
    }

}

export const apiService = new ApiService();
