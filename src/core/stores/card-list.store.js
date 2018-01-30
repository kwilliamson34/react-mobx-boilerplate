import {action, computed, observable} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import _ from 'lodash';

class CardListStore {

  // ACTIONS
  @action setCardList(appArray) {
    this.originalCardList = appArray;

    /* If the user has already performed a search, left the page, and
    returned, re-execute the search with the same parameters (the app
    catalog may have changed). */
    if (this.searchIsApplied) {
      this.getSearchResults();
    } else {
      this.searchResults = appArray;
    }
  }

  @action fetchCategoriesAndSegments() {
    /* Retrieve categories and segments once and cache forever */
    if (!this.categories.length || !this.segments.length) {
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

	@action changeFilter(value, filter) {
		this.filters[filter] = value;
	}

	@action toggleFilter(value, filter) {
		if (this.filters[filter] === value) {
			this.filters[filter] = '';
		} else {
			this.filters[filter] = value;
		}
	}

	@action resetFilters() {
		this.filters.platform = '';
		this.filters.category = '';
		this.filters.segment = '';
		this.filters.device = '';
	}

  @action restoreOriginalList() {
    this.resetFilters();
    this.clearSearchQuery();
    this.searchResults = this.originalCardList;
  }

  @action setIdToFocus(targetId) {
    this.idToFocus = targetId;
  }

  @action resetIdToFocus() {
    this.idToFocus = null;
  }

  @action toggleFilterShowHide() {
    this.showFilters = !this.showFilters;
  }

  @action addSelectedCard(psk) {
    this.selectedCards.push(psk);
  }

  @action clearSelectedCards = () => {
    this.selectedCards = [];
  }

  //COMPUTEDS
  @computed get recommendedCards() {
    return this.searchResults.filter((app) => {
      return (app.isRecommended)
    })
  }

  @computed get filteredSearchResults() {
    return this.searchResults.filter((app) => {
      let categoryCheck = () => {
        if (this.filters.category) {
          let matches = app.category.filter(category => {
            return category.toUpperCase() === this.filters.category.toUpperCase()
          });
          return matches.length > 0;
        } else {
          return true;
        }
      }
      let segmentCheck = () => {
        if (this.filters.segment) {
          let matches = app.user_segment.filter(segment => {
            return segment.toUpperCase() === this.filters.segment.toUpperCase()
          });
          return matches.length > 0;
        } else {
          return true;
        }
      }
      let platformCheck = () => {
        if (this.filters.platform) {
          return app.platform.toUpperCase() === this.filters.platform.toUpperCase();
        } else {
          return true;
        }
      }
      return (categoryCheck() && segmentCheck() && platformCheck())
    })
  }

  @computed get filterIsApplied() {
    return (this.filters.category || this.filters.segment || this.filters.platform) ? true : false;
  }

  @computed get resultsCountLabel() {
    if (!this.isLoading && (this.searchIsApplied || this.filterIsApplied)) {
      const count = this.filteredSearchResults.length;
      return count ? `${count} Result${count === 1 ? '' : 's'}` : '';
    }
  }

  // OBSERVABLES
  @observable originalCardList = [];
  @observable searchResults = [];
  @observable selectedCards = [];
  @observable searchQuery = '';
  @observable isLoading = false;
  @observable searchIsApplied = false;
  @observable idToFocus = null;
  @observable showFilters = false;
	@observable filters = {
		category: '',
		segment: '',
		platform: '',
		device: ''
	}
	@observable categories = [];
	@observable segments = [];
	@observable platforms = [
		{display: 'iOS', name: 'IOS', icon: 'icon-apple'},
		{display: 'Android', name: 'ANDROID', icon: 'icon-android'}
	];
}

export const cardListStore = new CardListStore();