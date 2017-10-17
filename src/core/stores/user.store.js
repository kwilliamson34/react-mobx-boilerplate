import {observable, computed, action} from 'mobx';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';
import config from 'config';
import _ from 'lodash';

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
        this.user.roles = '';
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
  }

  @action logoutUser() {
    apiService.logoutUser().then(() => {
      window.location.replace(config.haloLogout);
    }).catch((err) => {
      console.error('Received error on logout: ', err);
      window.location.replace(config.haloLogout); //go to halo logout anyway
    });
  }

  conditionUserObj(userInfo) {
    this.user.uid = userInfo.id;
    this.user.email = userInfo.email;
    this.user.firstName = userInfo.firstName;
    this.user.lastName = userInfo.lastName;
    this.user.username = userInfo.username;
    this.user.phone = userInfo.phone;
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
    this.userValidationDone = true;
  }

  checkRolesString = (allowedRoles) => {
    if(!this.user.roles) {
      return false;
    }
    if(_.intersection(allowedRoles, this.user.roles).length > 0) {
      return true;
    }
    return false;
  }

  @computed get isAdmin() {
    //TODO add G_FN_ITM role here if it gets approved
    return this.checkRolesString(['G_FN_IM','G_FN_ADM']);
  }

  @computed get isAuthenticUser() {
    //TODO add G_FN_ITM role here if it gets approved'
    return this.checkRolesString(['G_FN_IM','G_FN_ADM','G_FN_SUB','G_FN_VOL_ADM','G_FN_VOL']);
  }

  @computed get isSubscriber() {
    return this.checkRolesString(['G_FN_SUB','G_FN_VOL_ADM','G_FN_VOL']);
  }

  @computed get canViewNetworkStatus() {
    return this.isAdmin;
  }

  @computed get destinationIsPermitted() {
    let destinationIsPermitted = {};
    for(let card in this.cardPermissions) {
      if(_.intersection(this.cardPermissions[card], this.user.roles).length) {
        destinationIsPermitted[card] = true;
      } else {
        destinationIsPermitted[card] = false;
      }
    }
    return destinationIsPermitted;
  }

  @observable user = {};
  @observable api_token = '';
  @observable userValidationDone = false;
  @observable validationPromise = '';
  @observable cardPermissions = {
    shopStandardDevices: ['G_FN_ADM', 'G_FN_VOL'],
    shopSpecializedDevices: ['G_FN_ADM', 'G_FN_VOL'],
    shopPublicSafetySolutions: ['G_FN_ADM', 'G_FN_VOL_ADM', 'G_FN_VOL'],
    manageUsers: ['G_FN_ADM', 'G_FN_ITM'],
    viewReports: ['G_FN_ADM', 'G_FN_VOL'],
    manageApps: ['G_FN_ADM', 'G_FN_ITM', 'G_FN_SUB', 'G_FN_VOL_ADM', 'G_FN_VOL']
  }

}

export const userStore = new UserStore();
