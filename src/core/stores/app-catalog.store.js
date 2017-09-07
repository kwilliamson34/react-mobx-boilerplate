import {action, observable} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {mdmStore} from '../stores/mdm.store';
import {cardListStore} from './card-list.store';

class AppCatalogStore {

	// ACTIONS
	@action fetchAppCatalog() {
		const success = (res) => {
			this.allApps = res;
			cardListStore.setCardList(res);
			this.isLoading = false;
			mdmStore.processMDMStatusForAppCatalog({apps: res, addBatchAlerts: !this.catalogHasBeenViewed});
			return this.allApps;
		}
		const fail = (err) => {
			utilsService.handleError(err);
			this.isLoading = false;
		}
		this.isLoading = true;
		return apiService.getAdminApps().then(success, fail)
	}

	@action setCurrentApp(psk){
		this.currentAppObject = this.allApps.filter((app) => {
			return psk.toString() == app.app_psk.toString();
		})[0];
	}

	@action getMatchingApp(psk){
		if(!this.allApps) {
			console.log('fetchAppCatalog has not been called yet!');
		}

		return this.allApps.filter((app) => {
			return psk.toString() == app.app_psk.toString();
		})[0];
	}

	@action fetchAppDetailByPsk(psk) {
		this.setCurrentApp(psk);

		let success = (response) => {
			this.allApps.remove(this.currentAppObject);
			let newAppObject = response[0];
			newAppObject.detailsFetched = true;
			this.allApps.push(newAppObject);
			this.currentAppObject = newAppObject;
			this.isLoading = false;
		}

		let failure = (err) => {
			utilsService.handleError(err);
			this.isLoading = false;
		}

		this.isLoading = true;
		return apiService.getAppDetails(psk).then(success, failure);
	}

	@action changeAppAvailability(appPSK, isAvailable) {
		this.setCurrentApp(appPSK);

		//update the allApps array to reflect the change
		this.currentAppObject.isAvailable = isAvailable;

		if (isAvailable) {
			apiService.addAppToGroup(appPSK, 'Available');
		} else {
			apiService.removeAppFromGroup(appPSK, 'Available');

			if (this.currentAppObject.isRecommended) {
				this.currentAppObject.isRecommended = false;
				apiService.removeAppFromGroup(appPSK, 'Recommended');
			}
		}
	}

	@action changeAppRecommended(appPSK, isRecommended) {
		this.setCurrentApp(appPSK);

		if (this.currentAppObject.isAvailable) {
			//update the allApps array to reflect the change
			this.currentAppObject.isRecommended = isRecommended;

			if (isRecommended) {
				apiService.addAppToGroup(appPSK, 'Recommended');
			} else {
				apiService.removeAppFromGroup(appPSK, 'Recommended');
			}
		}
	}

	// OBSERVABLES
	@observable allApps = [];
	@observable currentAppObject = {};
	@observable screenshots = [];
	@observable isLoading = false;
	@observable catalogHasBeenViewed = false;
}

export const appCatalogStore = new AppCatalogStore();
