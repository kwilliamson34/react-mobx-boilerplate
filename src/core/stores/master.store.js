import {
	action,
	computed,
	observable,
	extendObservable
} from 'mobx';
import { apiService } from '../services/api.service';

// import { searchStore } from './search.store';
import {
	headerStore
} from './header.store';
import {
	cardListStore
} from './card-list.store';
import {
	mpStore
} from './external-portal.store';
import {
	geolinkStore
} from './geolink.store';

class PSEStore {

	constructor() {
		// this.searchStore = searchStore;
		this.headerStore = headerStore;
		this.cardListStore = cardListStore;
		this.externalContentStore = mpStore;
		this.geolinkStore = geolinkStore;
	}

	// ACTIONS
	@action nameFieldChange(value) {
		this.nameFieldStr = value;
	}

	@action registerPage(id) {
		if (!this.pages[id]) {
			extendObservable(this.pages, {
				[id]: 1
			});
		}
	}

	@action changePage(id) {
		this.pages[id]++;
	}

	@action validateUser(){
		const success = (res) => {
			let usr_tkn = res.data

			this.user_token = usr_tkn;
			this.setUserObject(usr_tkn);

			if (this.user.roles.indexOf('G_FN_ADM') === -1) {
				window.location.replace('/unauthorized_user');
			}
		}
		const fail = (err) => {
			window.location.replace("https://oidc.stage.flogin.att.com/isam/oidc/endpoint/amapp-runtime-SSPRS/authorize?response_type=id_token+token&client_id=m11635&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post");
		}
		return apiService.validateUserData().then(success, fail);
	}

	setUserObject(tk_response) {
		let tk_array = tk_response.split(".");
		let user_obj = JSON.parse(window.atob(tk_array[1]));
		console.log(user_obj)

		this.user = user_obj;
	}


	// COMPUTEDS
	@computed get lastNameAdded() {
		return this.names[this.names.length - 1];
	}


	// OBSERVABLES
	@observable names = [];

	@observable pages = {};
	@observable user = {};
	@observable user_token = '';

}

export const pseMasterStore = new PSEStore();
