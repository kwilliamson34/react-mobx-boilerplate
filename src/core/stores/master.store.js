import {action, computed, observable, extendObservable} from 'mobx';

import {appCatalogStore} from './app-catalog.store';
import {cardListStore} from './card-list.store';
import {externalLinkStore} from './external-link.store';
import {feedbackStore} from './feedback.store';
import {gtocStore} from './gtoc.store';
import {headerStore} from './header.store';
import {joyrideStore} from './joyride.store';
import {leadCaptureStore} from './lead-capture.store';
import {manageFavoritesStore} from './manage-favorites.store';
import {mdmStore} from './mdm.store';
import {networkStore} from './network.store';
import {userStore} from './user.store';

class PSEStore {
	constructor() {
		//attach all child stores
		this.appCatalogStore = appCatalogStore;
		this.cardListStore = cardListStore;
		this.externalLinkStore = externalLinkStore;
		this.feedbackStore = feedbackStore;
		this.gtocStore = gtocStore;
		this.headerStore = headerStore;
		this.joyrideStore = joyrideStore;
		this.leadCaptureStore = leadCaptureStore;
		this.manageFavoritesStore = manageFavoritesStore;
		this.mdmStore = mdmStore;
		this.networkStore = networkStore;
		this.userStore = userStore;
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
