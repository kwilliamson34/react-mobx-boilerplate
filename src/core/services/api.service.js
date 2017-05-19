import axios from 'axios';
import { utilsService } from './utils.service';
import { externalContentService } from './external-content.service';

const base = '/api'

// TODO - temp hardcode pending PSEID implementation
const pseId = '123';

class ApiService {
    validateUserData(user_token) {
        return axios.get(`${base}/user/profile`, {
          withCredentials: true,
          headers: {
            'x-auth-token': user_token
          }
      });
    }

    getSearchResults(query, user_token) {
      let endpoint = query
        ? `${base}/apps/admin/search?searchTxt=${query}&pseId=${pseId}`
        : `${base}/apps/admin?pseId=${pseId}`
      return axios.get(endpoint, {
          headers: {
            'x-auth-token': user_token
          }
        }).then((res) => {
        return utilsService.conditionData(res.data.applications);
      });
    }

    getAdminApps(user_token) {
      return axios.get(`${base}/apps/admin?pseId=${pseId}`, {
          headers: {
            'x-auth-token': user_token
          }
      }).then(res => {
        return utilsService.conditionData(res.data.applications);
      });
    }

    getAppDetails(appPSK, user_token) {
      return axios.get(`${base}/app?appPsk=${appPSK}&pseId=${pseId}`,{
        headers: {
          'x-auth-token': user_token
        }
      }).then(res => {
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

    addAppToGroup(appPsk, groupIdentifier, user_token) {
      console.log('Adding app with appPsk=' + appPsk + ' to groupIdentifier="' + groupIdentifier + '"...');
      return axios({
        method: 'post',
        url: `${base}/app/group`,
        headers: {
          'x-auth-token': user_token
        },
        data: {
          appPsk,
          groupIdentifier,
          pseId
        }
      });
    }

    removeAppFromGroup(appPsk, groupIdentifier, user_token) {
      console.log('Removing app with appPsk=' + appPsk + ' from groupIdentifier="' + groupIdentifier + '"...');
      return axios({
        method: 'delete',
        url: `${base}/app/group`,
        headers: {
          'x-auth-token': user_token
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
