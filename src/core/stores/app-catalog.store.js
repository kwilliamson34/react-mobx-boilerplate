import { action, observable } from 'mobx';
import { apiService } from '../services/api.service';

const imgBaseURL = 'https://ease.apperian.com/uploads/';

class AppCatalogStore {

	// ACTIONS
	@action fetchAppCatalog() {
		const success = (res) => {
			this.allApps = res;
			return this.allApps;
		}
		const fail = (err) => {
			console.warn(err);
		}
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
		}

		let failure = (error) => {
			console.warn(error);
		}

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

	@action createScreenshotArray () {
		if (this.currentAppObject.mobileScreenshots) {
			var mobileSS = [];
			mobileSS =  this.currentAppObject.mobileScreenshots.map((ss) => {
				return {
					description: ss.description,
					path: imgBaseURL + ss.path
				}
			});
			this.screenshots.mobileScreenshots = mobileSS;
		}

		if (this.currentAppObject.tabletScreenshots) {
			var tabletSS = [];
			tabletSS =  this.currentAppObject.tabletScreenshots.map((ss) => {
				return {
					description: ss.description,
					path: imgBaseURL + ss.path
				}
			});
			this.screenshots.tabletScreenshots = tabletSS;
		}

	}

	// OBSERVABLES
	@observable allApps = [];
	@observable currentAppObject = {};
	@observable screenshots = {
		mobileScreenshots: [],
		tabletScreenshots: []
	};
}

export const appCatalogStore = new AppCatalogStore();
