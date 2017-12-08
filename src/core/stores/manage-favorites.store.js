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
    this.sortDirections[key] = !this.sortDirections[key];
	}

  sortAndReturnRows(rowsToSort) {
    const coordRegex = /^([-+])?([1-8]?\d(\W\d+)?|90(\W0+)?)\s*(\W?)\s*((N|S|E|W)?)\s*(,?)\s*([-+])?(180(\W0+)?|((1[0-7]\d)|([1-9]?\d))(\W\d+)?)\s*(\W?)\s*((N|S|E|W)?)$/ig;
    const sortOrder = this.sortDirections[this.activeColumn];

    // //find rows that resemble coordinates with a regex;
    // const coordRows = rowsToSort.filter(row => {
    //   return row[this.activeColumn].match(coordRegex)
    // });

    //determine whether row should be sorted by numbers or not on the basis of the first character of the first element.
    const notNumberRows = rowsToSort.filter(row => {
      if (!row[this.activeColumn].match(coordRegex)) {
        const firstElement = row[this.activeColumn].split(' ')[0];
        const firstChar = firstElement.charAt(0);
        //to allow coordinates beginning with + or - to sort as numbers, check for them and skip to second character if found
        // if (/([+,-]+)/.test(firstChar)) {
        //   console.log('DING', row);
        //   const secondChar = firstElement.charAt(1);
        //   return isNaN(parseInt(secondChar)) === true;
        // } else {
        //   return isNaN(parseInt(firstChar)) === true;
        // }
        return isNaN(parseInt(firstChar)) === true;

      }
    });
    const numberRows = rowsToSort.filter(row => {
      if (!row[this.activeColumn].match(coordRegex)) {
        const firstElement = row[this.activeColumn].split(' ')[0];
        const firstChar = firstElement.charAt(0);
        //to allow coordinates beginning with + or - to sort as numbers, check for them and skip to second character if found
        // if (/([+,-]+)/.test(firstChar)) {
        //   const secondChar = firstElement.charAt(1);
        //   return isNaN(parseInt(secondChar)) === false;
        // } else {
        //   return isNaN(parseInt(firstChar)) === false;
        // }
        return isNaN(parseInt(firstChar)) === false;

      }
    });

    //sort number rows on the basis of their first element, stripped of anything but digits and parsed into an integer;
    //this ensures that absolute size of the number is taken into account.
    const sortedNumberRows = this.numberSort(numberRows, sortOrder, this.activeColumn);

    //sort the rest normally, as if a string.
    // const sortedCoordRows = this.regularSort(coordRows, sortOrder, this.activeColumn);
    const sortedNotNumberRows = this.regularSort(notNumberRows, sortOrder, this.activeColumn);

    return sortOrder
      ? [...sortedNotNumberRows, ...sortedNumberRows]
      : [...sortedNumberRows, ...sortedNotNumberRows]
  }

  numberSort = (rowsToSort, sortOrder, activeColumn) => {
    return rowsToSort.sort((x, y) => {
      const rowX = parseInt(x[activeColumn].split(' ')[0].replace(/\D+/g, ''));
      const rowY = parseInt(y[activeColumn].split(' ')[0].replace(/\D+/g, ''));
      if (rowX > rowY) {
        return sortOrder ? -1 : 1;
      }
      if (rowX < rowY) {
        return sortOrder ? 1 : -1;
      }
      return 0;
    });
  }

  regularSort = (rowsToSort, sortOrder, activeColumn) => {
    return rowsToSort.sort((x, y) => {
      const rowX = x[activeColumn].toLowerCase().split(' ').filter(Boolean);
      const rowY = y[activeColumn].toLowerCase().split(' ').filter(Boolean);
      if (rowX > rowY) {
        return sortOrder ? -1 : 1;
      }
      if (rowX < rowY) {
        return sortOrder ? 1 : -1;
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
  @observable sortDirectionsDefaults = {
    'favoriteName': false,
    'locationFavoriteAddress': false,
    'locationFavoriteId': false
  }
  @observable sortDirections = Object.assign({}, this.sortDirectionsDefaults);
}

export const manageFavoritesStore = new ManageFavoritesStore();
