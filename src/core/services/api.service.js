import axios from 'axios';
import { utilsService } from './utils.service';

// const base = "/api-services/"

// TODO - temp base pending final merge
const base = '/api-services-summary/'

// TODO - temp hardcode pending PSEID implementation
const pseid = '&pse_id=123'

class ApiService {

    loadUserData() {
        return axios.get('http://localhost:3000/user');
    }
    getHomeCards() {
        return axios.get(`${base}apps/admin?${pseid}`)
            .then((res) => {
                return utilsService.conditionData(res.data.applications);
            });
    }

    getSearchResults(query) {
        return axios.get(`${base}apps/search?searchTxt=${query}${pseid}`)
            .then((res) => {
                return utilsService.conditionData(res.data.applications);
            });
    }

    getAppAvailability() {
        return axios.get(`${base}apps/admin/stats?${pseid}`, {
            headers: {
                'x-auth-token': '34234'
            }
        })
    }

}

export const apiService = new ApiService();
