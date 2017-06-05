import {observable, action} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';

class UserStore {
  @action validateUser() {
    const success = (res) => {
      let usr_tkn = res.data;

      this.initUserObject(usr_tkn);
      this.checkPermissions();
      this.userValidationDone = true;
    }
    const fail = (err) => {
      utilsService.handleError(err);
      if(err.response.status !== 403 && err.response.status !== 401) {
        this.service_error = true;
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

  @observable user = {};
  @observable userValidationDone = false;
  @observable authentic_user = false;
  @observable service_error = false;
}

export const userStore = new UserStore();
