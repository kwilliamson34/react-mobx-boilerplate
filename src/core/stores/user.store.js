import { observable, action } from 'mobx';
import { apiService } from '../services/api.service';

class UserStore {

    @action validateUser() {
        const success = (res) => {
            let usr_tkn = res.data;

            this.initUserObject(usr_tkn);
            this.checkPermissions();
        }
        const fail = (err) => {
            if(err.response.status === 401){
                window.location.replace('https://oidc.stage.flogin.att.com/isam/oidc/endpoint/amapp-runtime-SSPRS/authorize?response_type=id_token+token&client_id=m11635&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post');
            }
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
	@observable authentic_user = false;
}

export const userStore = new UserStore();