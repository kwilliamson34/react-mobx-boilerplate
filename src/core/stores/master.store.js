import {action, observable, extendObservable} from 'mobx';

import {feedbackStore} from './feedback.store';
import {headerStore} from './header.store';
import {userStore} from './user.store';

class MasterStore {
	constructor() {
		//attach all child stores
		this.feedbackStore = feedbackStore;
		this.headerStore = headerStore;
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

	// OBSERVABLES
	@observable names = [];
	@observable pages = {};
}

export const masterStore = new MasterStore();
