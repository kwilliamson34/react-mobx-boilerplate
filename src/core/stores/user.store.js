import {observable, action} from 'mobx';
import {apiService} from '../services/api.service';

class UserStore {

  @action validateUser() {
    const success = (res) => {
      this.initUserObject(res.data);
      this.userIsAuthenticated = true;
      this.validationPromise = null;
    }

    const fail = (err) => {
      this.userIsAuthenticated = false;
      this.validationPromise = null;
      console.log(err);
    }

    this.userIsAuthenticated = false;
    this.validationPromise = apiService.validateUser().then(success, fail);
    return this.validationPromise;
  }

  @action revalidateUser() {
    //throttle validation
    if (this.validationPromise !== null) {
      //return promise to execute once flag is cleared
      return this.validationPromise;
    } else {
      return this.validateUser();
    }
  }

  @action initUserObject(response) {
    this.user = response;
  }

  @action logoutUser() {
    apiService.logoutUser();
  }

  @observable user = {};
  @observable validationPromise = null;
  @observable userIsAuthenticated = false;
}

export const userStore = new UserStore();
