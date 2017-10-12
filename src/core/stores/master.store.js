import {action, computed, observable, extendObservable} from 'mobx';

import {headerStore} from './header.store';
import {appCatalogStore} from './app-catalog.store';
import {cardListStore} from './card-list.store';
import {contentStore} from './content.store';
import {externalLinkStore} from './external-link.store';
import {geolinkStore} from './geolink.store';
import {feedbackStore} from './feedback.store';
import {gtocStore} from './gtoc.store';
import {manageFavoritesStore} from './manage-favorites.store';
import {mdmStore} from './mdm.store';
import {userStore} from './user.store';
import {joyrideStore} from './joyride.store';

class PSEStore {
	constructor() {
		//attach all child stores
		this.headerStore = headerStore;
		this.appCatalogStore = appCatalogStore;
		this.contentStore = contentStore;
		this.cardListStore = cardListStore;
		this.externalLinkStore = externalLinkStore;
		this.geolinkStore = geolinkStore;
		this.feedbackStore = feedbackStore;
		this.gtocStore = gtocStore;
		this.manageFavoritesStore = manageFavoritesStore;
		this.mdmStore = mdmStore;
		this.userStore = userStore;
		this.joyrideStore = joyrideStore;
	}

	getUser() {
		return this.userStore.user;
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

	@action resetPage(id) {
		this.pages[id] = 1;
	}

	// COMPUTEDS
	@computed get lastNameAdded() {
		return this.names[this.names.length - 1];
	}

	@computed get isLoggedIn() {
		return this.userStore.isAuthenticUser;
	}

	// OBSERVABLES
	@observable names = [];
	@observable pages = {};
}

export const pseMasterStore = new PSEStore();
