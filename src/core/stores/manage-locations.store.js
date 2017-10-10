import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
// import {history} from '../services/history.service';
// import {utilsService} from '../services/utils.service';
import _ from 'lodash';

class ManageLocationsStore {

	// ACTIONS

  @action fetchRows() {
    const success = (res) => {
      console.log('success!', res);
      this.rows = res.userlocationfavorite;
      this.isLoading = false;
      this.advancePagination();
    }

    const fail = (res) => {
      console.log('fail!', res);
      this.isLoading = false;
    }

    return apiService.getLocationFavorites().then(success, fail);
  }

  @action advancePagination() {
    this.paginationCount++;
    this.handlePagination();
  }

  @action handlePagination() {
    const endingIndex = this.paginationCount * this.paginationInterval;
    this.paginatedRows = this.rows.slice(0, endingIndex);
    this.moreToLoad = this.paginatedRows < this.rows;
  }

  @action deleteFavorites() {
    _.remove(this.rows, (row) => {
      const idToFind = row.locationFavoriteId.toString();
      return this.checkedRows.indexOf(idToFind) > -1;
    })
    this.clearAllCheckboxes();
    this.handlePagination();
    this.showDeleteModal = false;

    // const success = (res) => {
    //   console.log('delete success!!', res);
    //   _.remove(this.rows, (row => {
    //     const idToFind = row.locationFavoriteId;
    //     return this.checked.indexOf(idToFind) > 0;
    //   }))
    //   console.log('this.rows after delete', this.rows);
    // }
    // const fail = (res) => {
    //   console.log('delete fail!', res);
    // }
    //
    // return apiService.deleteLocationFavorites().then(success, fail);
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
  //
	// @action searchLocations() {
  //
	// }
  //
	// @action handleInput(val) {
	// 	this.searchQuery = val;
	// }
  //
	// @action clearSearchQuery(){
	// 	this.searchQuery = '';
	// }

	@action toggleSort(key) {
    this.activeColumn = key;
    this.sortDirections[key] = !this.sortDirections[key];
    console.log('this.activeColumn', this.activeColumn);
    console.log('this.sortDirections[key]', this.sortDirections[key]);
	}

  @computed get sortedRows() {
    const sortOrder = this.sortDirections[this.activeColumn] ? 'asc' : 'desc';
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
