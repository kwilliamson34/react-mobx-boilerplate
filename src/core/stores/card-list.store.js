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

	@action fetchCategoriesAndSegments() {
		const success = (res) => {
			this.categories = res.data.categories;
			this.segments = res.data.user_segments;
			return res;
		}
		const fail = (err) => {
			utilsService.handleError(err);
		}
		return apiService.getCategoriesAndSegments().then(success, fail)
	}

	@action clearSearchQuery() {
		this.searchQuery = '';
		this.searchIsApplied = false;
		this.searchResults = this.originalCardList;
	}

	@action getSearchResults = _.debounce(() => {
		const success = (response) => {
			this.searchResults = response;
			this.isLoading = false;
			this.searchIsApplied = true;
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

	@computed get filterIsApplied() {
		return this.categoryFilter || this.segmentFilter|| this.platformFilter;
	}

	@computed get resultsCountLabel() {
		if(!this.isLoading && (this.searchIsApplied || this.filterIsApplied)) {
			const count = this.filteredSearchResults.length;
			return count ? `${count} Result${count === 1 ? '' : 's'}` : '';
		}
	}

	// OBSERVABLES
	@observable originalCardList = [];
	@observable searchResults = [];
	@observable searchQuery = '';
	@observable isLoading = false;
	@observable searchIsApplied = false;
	@observable filterElementRefs = [];
	@observable idToFocus = null;

	@observable platforms = [{
			display: 'iOS',
			name: 'IOS'
		},
		{
			display: 'Android',
			name: 'ANDROID'
		}
	];
	@observable platformFilter = '';
	@observable categories = [];
	@observable categoryFilter = '';
	@observable segments = [];
	@observable segmentFilter = '';
}

export const cardListStore = new CardListStore();
