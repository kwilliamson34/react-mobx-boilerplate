import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';
import _ from 'lodash';
import $ from 'jquery';

class ManageLocationsStore {

	// ACTIONS

  @action fetchRows() {
    const success = (res) => {
      console.log('success!', res.data);
      //initially ordering rows by locationFavoriteId in desc order, which corresponds to 'most recent' first.
      this.rows = _.orderBy(res.data.userlocationfavorite, ['locationFavoriteId'], ['desc']);;
      this.isLoading = false;
      this.advancePagination();
    }

    const fail = (err) => {
      console.log('fail!', err);
      this.isLoading = false;
      utilsService.handleError(err);
    }

    return apiService.getLocationFavorites().then(success, fail);
  }

  @action advancePagination() {
    this.paginationCount++;
    this.handlePagination();
  }

  @action handlePagination() {
    const endingIndex = this.paginationCount * this.paginationInterval;
    this.paginatedRows = this.showSearchResults
      ? this.searchResults.slice(0, endingIndex)
      : this.rows.slice(0, endingIndex);
    this.moreToLoad = this.showSearchResults
      ? this.paginatedRows < this.searchResults
      : this.paginatedRows < this.rows;
  }

  @action deleteEditLocationFavorite(id) {
    this.checkedRows.push(id.toString());
    console.log('this.checkedRows', this.checkedRows);
    this.deleteFavorites();
    history.replace('/manage-favorites');
  }

  @action deleteFavorites() {
    const success = (res) => {
      console.log('delete success!!', res);
      _.remove(this.rows, (row) => {
        const idToFind = row.locationFavoriteId.toString();
        return this.checkedRows.indexOf(idToFind) > -1;
      })
      if (this.showSearchResults) {
        _.remove(this.searchResults, (row) => {
          const idToFind = row.locationFavoriteId.toString();
          return this.checkedRows.indexOf(idToFind) > -1;
        })
      }
      this.showSuccess = true;
      this.successText = this.checkedRows.length > 1
        ? `${this.checkedRows.length} favorites have been deleted.`
        : `"${this.findRowData(this.checkedRows[0]).favoriteName}" has been deleted.`
      this.showDeleteModal = false;
      this.clearAllCheckboxes();
      this.handlePagination();
      console.log('rows after delete', this.rows);
    }
    const fail = (res) => {
      console.log('delete fail!', res);
      this.showDeleteModal = false;
    }

    return apiService.deleteLocationFavorites(this.checkedRows.peek()).then(success, fail);
  }

  @action searchLocations() {
    console.log('DING DONG YOU SEARCHED', this.searchQuery);
    this.searchResults = [];

    const success = (res) => {
      console.log('success search!', res.userlocationfavorite);
      this.searchResults = res.userlocationfavorite;
      this.showSearchResults = true;
      this.resetPagination();
      this.advancePagination();
    }

    const fail = (err) => {
      console.warn('Search failed!', err);
      this.showSearchResults = false;
    }

    return apiService.searchLocationFavorites(this.searchQuery).then(success, fail);
  }

  @action findRowData(targetId) {
    return this.sortedRows.find((row) => {
      return row.locationFavoriteId == targetId;
    });
  }

	@action handleCheckboxChange(rowId) {
    this.checkedRows.indexOf(rowId) > -1
      ? this.checkedRows.remove(rowId)
      : this.checkedRows.push(rowId);
	}

  @action resetPage() {
    this.resetPagination();
    this.clearSearchQuery();
    this.clearSuccess();
    this.rows = [];
    this.searchResults = [];
    this.checkedRows = [];
  }

  @action selectAllCheckboxes() {
    this.paginatedRows.forEach(row => {
      const id = row.locationFavoriteId.toString();
      if (this.checkedRows.indexOf(id) < 0) {
        this.checkedRows.push(id);
      }
    });
  }

  @action resetPagination() {
    this.paginationCount = 0;
  }

  @action clearAllCheckboxes() {
    this.checkedRows = [];
  }

  @action clearSearchQuery(){
    this.searchQuery = '';
  }

  @action clearSuccess() {
    this.showSuccess = false;
    this.successText = '';
  }

  @action resetSearch() {
    this.clearSearchQuery();
    this.showSearchResults = false;
    this.resetPagination();
    this.advancePagination();
  }

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

  @computed get formIsDirty() {
    let formHasChanged = false;
    Object.keys(this.sortDirections).forEach(key => {
      if(this.sortDirections[key] !== this.sortDirectionsDefaults[key]) {
        formHasChanged = true;
      }
    });
    return formHasChanged;
  }

  @observable rows = [];

  @observable searchQuery = '';
  @observable searchResults = [];
  @observable showSearchResults = false;

  @observable isLoading = false;
  @observable showSuccess = false;
  @observable successText = '';

  @observable paginatedRows = [];
  @observable paginationCount = 0;
  @observable paginationInterval = 5;
  @observable moreToLoad = false;

  @observable checkedRows = [];

  @observable activeColumn = 'locationFavoriteId';
  //to keep the order toggling simple, true is ascending and false is descending;
  @observable sortDirections = {
    'favoriteName': false,
    'locationFavoriteAddress': false,
    'locationFavoriteId': false
  };

  @observable sortDirectionsDefaults = {
    'favoriteName': false,
    'locationFavoriteAddress': false,
    'locationFavoriteId': false
  }
}

export const manageLocationsStore = new ManageLocationsStore();
