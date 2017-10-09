import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
// import {history} from '../services/history.service';
// import {utilsService} from '../services/utils.service';
import _ from 'lodash';

class ManageLocationsStore {

	// ACTIONS

  @action fetchRows() {
    //fetch rows from service;
    const success = (res) => {
      console.log('success!', res);
      this.rows = res.userlocationfavorite;
      this.isLoading = false;
      this.handlePagination();
    }

    const fail = (res) => {
      console.log('fail!', res);
      this.isLoading = false;
    }

    return apiService.getLocationFavorites().then(success, fail);
  }

  @action handlePagination() {
    this.paginationCount++;
    const endingIndex = this.paginationCount * this.paginationInterval;
    this.paginatedRows = this.rows.slice(0, endingIndex);
    this.moreToLoad = this.paginatedRows < this.rows;
  }

	@action handleCheckboxChange(row) {
    this.checkedRows.indexOf(row) > -1
      ? this.checkedRows.remove(row)
      : this.checkedRows.push(row);
	}

  @action selectAllCheckboxes() {
    this.paginatedRows.forEach(row => {
      const id = row.locationFavoriteId.toString();
      if (this.checkedRows.indexOf(id) < 0) {
        this.checkedRows.push(id);
      }
    });
  }


  @action clearAllCheckboxes() {
    this.checkedRows = [];
  }

	@action searchLocations() {

    //should be searchLocationFavorites or something

	}

	@action handleInput(val) {
		this.searchQuery = val;
	}

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
  	return _.orderBy(this.paginatedRows, [this.activeColumn], [sortOrder]);
  }

  @computed get rowIsChecked() {
    return this.checkedRows.indexOf(this.activeRow) > -1;
  }

  @observable isLoading = false;
  @observable rows = [];

  @observable paginatedRows = [];
  @observable paginationCount = 0;
  @observable paginationInterval = 5;
  @observable moreToLoad = false;

  @observable checkedRows = [];

  //rows will load with locationFavoriteId in descending order, which corresponds to most recent first;
  @observable activeColumn = 'locationFavoriteId';
  //to keep the order toggling simple, true is ascending and false is descending;
  @observable sortDirections = {
    'favoriteName': false,
    'locationFavoriteAddress': false,
    'locationFavoriteId': false
  };

}

export const manageLocationsStore = new ManageLocationsStore();
