import axios from 'axios';
import {userStore} from '../stores/user.store';
import config from 'config';

const base = config.apiBase;
const loginUrl = `${base}/login`;
const logoutUrl = `${base}/logout`;

axios.interceptors.request.use(request => {
  if (request.url !== loginUrl && logoutUrl) {
    request.headers['Authorization'] = `Bearer ${userStore.api_token}`;
  }
  return request;
})

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    let response = error.response;
    let old_req = response.config;

    if (response.status === 401 && old_req.url !== loginUrl) {
      return userStore.revalidateUser().then(() => axios(old_req));
    }
  }
  throw error;
});

class ApiService {

  validateUser() {
    return axios.get(`${base}/user/login`, {
      withCredentials: true
    });
  }

  logoutUser() {
    return axios.get(`${base}/user/logout`, {
      withCredentials: true
    });
  }

  submitFeedbackForm(data) {
    return axios({
      method: 'post',
      url: `${base}/feedback`,
      data
    });
  }
}

export const apiService = new ApiService();
