import {observable, action} from 'mobx';
import {apiService} from '../services/api.service';
import config from 'config';

class UserStore {

    @action validateUser() {
        const success = (res) => {
            let usr_tkn = res.data;

            this.initUserObject(usr_tkn);
            this.checkPermissions();
        }
        const fail = (err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                window.location.replace(config.haloLogin);
            } else {
                console.warn(err);
                this.service_error = true;
            }
        }
        return apiService.validateUserData().then(success, fail);
    }

    @action checkPermissions() {
        if (this.user.roles.indexOf('G_FN_ADM') == -1) {
            this.invalid_user = true;
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
        id : 'asdf',
        iss : '',
        t : '',
        lastName : '',
        roles : [],
        sub : '',
        username : ''
    };

	@observable invalid_user = false;
    @observable service_error = false;
}

export const userStore = new UserStore();
