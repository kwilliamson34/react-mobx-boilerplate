import {observable, action} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import config from 'config';

class UserStore {
  @action revalidateUser() {
    const success = (res) => {
      this.initUserObject(res.data);
    }

    const fail = (err) => {
      if(err.response.status === 401) {

        //Redirect to Halo
        window.location.replace(config.haloLogin);
      } else if (err.response.status === 403) {
        //this is not an authorized user for anything
        this.authentic_user = false;
        this.userValidationDone = true;
      }
    }

    return apiService.validateUserData().then(success, fail);
  }

  @action initUserObject(tk_response) {
    let tk_array = tk_response.split('.');
    let user_obj = JSON.parse(window.atob(tk_array[1]));
    this.condtionUserObj(user_obj);
    this.api_token = tk_response;
    this.checkPermissions();
    this.userValidationDone = true;
    this.authentic_user = true;
  }

  @action logoutUser() {
    apiService.logoutUser().then(() => {
      window.location.replace(config.haloLogout);
    }).catch((err) => {
      console.error('Received error on logout: ', err);
      window.location.replace(config.haloLogout); //go to halo logout anyway
    });
  }

  checkPermissions() {
    if (this.user.roles.indexOf('G_FN_ADM') !== -1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  condtionUserObj(userInfo) {
    this.user.uid = userInfo.id;
    this.user.email = userInfo.email;
    this.user.firstName = userInfo.firstName;
    this.user.lastName = userInfo.lastName;
    this.user.roles = userInfo.roles;
    this.user.username = userInfo.username;
    this.user.authorizations = userInfo.authorizations;
    if(userInfo.authorizations.length > 0) {
      this.user.pse = userInfo.authorizations[0].pseId;
      this.user.pseName = userInfo.authorizations[0].pseName;
    }
  }

  @observable user = {};
  @observable api_token;
  @observable userValidationDone = false;
  @observable authentic_user = false;
  @observable isAdmin = false;
}

export const userStore = new UserStore();
