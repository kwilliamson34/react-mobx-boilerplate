import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import $ from 'jquery';

import {history} from '../core/services/history.service';
import PageTitle from '../components/page-title/page-title';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import TextInput from '../components/forms/text-input';
import Checkbox from '../components/forms/checkbox';
import {SortableTable} from '../components/sortable-table/sortable-table';
import {SortableColumn} from '../components/sortable-table/sortable-column';
import {RepeatingColumn} from '../components/sortable-table/repeating-column';
import Alerts from '../components/alerts/alerts';

@inject('store')
@observer
export default class ManageFavoritesPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.manageFavoritesStore = this.props.store.manageFavoritesStore;
    this.geolinkStore = this.props.store.geolinkStore;
  }

  componentWillMount() {
    this.manageFavoritesStore.pageIsLoading();
    this.manageFavoritesStore.fetchRows();
  }

  componentWillUnmount() {
    this.manageFavoritesStore.resetPage();
    this.clearSuccess();
  }

  resetSearch = () => {
    this.manageFavoritesStore.resetSearch();
  }

  clearSuccess = () => {
    this.manageFavoritesStore.clearSuccess();
    this.geolinkStore.clearAlertBars();
  }

  keepFavorites = (e) => {
    e.preventDefault();
    this.hideDeleteModal();
  }

  deleteFavorites = (e) => {
    e.preventDefault();
    this.manageFavoritesStore.deleteRows();
    this.hideDeleteModal();
  }

  advancePagination = () => {
    this.manageFavoritesStore.advancePagination();
  }

  handleToggleSort = (key) => {
    this.manageFavoritesStore.toggleSort(key);
  }

  handleRowCheckboxOnChange = (e) => {
    if (e.type === 'checkbox') {
      this.manageFavoritesStore.handleCheckboxChange(e.value);
    }
  }

  handleSelectAllCheckbox = () => {
    this.manageFavoritesStore.checkedRows.length === this.manageFavoritesStore.rows.length
      ? this.manageFavoritesStore.clearAllCheckboxes()
      : this.manageFavoritesStore.selectAllCheckboxes();
  }

  handleMapItButton = (targetId) => {
    let rowData = this.manageFavoritesStore.findRowData(targetId.toString());
    this.geolinkStore.performMapFavoriteRequest(rowData);
  }

  handleEditButton = (targetId) => {
    let rowData = this.manageFavoritesStore.findRowData(targetId.toString());
    this.geolinkStore.performEditLocationRequest(rowData);
  }

  handleAddButton = () => {
    history.replace('/network-status');
  }

  handleDeleteAction = (e) => {
    e.preventDefault();
    if (!this.manageFavoritesStore.disableDeleteButton) {
      this.showDeleteModal();
    }
  }

  showDeleteModal = () => {
    $('#delete-modal').modal({backdrop: 'static'});
    $('#delete-modal').modal('show');
  }

  hideDeleteModal = () => {
    $('#delete-modal').modal('hide');
    $('#delete-modal').data('bs.modal', null);
  }

  renderDeleteModal = () => {
    let deleteQuestion = '';
    let favoriteString = ''
    if (this.manageFavoritesStore.checkedRows.length === 1) {
      const targetId = this.manageFavoritesStore.checkedRows[0];
      const targetName = this.manageFavoritesStore.findRowData(targetId).favoriteName;
      deleteQuestion = `Delete "${targetName}"?`;
      favoriteString = 'Favorite';
    } else {
      deleteQuestion = `Delete these ${this.manageFavoritesStore.checkedRows.length} favorites?`;
      favoriteString = 'Favorites';
    }

    return (
      <div id="delete-modal" role="dialog" tabIndex="-1" className="modal fade" aria-labelledby="modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.hideDeleteModal}>
                <i aria-hidden="true" className="icon-close"></i>
                <span className="sr-only">Close window</span>
              </button>
              <div className="row no-gutters" id="modal-title">
                <div className="col-xs-12">
                  <h1 className="as-h2">
                    {deleteQuestion}
                  </h1>
                  <p>This cannot be undone. New favorites can be added at any time.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className="fn-primary" onClick={this.keepFavorites}>Keep {favoriteString}</button>
                  <button className="fn-secondary" onClick={this.deleteFavorites}>Delete {favoriteString}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSearchBar = () => {
    return (
      <TextInput
        dataObject={this.manageFavoritesStore}
        id="searchQuery"
        type="search"
        labelText="Search"
        className="col-xs-12 search-form"
        showClearButton={true}
        handleSubmit={this.manageFavoritesStore.searchLocations.bind(this.manageFavoritesStore)}
        handleClearClick={this.resetSearch}
        submitIcon="icon-search"/>
    )
  }

  renderIsLoading = () => {
    return (
      <div className="loading-container">
        <p className="as-h2" aria-live="polite">
          <i className="as-h2 icon-reload" aria-hidden="true"></i>
          Loading favorites&hellip;
        </p>
      </div>
    )
  }

  renderNoResults = () => {
    return (
      <div className="no-results-container">
        {
          this.manageFavoritesStore.showSearchResults
            ? this.renderNoSearchResults()
            : this.renderNoFetchResults()
        }
      </div>
    )
  }

  renderNoFetchResults = () => {
    return (
      <div className="no-fetch-results">
        <div className="as-h2">No Favorites</div>
        <p>No favorite locations have been added yet. Add some!</p>
        <button className="fn-primary" onClick={this.handleAddButton}>
          Add From Map
        </button>
      </div>
    )
  }

  renderNoSearchResults = () => {
    return (
      <div className="no-search-results">
        <div className="as-h2">No Results</div>
        <div className="no-search-results-text">There are no results to display. Please retry your search.</div>
        <button className="fn-primary" onClick={this.resetSearch}>
          Load All Favorites
        </button>
      </div>
    )
  }

  renderTopAndBottomFeatures = (position) => {
    return (
      <div className="pagination-count-delete-wrapper">
        {
          this.manageFavoritesStore.showSearchResults && position === 'top'
            ? this.renderSearchCounts()
            : this.renderStatCounts()
        }
        {this.renderDeleteButton()}
      </div>
    )
  }

  renderSearchCounts = () => {
    let length = this.manageFavoritesStore.searchResults.length;
    return (
      <div className="search-count">
        {`${length} Result${length !== 1 ? 's' : ''}`}
      </div>
    )
  }

  renderStatCounts = () => {
    const fullCount = this.manageFavoritesStore.showSearchResults ? this.manageFavoritesStore.searchResults.length : this.manageFavoritesStore.rows.length;
    return (
      <div className="counts-wrapper">
        <div className="pagination-count">
          Showing 1&ndash;{`${this.manageFavoritesStore.sortedRows.length} of ${fullCount}`}
        </div>
        {
          this.manageFavoritesStore.checkedRows.length > 0 &&
          <div className="selection-count">
            {`${this.manageFavoritesStore.checkedRows.length} Selected`}
          </div>
        }
      </div>
    )
  }

  renderDeleteButton = () => {
    const oneItemSelected = this.manageFavoritesStore.checkedRows.length === 1;
    return (
      <div className="manage-favorites-delete-button">
        <button role="button" className={`as-link ${this.manageFavoritesStore.disableDeleteButton ? 'disabled' : ''}`} onClick={this.handleDeleteAction}>
          <i className="icon-trash" aria-hidden="true" />
          <span>
            {
              this.manageFavoritesStore.disableDeleteButton &&
              <span className="sr-only">
                Delete favorites button is inactive. Please select at least one favorite.
              </span>
            }
            <span aria-hidden={this.manageFavoritesStore.disableDeleteButton}>
              {
                this.manageFavoritesStore.disableDeleteButton || oneItemSelected
                ? 'Delete Favorite'
                : `Delete ${this.manageFavoritesStore.checkedRows.length} Favorites`
              }
            </span>
          </span>
        </button>
      </div>
    )
  }

  renderRowButtons = (id) => {
    return (
      <div className="row-buttons">
        <button className="as-link edit-location-button" onClick={() => this.handleEditButton(id)}>
          <i className="icon-pencil" aria-hidden="true" />
          <span>Edit</span>
        </button>
        <button className="as-link map-it-button" onClick={() => this.handleMapItButton(id)}>
          <i className="icon-map-marker" aria-hidden="true" />
          <span>Map It</span>
        </button>
      </div>
    )
  }

  renderEditButton = () => {
    return (
      <button className="as-link edit-location-button">
        <i className="icon-pencil" aria-hidden="true" />
        <span>Edit</span>
      </button>
    )
  }

  renderMapItButton = () => {
    return (
      <button className="as-link map-it-button">
        <i className="icon-map-marker" aria-hidden="true" />
        <span>Map It</span>
      </button>
    )
  }

  renderRowCheckbox = (id) => {
    return (
      <Checkbox
        id={id.toString()}
        value={id.toString()}
        handleOnChange={this.handleRowCheckboxOnChange}
        checked={this.manageFavoritesStore.checkedRows.indexOf(id.toString()) > -1}
        label="Checkbox for row"
        labelIsSrOnly={true}/>
    )
  }

  renderSelectAllCheckbox = () => {
    return (
      <Checkbox
        id="select-all-checkbox"
        label="Select or Deselect All Checkboxes"
        value="Select or Deselect All Checkboxes"
        labelIsSrOnly={true}
        handleOnChange={this.handleSelectAllCheckbox}
        checked={this.manageFavoritesStore.checkSelectAllCheckbox}/>
    )
  }

  renderLoadMoreButton = () => {
    return (
      <div className="load-more-button">
        <button className="fn-secondary" onClick={this.advancePagination}>
          Load More
        </button>
      </div>
    )
  }

  render() {
    const crumbs = [
      {
        pageHref: '/network-status',
        pageTitle: 'Network Status'
      }, {
        pageHref: '/manage-favorites',
        pageTitle: 'Manage Favorites'
      }
    ];

    return (
      <article id="manage-location-favorites-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <PageTitle>Manage Favorites</PageTitle>
            </div>
            <div className="container">
              <div className="row">
                <div className="favorites-search col-xs-12">
                  {this.renderSearchBar()}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <hr/>
                  <Alerts showSuccess={this.manageFavoritesStore.showSuccess || this.geolinkStore.showSuccess} successText={this.manageFavoritesStore.successText || this.geolinkStore.successText} clearSuccess={this.clearSuccess}/>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              {(this.manageFavoritesStore.shouldRenderRows || this.manageFavoritesStore.showSearchResults) && this.renderTopAndBottomFeatures('top')}
              <SortableTable
                rows={this.manageFavoritesStore.sortedRows}
                activeRows={this.manageFavoritesStore.checkedRows}
                tableId="manage-locations-table"
                keyToUseAsId="locationFavoriteId"
                shouldRenderRows={this.manageFavoritesStore.shouldRenderRows} >
                <RepeatingColumn
                  key="checkbox-column"
                  bindDataToEach={'locationFavoriteId'}
                  repeatingJsx={this.renderRowCheckbox}
                  headerContainsJsx={this.renderSelectAllCheckbox()}
                  columnClassName={'checkbox-column col5'} />
                <SortableColumn
                  key="favorite-name-column"
                  toggleSort={this.handleToggleSort}
                  sortByAscending={this.manageFavoritesStore.sortDirections['favoriteName']}
                  isActive={this.manageFavoritesStore.activeColumn === 'favoriteName'}
                  columnName={'Name'}
                  columnDataKey={'favoriteName'}
                  columnClassName={'favorite-name-column center-cells col40'} />
                <SortableColumn
                  key="location-address-column"
                  toggleSort={this.handleToggleSort}
                  sortByAscending={this.manageFavoritesStore.sortDirections['locationFavoriteAddress']}
                  isActive={this.manageFavoritesStore.activeColumn === 'locationFavoriteAddress'}
                  columnName={'Location/Address'}
                  columnDataKey={'locationFavoriteAddress'}
                  columnClassName={'location-address-column center-cells col40'} />
                <RepeatingColumn
                  key="buttons-column"
                  bindDataToEach={'locationFavoriteId'}
                  repeatingJsx={this.renderRowButtons}
                  columnClassName={'buttons-column col15'} />
              </SortableTable>
              {this.manageFavoritesStore.isLoading && this.renderIsLoading()}
              {!this.manageFavoritesStore.isLoading && !this.manageFavoritesStore.shouldRenderRows && this.renderNoResults()}
              {this.manageFavoritesStore.shouldRenderRows && this.renderTopAndBottomFeatures('bottom')}
              {this.manageFavoritesStore.showLoadMoreButton && this.manageFavoritesStore.shouldRenderRows && this.renderLoadMoreButton()}
            </div>
          </div>
        </div>
        {this.renderDeleteModal()}
      </article>
    )
  }
}
