import {
	action,
	computed,
	observable,
	extendObservable
} from 'mobx';
//import { apiService } from '../services/api.service';

import {headerStore} from './header.store';
import {appCatalogStore} from './app-catalog.store';
import {cardListStore} from './card-list.store';
import {mpStore} from './external-portal.store';
import {geolinkStore} from './geolink.store';
import {mdmStore} from './mdm.store';

class PSEStore {

	constructor() {
		this.headerStore = headerStore;
		this.appCatalogStore = appCatalogStore;
		this.cardListStore = cardListStore;
		this.externalContentStore = mpStore;
		this.geolinkStore = geolinkStore;
		this.mdmStore = mdmStore;
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

	// COMPUTEDS
	@computed get lastNameAdded() {
		return this.names[this.names.length - 1];
	}

	// OBSERVABLES
	@observable names = [];
	@observable pages = {};
}

export const pseMasterStore = new PSEStore();
