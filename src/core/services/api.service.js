import axios from 'axios';


class ApiService {

    //Axios
    getAppAvailability() {
        return axios.get('http://34.204.23.33/api-services/apps/admin/stats', {
            headers: {
                'x-auth-token': '34234'
            },
            params: {
                'pse_id': '123'
            }
        });
    }
}


export const apiService = new ApiService();