import {observable, action} from 'mobx';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';
import config from 'config';

class UserStore {
  @action revalidateUser() {
    //throttle validation
    if (this.awaitingValidation) {
      //return promise to execute once flag is cleared
      return this.validationPromise;
    } else {
      return this.validateUser();
    }
  }

  @action validateUser() {
    const success = (res) => {
      this.initUserObject(res.data);
      this.awaitingValidation = false;
      this.validationPromise = '';
    }

    const fail = (err) => {
      if (err.response.status === 401) {

        if(!this.userValidationDone){
          window.location.replace(config.haloLogin);
          throw new Error('Auth failed - redirecting to SSO login...');
        } else {
          //Redirect to session timeout page
          history.replace('/session-timeout');
          throw new Error('Session timed out');
        }

      } else if (err.response.status === 403) {
        //this is not an authorized user for anything
        this.authentic_user = false;
        this.userValidationDone = true;
        throw new Error('Authorization');
      }
      this.awaitingValidation = false;
      this.validationPromise = '';
    }

    this.awaitingValidation = true;
    //store the promise for return
    this.validationPromise = apiService.validateUserData().then(success, fail);
    return this.validationPromise;
  }

  @action initUserObject(tk_response) {
    this.api_token = tk_response;
    let tk_array = tk_response.split('.');
    let user_obj = JSON.parse(window.atob(tk_array[1]));
    this.conditionUserObj(user_obj);
    this.checkPermissions();
    if (this.user.roles && (this.user.roles.indexOf('G_FN_ADM') >= 0 || this.user.roles.indexOf('G_FN_IM') >= 0)) {
      this.authentic_user = true;
    } else if (this.user.roles && this.user.roles.indexOf('G_FN_SUB') >= 0){
      this.isSubscriber = true;
    }

    this.userValidationDone = true;
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
    if (this.user.roles && this.user.roles.indexOf('G_FN_ADM') !== -1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  conditionUserObj(userInfo) {
    this.user.uid = userInfo.id;
    this.user.email = userInfo.email;
    this.user.firstName = userInfo.firstName;
    this.user.lastName = userInfo.lastName;
    this.user.username = userInfo.username;
    // check if FAN mapping has occurred and designate internal PSE roles
    if (userInfo.authorizations.length) {
      this.user.pse = userInfo.authorizations[0].pseId;
      this.user.pseName = userInfo.authorizations[0].pseName;
      this.user.roles = userInfo.authorizations[0].pseUserRoles;
    } else {
      // FAN mapping hasn't happened; use HALO provided groups and roles
      this.user.pse = '';
      this.user.pseName = '';
      this.user.roles = userInfo.roles;
    }
  }

  @observable user = {};
  @observable api_token = '';
  @observable userValidationDone = false;
  @observable authentic_user = false;
  @observable isAdmin = false;
  @observable isSubscriber = false;
  @observable validationPromise = '';

}

export const userStore = new UserStore();
