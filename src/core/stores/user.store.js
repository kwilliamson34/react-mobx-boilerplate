import {observable, action} from 'mobx';
import {apiService} from '../services/api.service';
import config from 'config';

class UserStore {
  @action validateUser() {
    const success = (res) => {
      let usr_tkn = res.data;

      this.initUserObject(usr_tkn);
      this.checkPermissions();
      this.userValidationDone = true;
    }
    const fail = (err) => {
      if(err.response.status === 401) {
        this.auth_error = true;
        //Redirect to Halo
        window.location.replace(config.haloLogin);
      } else if (err.response.status === 403){
        //Show unathorized error page
        window.location.replace('/error/unauthorized');
      } else {
        //Show generic error page
        window.location.replace('/error');
      }
      this.userValidationDone = true;
    }
    return apiService.validateUserData().then(success, fail);
  }

  @action checkPermissions() {
    if (this.user.roles.indexOf('G_FN_ADM') !== -1) {
      this.authentic_user = true;
    } else {
      this.authentic_user = false;
    }
  }

  initUserObject(tk_response) {
    let tk_array = tk_response.split('.');
    let user_obj = JSON.parse(window.atob(tk_array[1]));
    this.user = user_obj;
  }


  @observable user = {
      aud : '',
      authorizations : [],
      email : '',
      exp : 0,
      firstName : '',
      iat : 0,
      id : '',
      iss : '',
      t : '',
      lastName : '',
      roles : [],
      sub : '',
      username : ''
  };

  @observable userValidationDone = false;
  @observable authentic_user = false;
  @observable auth_error = false;
}

export const userStore = new UserStore();
