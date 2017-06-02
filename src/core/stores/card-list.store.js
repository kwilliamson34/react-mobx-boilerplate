import {action, computed, observable} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
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
				this.originalCardList = res;
				this.searchResults = res;
				this.isLoading = false;
				return this.searchResults;
			}
			const fail = (err) => {
				utilsService.handleError(err);
				this.isLoading = false;
			}
			this.isLoading = true;
			return apiService.getAdminApps().then(success, fail)
		}
	}

	@action clearSearchQuery() {
		this.searchQuery = '';
		this.searchHasBeenApplied = false;
	}

	@action getSearchResults = _.debounce(() => {
		const success = (response) => {
			this.searchResults = response;
			this.isLoading = false;
			this.searchHasBeenApplied = true;
		}

		const failure = (err) => {
			utilsService.handleError(err);
			this.searchResults = [];
			this.isLoading = false;
		}

		this.isLoading = true;
		apiService.getSearchResults(encodeURIComponent(this.searchQuery)).then(success, failure)
	}, 500, {
		leading: true,
		trailing: false
	});

	@action handleSearchInput(value) {
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

	@action addFilterElementRef(id, ref) {
		this.filterElementRefs[id] = ref;
	}

	@action resetFilters() {
		this.categoryFilter = '';
		this.segmentFilter = '';
		this.platformFilter = '';

		Object.keys(this.filterElementRefs).forEach((key) => {
			this.filterElementRefs[key].value = '';
		});
	}

	@action restoreOriginalList() {
		this.resetFilters();
		this.clearSearchQuery();
		this.searchResults = this.originalCardList;
	}

	//COMPUTEDS
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
					return app.operatingSystem.toUpperCase() === this.platformFilter.toUpperCase();
				} else {
					return true;
				}
			}
			return (categoryCheck() && segmentCheck() && platformCheck())
		})
	}

	@computed get searchResultsCountLabel() {
		if(!this.isLoading && this.searchHasBeenApplied) {
			const count = this.searchResults.length;
			return `${count} Result${count === 1 ? '' : 's'}`
		}
	}

	// OBSERVABLES
	@observable originalCardList = [];
	@observable searchResults = [];
	@observable searchQuery = '';
	@observable isLoading = false;
	@observable searchHasBeenApplied = false;
	@observable filterElementRefs = [];

	@observable platforms = [{
			title: 'All Platforms',
			value: ''
		},
		{
			title: 'iOS',
			value: 'IOS'
		},
		{
			title: 'Android',
			value: 'ANDROID'
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
