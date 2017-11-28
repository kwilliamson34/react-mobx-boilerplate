import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';
import _ from 'lodash';

class ManageFavoritesStore {

  @action fetchRows() {
    const success = (res) => {
      //rows will initially order by locationName.
      this.rows = this.sortAndReturnRows(res.data.userlocationfavorite);
      this.isLoading = false;
      this.advancePagination();
    }

    const fail = (err) => {
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
    this.deleteRows();
    history.replace('/manage-favorites');
  }

  @action deleteRows() {
    const success = () => {
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
      const text = this.checkedRows.length > 1
        ? `${this.checkedRows.length} favorites have been deleted.`
        : `"${this.findRowData(this.checkedRows[0]).favoriteName}" has been deleted.`;
      this.updateSuccess(text);
      this.clearAllCheckboxes();
      this.handlePagination();
    }

    const fail = (err) => {
      utilsService.handleError(err);
    }

    return apiService.deleteLocationFavorites(this.checkedRows.peek()).then(success, fail);
  }

  @action searchLocations() {
    this.searchResults = [];

    const success = (res) => {
      this.searchResults = res.data.userlocationfavorite;
      this.showSearchResults = true;
      this.clearAllCheckboxes();
      this.resetPagination();
      this.advancePagination();
    }

    const fail = () => {
      this.showSearchResults = false;
    }

    return apiService.searchLocationFavorites(this.searchQuery).then(success, fail);
  }

  @action pageIsLoading() {
    this.isLoading = true;
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

  @action selectAllCheckboxes() {
    this.paginatedRows.forEach(row => {
      const id = row.locationFavoriteId.toString();
      if (this.checkedRows.indexOf(id) < 0) {
        this.checkedRows.push(id);
      }
    });
  }

  @action setTableRef(refList) {
    this.tableRef = refList;
  }

  @action resetPage() {
    this.resetPagination();
    this.clearSearchQuery();
    this.updateAlert('');
    this.updateSuccess('');
    this.activeColumn = 'favoriteName';
    this.rows = [];
    this.searchResults = [];
    this.checkedRows = [];
    this.showSearchResults = false;
    this.tableRef = [];
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

  @action updateAlert(alertText) {
    this.alertToDisplay = alertText;
  }

  @action updateSuccess(successText) {
    this.successToDisplay = successText;
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
	}

  sortAndReturnRows(rowsToSort) {
    const sortOrder = this.sortDirections[this.activeColumn];
    let numberRows = rowsToSort.filter(row => parseInt(row.split(' ')[0]) !== NaN);
    let notNumberRows = rowsToSort.filter(row => parseInt(row.split(' ')[0]) === NaN);
    console.log('sortedRows', numberRows, notNumberRows);

    return rowsToSort.sort((x, y) => {
      const rowX = x[this.activeColumn].toLowerCase().split(' ').filter(Boolean);
      const rowY = y[this.activeColumn].toLowerCase().split(' ').filter(Boolean);
      // console.log('rows', rowX, rowY);
      // console.log('parseInt', parseInt(rowX[0]), parseInt(rowY[0]))
      // if (rowX < rowY) {
      //   return sortOrder ? -1 : 1;
      // }
      // if (rowX > rowY) {
      //   return sortOrder ? 1 : -1;
      // }
      // return 0;
    });
  }

  @computed get sortedRows() {
    return this.sortAndReturnRows(this.paginatedRows);
  }

  @computed get disableDeleteButton() {
    return this.checkedRows.length === 0;
  }

  @computed get rowIsChecked() {
    return this.checkedRows.indexOf(this.activeRow) > -1;
  }

  @computed get shouldRenderRows() {
    return !this.isLoading && this.sortedRows.length > 0;
  }

  @computed get checkSelectAllCheckbox() {
    return !this.isLoading && this.checkedRows.length > 0 && this.checkedRows.length === this.sortedRows.length && !(this.showSearchResults && this.sortedRows.length === 0);
  }

  @computed get showLoadMoreButton() {
    return this.showSearchResults
      ? this.searchResults.length > this.sortedRows.length
      : this.rows.length > this.sortedRows.length;
  }

  @computed get selectAllCheckboxSrOnlyLabel() {
    return this.isLoading
      ? 'Select all checkbox selected'
      : `You are currently on a table. There are ${this.tableRef.relevantColumnsCount} columns and ${this.sortedRows.length} rows. Select all checkbox selected`;
  }

  @observable tableRef = [];

  @observable rows = [];
  @observable checkedRows = [];

  @observable searchQuery = '';
  @observable searchResults = [];
  @observable showSearchResults = false;

  @observable isLoading = false;
  @observable alertToDisplay = '';
  @observable successToDisplay = '';

  @observable paginatedRows = [];
  @observable paginationCount = 0;
  @observable paginationInterval = 50;
  @observable moreToLoad = false;

  @observable activeColumn = 'locationFavoriteAddress';

  //to keep the order toggling simple, true is ascending and false is descending;
  @observable sortDirectionsDefaults = {
    'favoriteName': false,
    'locationFavoriteAddress': false,
    'locationFavoriteId': false
  }
  @observable sortDirections = Object.assign({}, this.sortDirectionsDefaults);
}

export const manageFavoritesStore = new ManageFavoritesStore();
