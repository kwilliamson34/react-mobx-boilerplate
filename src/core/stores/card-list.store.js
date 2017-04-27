import { action, autorun, computed, observable } from 'mobx';
import { apiService } from '../services/api.service';
import { history } from '../services/history.service';
import _ from 'lodash';

// Category Mapping
const user_segment = {
    RECOMMENDED: 1,
    FIRE_RESCUE: 201,
    LAW_ENFORCEMENT: 200,
    EMERGENCY_MEDICAL: 204,
    DISPATCH: 203,
    CRITICAL_INFRASTURCUTRE: 205
};



class CardListStore {

    constructor() {
        autorun(() => {
            if (this.searchIsVisible) {
                this.clear();
            }
        });
    }

    listenForRouteChanges() {
      history.listen((location, action) => {
        if(action === 'PUSH' && location.pathname !== '/search-results') {
          this.reset();
          this.handleClose();
        }
      });
    }

    // ACTIONS
    @action getHomeCards() {
        const success = (res) => {
            this.homeCards = res;
            return this.homeCards;
        }
        const fail = (err) => {
            console.warn(err);
        }
        return apiService.getHomeCards().then(success, fail)
    }

    @action clear() {
        this.searchQuery = '';
    }

    @action reset() {
        this.searchResults = null;
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
        apiService.getSearchResults(this.searchQuery)
            .then(success, failure)
    }, 500, { leading: true, trailing: false });

    @action finishLoading() {
        this.isLoading = false;
        history.push('/search-results');
    }

    @action handleInput(value) {
        this.searchQuery = value;
    }

    @action handleClose() {
        this.searchIsVisible = false;
    }

    @action searchIconClick() {
        this.searchIsVisible = true;
    }

    @action changeCategoryFilter(value) {
        this.categoryFilter = value;
    }

    @action changeSegmentFilter(value) {
        this.segmentFilter = value;
    }



    //COMPUTEDS

    @computed get recommendedCards() {
        return this.homeCards.filter((app) => {
            return (app.recommended)
        })
    }
    @computed get fireCards() {
        return this.homeCards.filter((app) => {
            return (app.user_segment.indexOf(user_segment.FIRE_RESCUE) > -1)
        })
    }
    @computed get lawCards() {
        return this.homeCards.filter((app) => {
            return (app.user_segment.indexOf(user_segment.LAW_ENFORCEMENT) > -1)
        })
    }
    @computed get emergencyCards() {
        return this.homeCards.filter((app) => {
            return (app.user_segment.indexOf(user_segment.EMERGENCY_MEDICAL) > -1)
        })
    }
    @computed get dispatchCards() {
        return this.homeCards.filter((app) => {
            return (app.user_segment.indexOf(user_segment.DISPATCH) > -1)
        })
    }

    @computed get searchButtonIsEnabled() {
        return this.searchQuery !== '';
    }

    @computed get numSearchResults() {
        if (this.searchResults) {
            return this.searchResults.length;
        } else {
            return 0;
        }
    }

    @computed get filteredSearchResults() {
        return this.homeCards.filter((app) => {
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
            return (categoryCheck() && segmentCheck())
        })
    }

    @computed get isFiltered() {
        if( this.categoryFilter !== '' || this.segmentFilter !== '' ){
            return true;
        } else {
            return false;
        }
    }

    // OBSERVABLES

    @observable homeCards = [];
    @observable categoryFilter = 'Select Category';
    @observable segmentFilter = 'Select Fitler';

    @observable searchIsVisible = false;
    @observable searchQuery = '';
    @observable searchResults = null;
    @observable isLoading = false;

    @observable categories = [
        { title: 'Category', value: '' }
    ];
    @observable categoryFilter = '';
    @observable segments = [
        { title: 'Segment', value: '' },
        { title: 'Law Enforcement', value: 200 },
        { title: 'Fire & Rescue', value: 201 },
        { title: 'Emergency Medical', value: 202 },
        { title: 'Hazmat Dispatch', value: 203 },
        { title: 'Emergency Management', value: 204 },
        { title: 'Critical Infrastructure', value: 205 },
    ];
    @observable segmentFilter = '';
}

export const cardListStore = new CardListStore();
