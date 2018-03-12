import {action, observable, computed} from 'mobx';
import {apiService} from '../services/api.service';
import {utilsService} from '../services/utils.service';
import {history} from '../services/history.service';
import _ from 'lodash';

class ManageFavoritesStore {

  @action fetchRows() {
    const success = (res) => {
      //rows will initially order by locationName in descending order;
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
    this.sortByAscending[key] = !this.sortByAscending[key];
	}

  sortAndReturnRows(rowsToSort) {
    const isAscendingOrder = this.sortByAscending[this.activeColumn];
    /*
    partition sorts rowsToSort into an array containing two arrays. The first array matches the conditions, the second does not;
    sortedRows[0] will be string rows, sortedRows[1] will be number rows.
    */
    let sortedRows = _.partition(rowsToSort, (row) => {
      /*
      partition is decided by the first character (or second character, see below) of the string being sorted.
      If it's a number, we'll sort it as a proper integer, and otherwise as a string.
      */
      const firstElement = row[this.activeColumn].split(' ')[0];
      //if the first character of firstElement is a + or - symbol, ignore it and check the second character;
      const testCharacter = /([+,-]+)/.test(firstElement.charAt(0))
        ? firstElement.charAt(1)
        : firstElement.charAt(0);

      return isNaN(parseInt(testCharacter)) === true;
    });

    const sortedStringRows = this.stringSort(sortedRows[0], isAscendingOrder, this.activeColumn);
    const sortedNumberRows = this.numberSort(sortedRows[1], isAscendingOrder, this.activeColumn);

    return isAscendingOrder
      ? [...sortedStringRows, ...sortedNumberRows]
      : [...sortedNumberRows, ...sortedStringRows]
  }

  numberSort = (rowsToSort, isAscendingOrder, activeColumn) => {
    /*
    numberSort transforms strings into readable integers, in order to sort by absolute size;
    Step 1. split the string at spaces and finds first element;
    Step 2. split the first element at periods and degree symbols, in order to handle coordinates.
    Step 3. remove any characters that are not a number or a + or - symbol;
    Step 4. parseInt the result into an integer.
    */
    return rowsToSort.sort((x, y) => {
      const rowX = parseInt(x[activeColumn].split(' ')[0].split('.')[0].split('°')[0].replace(/[^[+,\-,0-9]+/g, ''));
      const rowY = parseInt(y[activeColumn].split(' ')[0].split('.')[0].split('°')[0].replace(/[^[+,\-,0-9]+/g, ''));

      /*
      This sort order assumes that A -> Z and 0 -> 9 is ascending order, and Z -> A and 9 -> 0 is descending.
      stringSort uses the same order.
      */
      if (rowX < rowY) {
        return isAscendingOrder ? -1 : 1;
      }
      if (rowX > rowY) {
        return isAscendingOrder ? 1 : -1;
      }
      return 0;
    });
  }

  stringSort = (rowsToSort, isAscendingOrder, activeColumn) => {
    /*
    sorts as if a string, serially from position 0;
    .filter removes empty strings.
    */
    return rowsToSort.sort((x, y) => {
      const rowX = x[activeColumn].toLowerCase().split(' ').filter(Boolean);
      const rowY = y[activeColumn].toLowerCase().split(' ').filter(Boolean);
      if (rowX < rowY) {
        return isAscendingOrder ? -1 : 1;
      }
      if (rowX > rowY) {
        return isAscendingOrder ? 1 : -1;
      }
      return 0;
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

  @observable activeColumn = 'favoriteName';

  //to keep the order toggling simple, true is ascending and false is descending;
  @observable sortByAscendingDefaults = {
    'favoriteName': false,
    'locationFavoriteAddress': false,
    'locationFavoriteId': false
  }
  @observable sortByAscending = Object.assign({}, this.sortByAscendingDefaults);
}

export const manageFavoritesStore = new ManageFavoritesStore();
