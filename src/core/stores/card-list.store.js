import { action, computed, observable } from 'mobx';
import { apiService } from '../services/api.service';
import _ from 'lodash';

// Category Mapping
const user_segment = {
	RECOMMENDED: 1,
	FIRE_RESCUE: 201,
	LAW_ENFORCEMENT: 200,
	EMERGENCY_MEDICAL: 204,
	DISPATCH: 203,
	CRITICAL_INFRASTRUCTURE: 205
};

class CardListStore {

	// ACTIONS
	@action fetchCardList() {
		if(!this.searchResults.length) {
			const success = (res) => {
				this.searchResults = res;
				return this.searchResults;
			}
			const fail = (err) => {
				console.warn(err);
			}
			return apiService.getAdminApps().then(success, fail)
		}
	}

	@action setCurrentApp(psk){
    this.currentAppPsk = psk;
	}

	@action clear() {
		this.searchQuery = '';
	}

	@action getSearchResults = _.debounce(() => {
		const success = (response) => {
			this.searchResults = response;
			this.finishLoading();
		}

		const failure = (error) => {
			console.warn(error);
			this.searchResults = [];
			this.finishLoading();
		}

		this.isLoading = true;
		apiService.getSearchResults(encodeURIComponent(this.searchQuery)).then(success, failure)
	}, 500, {
		leading: true,
		trailing: false
	});

	@action finishLoading() {
		this.isLoading = false;
	}

	@action handleInput(value) {
		this.searchQuery = value;
	}

	@action changeCategoryFilter(value) {
		this.categoryFilter = value;
	}

	@action changeSegmentFilter(value) {
		this.segmentFilter = value;
	}

	@action changePlatformFilter(value) {
		this.platformFilter = value;
	}

	//COMPUTEDS
	@computed get currentCard() {
		return this.searchResults.filter((app) => {
			return this.currentAppPsk == app.psk.toString();
		})[0];
	}

	@computed get recommendedCards() {
		return this.searchResults.filter((app) => {
			return (app.recommended)
		})
	}

	@computed get fireCards() {
		return this.searchResults.filter((app) => {
			return (app.user_segment.indexOf(user_segment.FIRE_RESCUE) > -1)
		})
	}

	@computed get lawCards() {
		return this.searchResults.filter((app) => {
			return (app.user_segment.indexOf(user_segment.LAW_ENFORCEMENT) > -1)
		})
	}

	@computed get emergencyCards() {
		return this.searchResults.filter((app) => {
			return (app.user_segment.indexOf(user_segment.EMERGENCY_MEDICAL) > -1)
		})
	}

	@computed get dispatchCards() {
		return this.searchResults.filter((app) => {
			return (app.user_segment.indexOf(user_segment.DISPATCH) > -1)
		})
	}

	// probably to be deprecated.
	@computed get searchButtonIsEnabled() {
		return true;
	}

	@computed get filteredSearchResults() {
		return this.searchResults.filter((app) => {
			let categoryCheck = () => {
				if (this.categoryFilter) {
					return app.category.indexOf(+this.categoryFilter) > -1
				} else {
					return true;
				}
			}
			let segmentCheck = () => {
				if (this.segmentFilter) {
					return app.user_segment.indexOf(+this.segmentFilter) > -1
				} else {
					return true;
				}
			}
			let platformCheck = () => {
				if (this.platformFilter) {
					return app.platforms === this.platformFilter;
				} else {
					return true;
				}
			}
			return (categoryCheck() && segmentCheck() && platformCheck())
		})
	}

	@computed get isFiltered() {
		return (this.categoryFilter || this.segmentFilter || this.platformFilter)
	}

	// OBSERVABLES
	@observable categoryFilter = 'Select Category';
	@observable segmentFilter = 'Select Filter';

	@observable searchResults = [];
	@observable currentAppPsk = '';
	@observable searchQuery = '';
	@observable isLoading = false;

	@observable platforms = [{
			title: 'All Platforms',
			value: ''
		},
		{
			title: 'iOS',
			value: 'iOS'
		},
		{
			title: 'Android',
			value: 'Android'
		}
	];
	@observable platformFilter = '';

	@observable categories = [{
			title: 'All Categories',
			value: ''
		},
		{
			title: 'Public Safety (Communication) Tools',
			value: 100
		},
		{
			title: 'Device Security',
			value: 101
		},
		{
			title: 'Secure Connections',
			value: 102
		},
		{
			title: 'Cloud Solutions',
			value: 103
		},
		{
			title: 'Next Gen 9-1-1',
			value: 104
		},
		{
			title: 'CAD Solutions',
			value: 105
		},
		{
			title: 'Video Surveillance',
			value: 106
		},
		{
			title: 'In Building Coverage & Mapping',
			value: 107
		},
		{
			title: 'Situational Awareness & Detection',
			value: 108
		},
		{
			title: 'Cyber Security & Fraud Detection',
			value: 109
		},
		{
			title: 'Forensic Intelligence',
			value: 110
		},
		{
			title: 'Public Safety Community',
			value: 111
		}
	];
	@observable categoryFilter = '';

	@observable segments = [{
			title: 'All Segments',
			value: ''
		},
		{
			title: 'Law Enforcement',
			value: 200
		},
		{
			title: 'Fire & Rescue',
			value: 201
		},
		{
			title: 'Emergency Medical',
			value: 202
		},
		{
			title: 'Hazmat Dispatch',
			value: 203
		},
		{
			title: 'Emergency Management',
			value: 204
		},
		{
			title: 'Critical Infrastructure',
			value: 205
		}
	];
	@observable segmentFilter = '';
}

export const cardListStore = new CardListStore();
