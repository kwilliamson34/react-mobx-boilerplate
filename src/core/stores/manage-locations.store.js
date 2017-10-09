import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';
import {utilsService} from '../services/utils.service';
import _ from 'lodash';

class ManageLocationsStore {

	// ACTIONS

  @action fetchRows() {
    //fetch rows from service;
    const success = (res) => {
      console.log('success!', res);
      this.rows = res.userlocationfavorite;
      this.isLoading = false;
    }

    const fail = (res) => {
      console.log('fail!', res);
      this.isLoading = false;
    }

    return apiService.getLocationFavorites().then(success, fail);
  }

	@action handleCheckboxChange(row) {
    console.log('handleCheckboxChange', row);
    this.activeRow = row;
    console.log('this.activeRow', this.activeRow);
    this.checkedRows.indexOf(row) >= 0
      ? this.checkedRows.remove(row)
      : this.checkedRows.push(row);
    console.log('this.checkedRows', this.checkedRows);
	}

	@action searchLocations() {

    //should be searchLocationFavorites or something

	}

	@action handleInput(val) {
		this.searchQuery = val;
	}

	// @action resetApps(){
	// 	this.myApps = {releasedApps: [], unReleasedApps: []};
	// 	this.apps = {
	// 		released: [],
	// 		unReleased: []
	// 	};
	// }

	@action clearSearchQuery(){
		this.searchQuery = '';
	}


	@action toggleSort(key) {
    this.activeColumn = key;
    console.log('this.activeColumn', this.activeColumn);
    this.sortDirections[key] = !this.sortDirections[key];
    console.log('this.sortDirections[key]', this.sortDirections[key]);
	}

  @computed get sortedRows() {
    let sortOrder = this.sortDirections[this.activeColumn] ? 'asc' : 'desc';
  	return _.orderBy(this.rows, [this.activeColumn], [sortOrder]);
  }

  @computed get rowIsChecked() {
    return this.checkedRows.indexOf(this.activeRow) > -1;
  }

  @observable isLoading = false;
  @observable rows = [];
  @observable activeRow = undefined;
  //rows will load with locationFavoriteId in descending order, which corresponds to most recent first;
  @observable activeColumn = 'locationFavoriteId';
  //to keep the order toggling simple, true is ascending and false is descending;
  @observable sortDirections = {
    'favoriteName': false,
    'locationFavoriteAddress': false,
    'locationFavoriteId': false
  };
  @observable checkedRows = [];

}

export const manageLocationsStore = new ManageLocationsStore();
