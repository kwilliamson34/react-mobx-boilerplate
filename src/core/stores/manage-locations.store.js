import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';
import {utilsService} from '../services/utils.service';
import _ from 'lodash';

class ManageLocationsStore {

	// ACTIONS

  @action fetchRows() {
    //fetch rows from service;
  }

	@action rowSelected(row) {

    //We're going to control all the rows as checkboxes, so this basically does that.

	}

	@action searchApps() {

    //should be searchLocationFavorites or something

	}

	@action handleInput(val) {
		this.searchQuery = val;
	}

	@action resetApps(){
		this.myApps = {releasedApps: [], unReleasedApps: []};
		this.apps = {
			released: [],
			unReleased: []
		};
	}

	@action clearSearchQuery(){
		this.searchQuery = '';
	}

	@action toggleFilter(name, list, bool) {
		this.filters[list][name] = bool;
	}

	@action toggleSort(key) {
    this.sortDirections[key] = !this.sortDirections[key];
	}

  sortRows(row, sortedBy) {
    return row[sortedBy];
  }

  @computed get sortedRows() {
  	return _.orderBy(this.rows, row => this.sortRows(row, this.activeColumn), this.sortDirections[this.activeColumn]);
  }

  @observable rows = [];

  @observable activeColumn = null;
  //up is true, down is false;
  @observable sortDirections = {
    'favoriteName': false,
    'locationFavoriteAddress': false,
    'locationFavoriteId': true
  };

	// @action resetFilters() {
	// 	this.filters = {
	// 		'unReleased': {
	// 			'draft': true,
	// 			'under_review': true,
	// 			'approved': true,
	// 			'rejected': true,
	// 			'withdrawn': false,
	// 		},
	// 		'released': {
	// 			'live': true,
	// 			'inactive': false
	// 		}
	// 	};
	// 	this.searchQuery = '';
	// 	this.searchApps();
	// }
  //
  //

	// @computed get unReleased() {
	// 	let apps = filterApps(this.apps.unReleased, this.filters.unReleased);
	// 	return _.orderBy(apps, app => lowerCaseSort(app, this.sorts.unReleased), this.sortDirection.unReleased)
	// }
  //
	// @computed get statusIndex() {
	// 	let statuses = {'draft': 0, 'under_review': 0,'rejected': 0, 'withdrawn': 0, 'live': 0, 'inactive': 0, 'approved': 0};
	// 	this.apps.released.forEach((app) =>{
	// 		let status = app.custom_metadata.status ? app.custom_metadata.status.toLowerCase() : "Unavailable";
	// 		statuses[status]++
	// 	});
	// 	this.apps.unReleased.forEach((app) =>{
	// 		let status = app.custom_metadata.status ? app.custom_metadata.status.toLowerCase() : "Unavailable";
	// 		statuses[status]++
	// 	});
	// 	return statuses;
	// }
  //
  //
	// // OBSERVABLES
  //
	// @observable isLoading = false;
  //
	// @observable myApps = {releasedApps: [], unReleasedApps: []};
	// @observable apps = {
	// 	released: [],
	// 	unReleased: []
	// };
	// @observable sorts = {
	// 	released: 'custom_metadata.release_date',
	// 	unReleased: 'custom_metadata.submitted_date'
	// };
	// @observable sortDirection = {
	// 	released: 'desc',
	// 	unReleased: 'desc'
	// };
  //
	// @observable searchQuery = '';
	// @observable filters = {
	// 	'unReleased': {
	// 		'draft': true,
	// 		'under_review': true,
	// 		'approved': true,
	// 		'rejected': true,
	// 		'withdrawn': false,
	// 	},
	// 	'released': {
	// 		'live': true,
	// 		'inactive': false
	// 	}
	// };
  //
	// @observable hideSearchBox = false;

}

const searchApps = (apps, query) => {
	if (query === '') {
		return apps;
	} else {
		return _.filter(apps, (app) => app.app_name.toLowerCase().includes(query.toLowerCase()))
	}
};

const filterApps = (apps, filters) => {
	return _.filter(apps, (app) => filters[ (app.custom_metadata.status ? app.custom_metadata.status.toLowerCase() : "Unavailable") ])
};

const lowerCaseSort = (app, sortString) => {
	let sortableKey = _.at(app, sortString)[0];
	if(typeof sortableKey === 'string'){
		return sortableKey.toLowerCase();
	} else {
		return sortableKey;
	}

};

const convertExternalAppsToUnavailableReviewCount = (appsArray) => {
	appsArray.forEach((app) => {
		if ( !app.isInternalApp ) {
			app.download_count = "Unavailable";
		}
	})
};


export const myAppsStore = new MyAppsStore();
