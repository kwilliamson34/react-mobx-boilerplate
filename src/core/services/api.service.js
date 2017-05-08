import axios from 'axios';
import { utilsService } from './utils.service';

const base = '/api'

// TODO - temp hardcode pending PSEID implementation
const pseid = 'pse_id=123'

class ApiService {

    loadUserData() {
        return axios.get('http://localhost:3000/user');
    }

    getSearchResults(query) {
      let endpoint = query ?
        `${base}/apps/search?searchTxt=${query}&${pseid}` : `${base}/apps/admin?${pseid}`
      return axios.get(endpoint)
        .then((res) => {
          return utilsService.conditionData(res.data.applications);
      });
    }

    getAdminApps() {
      return axios.get(`${base}/apps/admin?${pseid}`, {
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

    addAppToGroup(appPSK, groupName) {
      //TODO
      console.log('Adding app with PSK=' + appPSK + ' to group "' + groupName + '"...');
    }

    removeAppFromGroup(appPSK, groupName) {
      //TODO
      console.log('Removing app with PSK=' + appPSK + ' from group "' + groupName + '"...');
    }

}

export const apiService = new ApiService();
