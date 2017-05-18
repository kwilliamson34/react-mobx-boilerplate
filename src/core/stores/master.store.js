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
			console.log('user',res)
		}
		const fail = (err) => {
			console.warn(err);
			// window.location.replace("https://oidc.stage.flogin.att.com/isam/oidc/endpoint/amapp-runtime-SSPRS/authorize?response_type=id_token+token&client_id=m11635&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post");
		}
		return apiService.validateUserData().then(success, fail);
	}


	// COMPUTEDS
	@computed get lastNameAdded() {
		return this.names[this.names.length - 1];
	}


	// OBSERVABLES
	@observable names = [];

	@observable pages = {};
	@observable user = {};

}

export const pseMasterStore = new PSEStore();
