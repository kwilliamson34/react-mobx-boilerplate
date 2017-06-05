import {action, computed, observable, extendObservable} from 'mobx';

import {headerStore} from './header.store';
import {appCatalogStore} from './app-catalog.store';
import {cardListStore} from './card-list.store';
import {externalLinkStore} from './external-link.store';
import {geolinkStore} from './geolink.store';
import {mdmStore} from './mdm.store';
import {userStore} from './user.store';

class PSEStore {
	constructor() {
		//attach all child stores
		this.headerStore = headerStore;
		this.appCatalogStore = appCatalogStore;
		this.cardListStore = cardListStore;
		this.externalLinkStore = externalLinkStore;
		this.geolinkStore = geolinkStore;
		this.mdmStore = mdmStore;
		this.userStore = userStore;
	}

	// ACTIONS
	@action updateLocation(hash) {
		this.location = hash;
	}

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

	// COMPUTEDS
	@computed get lastNameAdded() {
		return this.names[this.names.length - 1];
	}

	// OBSERVABLES
	@observable names = [];
	@observable pages = {};
}

export const pseMasterStore = new PSEStore();
