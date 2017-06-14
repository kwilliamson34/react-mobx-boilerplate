import {action, computed, observable} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import _ from 'lodash';

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

		const fail = (err) => {
			utilsService.handleError(err);
			this.searchResults = [];
			this.isLoading = false;
		}

		this.isLoading = true;
		apiService.getSearchResults(encodeURIComponent(this.searchQuery)).then(success, fail)
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

	@action setIdToFocus(targetId) {
		this.idToFocus = targetId;
	}

	//COMPUTEDS
	@computed get recommendedCards() {
		return this.searchResults.filter((app) => {
			return (app.recommended)
		})
	}

	@computed get fireCards() {
		return this.searchResults.filter((app) => {
			return app.user_segment.filter(segment => {
				return segment.toUpperCase() === 'FIRE & RESCUE'
			}).length > 0;
		})
	}

	@computed get lawCards() {
		return this.searchResults.filter((app) => {
			return app.user_segment.filter(segment => {
				return segment.toUpperCase() === 'LAW ENFORCEMENT'
			}).length > 0;
		})
	}

	@computed get emergencyCards() {
		return this.searchResults.filter((app) => {
			return app.user_segment.filter(segment => {
				return segment.toUpperCase() === 'EMERGENCY MEDICAL'
			}).length > 0;
		})
	}

	@computed get dispatchCards() {
		return this.searchResults.filter((app) => {
			return app.user_segment.filter(segment => {
				return segment.toUpperCase() === 'HAZMAT DISPATCH'
			}).length > 0;
		})
	}

	@computed get filteredSearchResults() {
		return this.searchResults.filter((app) => {
			let categoryCheck = () => {
				if (this.categoryFilter) {
					let matches = app.category.filter(category => {
						return category.toUpperCase() === this.categoryFilter.toUpperCase()
					});
					return matches.length > 0;
				} else {
					return true;
				}
			}
			let segmentCheck = () => {
				if (this.segmentFilter) {
					let matches = app.user_segment.filter(segment => {
						return segment.toUpperCase() === this.segmentFilter.toUpperCase()
					});
					return matches.length > 0;
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
	@observable idToFocus = null;

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
	@observable categories = [
    {title: 'All Categories', value: ''},
    {title: 'Public Safety (Communication) Tools', value: 'PUBLIC SAFETY (COMMUNICATION)TOOLS'},
    {title: 'Device Security', value: 'DEVICE SECURITY'},
    {title: 'Secure Connections', value: 'SECURE CONNECTIONS'},
    {title: 'Cloud Solutions', value: 'CLOUD SOLUTIONS'},
    {title: 'Next Gen 9-1-1', value: 'NEXT GEN 9-1-1'},
    {title: 'CAD Solutions', value: 'CAD SOLUTIONS'},
    {title: 'Video Surveillance', value: 'VIDEO SURVEILLANCE'},
    {title: 'In Building Coverage & Mapping', value: 'IN BUILDING COVERAGE & MAPPING'},
    {title: 'Situational Awareness & Detection', value: 'SITUATIONAL AWARENESS & DETECTION'},
    {title: 'Cyber Security & Fraud Detection', value: 'CYBER SECURITY & FRAUD DETECTION'},
    {title: 'Forensic Intelligence', value: 'FORENSIC INTELLIGENCE'},
    {title: 'Public Safety Community', value: 'PUBLIC SAFETY COMMUNITY'}
  ];
	@observable categoryFilter = '';

	@observable segments = [
		{title: 'All Segments', value: ''},
		{title: 'Law Enforcement', value: 'LAW ENFORCEMENT'},
		{title: 'Fire & Rescue', value: 'FIRE & RESCUE'},
		{title: 'Emergency Medical', value: 'EMERGENCY MEDICAL'},
		{title: 'Hazmat Dispatch', value: 'HAZMAT DISPATCH'},
		{title: 'Emergency Management', value: 'EMERGENCY MANAGEMENT'},
		{title: 'Critical Infrastructure', value: 'CRITICAL INFRASTRUCTURE'}
	];
	@observable segmentFilter = '';
}

export const cardListStore = new CardListStore();
