import axios from 'axios';
import { utilsService } from './utils.service';

const base = '/api'

// TODO - temp hardcode pending PSEID implementation
const pseid = 'pseId=123'

class ApiService {

    loadUserData() {
        return axios.get('http://localhost:3000/user');
    }

    getHomeCards() {
        return axios.get(`${base}/apps?${pseid}`)
            .then((res) => {
                return utilsService.conditionData(res.data.applications);
            });
    }

    getSearchResults(query) {
      let endpoint = query ?
        `${base}/apps/search?searchTxt=${query}&${pseid}` : `${base}/apps/admin?${pseid}`
      return axios.get(endpoint)
        .then((res) => {
          return utilsService.conditionData(res.data.applications);
      });
    }

    getAppAvailability() {
        return axios.get(`${base}/apps/admin/stats?${pseid}`, {
            headers: {
                'x-auth-token': '34234'
            }
        })
    }

    getAppDetails(appPSK) {
      return axios.get(`${base}/app?app_psk=${appPSK}`,{
        headers: {
          'x-auth-token': '34234'
        }
      });
    }

}

export const apiService = new ApiService();
