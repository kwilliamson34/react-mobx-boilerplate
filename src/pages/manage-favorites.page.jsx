import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import TextInput from '../components/forms/text-input';
import {SortableTable} from '../components/sortable-table/sortable-table';

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
    this.manageFavoritesStore.isLoading = true;
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
    this.geolinkStore.clearAlerts();
    this.geolinkStore.successText = '';
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

  handleMapItButton = (e) => {
    const targetId = $(e.target).parent().parent()[0].dataset.id;
    let rowData = this.manageFavoritesStore.findRowData(targetId);
    this.geolinkStore.performExternalSearch(rowData.locationFavoriteAddress);
  }

  handleEditButton = (e) => {
    const targetId = $(e.target).parent().parent()[0].dataset.id;
    let rowData = this.manageFavoritesStore.findRowData(targetId);
    this.geolinkStore.performEditLocationRequest(rowData);
  }

  handleDeleteAction = (e) => {
    e.preventDefault();
    this.showDeleteModal();
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
    return (
      <div id="delete-modal" role="dialog" tabIndex="-1" className="modal fade" aria-labelledby="modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.hideDeleteModal}>
                <i aria-hidden="true" className="icon-close"></i>
                <span className="sr-only">Close window</span>
              </button>
              <div className="row no-gutters" id="fmodal-title">
                <div className="col-xs-12">
                  <h1 className="as-h2">{`Delete these ${this.manageFavoritesStore.checkedRows.length} favorites?`}</h1>
                  <p>This cannot be undone. New favorites can be added at any time.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className="fn-primary" onClick={this.keepFavorites}>Keep Favorites</button>
                  <button className="fn-secondary" onClick={this.deleteFavorites}>Delete Favorites</button>
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

  renderSuccessBar = () => {
    return (
      <div className="alert alert-success col-xs-12">
        <button type="button" className="close_btn icon-close" onClick={this.clearSuccess}>
          <span className="sr-only">Close alert</span>
        </button>
        <p role="alert" aria-live="assertive">
          <strong>Success!&nbsp;</strong>{this.manageFavoritesStore.successText || this.geolinkStore.successText}
        </p>
      </div>
    )
  }

  renderIsLoading = () => {
    return (
      <div className="loading-block">
        <p className="as-h2" aria-live="polite">
          <i className="as-h2 icon-reload" aria-hidden="true"></i>
          Loading favorites&hellip;
        </p>
      </div>
    )
  }

  renderNoResults = () => {
    return (
      <div className="no-results-wrapper">
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
        <div className="as-h3">No favorite locations have been added yet. Add some!</div>
        <button className="fn-primary">
          <Link to={'/network-status'}>Add From Map</Link>
        </button>
      </div>
    )
  }

  renderNoSearchResults = () => {
    return (
      <div className="no-search-results">
        <div className="as-h2">No Results</div>
        <div className="as-h3">There are no results to display. Please retry your search.</div>
        <button className="fn-primary" onClick={this.resetSearch}>
          Load All Favorites
        </button>
      </div>
    )
  }

  renderTopAndBottomFeatures = () => {
    return (
      <div className="pagination-count-delete-wrapper">
        {
          this.manageFavoritesStore.showSearchResults
            ? this.renderSearchCounts()
            : this.renderStatCounts()
        }
        {this.renderDeleteButton()}
      </div>
    )
  }

  renderSearchCounts = () => {
    let length = this.manageFavoritesStore.sortedRows.length;
    return (
      <div className="search-count">
        {`${length} Result${length !== 1 ? 's' : ''}`}
      </div>
    )
  }

  renderStatCounts = () => {
    return (
      <div className="counts-wrapper">
        <div className="pagination-count">
          {`Showing 1-${this.manageFavoritesStore.sortedRows.length} of ${this.manageFavoritesStore.rows.length}`}
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
    const disableButton = this.manageFavoritesStore.checkedRows.length === 0;
    const oneItemSelected = this.manageFavoritesStore.checkedRows.length === 1;
    return (
      <div className="manage-favorites-delete-button">
        <button className={`as-link ${disableButton ? 'disabled' : ''}`} onClick={this.handleDeleteAction}>
          <i className="icon-trash" aria-hidden="true" />
          {(disableButton || oneItemSelected) && 'Delete Favorite'}
          {(!disableButton && !oneItemSelected) && `Delete ${this.manageFavoritesStore.checkedRows.length} Favorites`}
        </button>
      </div>
    )
  }

  renderEditButton = () => {
    return (
      <button className="as-link edit-location-button" onClick={this.handleEditButton} tabIndex="-1">
        <i className="icon-pencil" aria-hidden="true" />
        <span>Edit</span>
      </button>
    )
  }

  renderMapItButton = () => {
    return (
      <button className="as-link map-it-button" onClick={this.handleMapItButton} tabIndex="-1">
        <i className="icon-map-marker" aria-hidden="true" />
        <span>Map It</span>
      </button>
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

    const tableColumns = [
      {
        name: 'Name',
        key: 'favoriteName',
        inlineButtonJsx: this.renderEditButton(),
        className: 'favorite-name-column col40'
      }, {
        name: 'Location/Address',
        key: 'locationFavoriteAddress',
        inlineButtonJsx: this.renderMapItButton(),
        className: 'location-address-column col40'
      }
    ];

    return (
      <article id="manage-location-favorites-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Manage Favorites</h1>
              <div className="favorites-search">
                {this.renderSearchBar()}
              </div>
            </div>
            <div className="alert-bars">
              {(this.manageFavoritesStore.showSuccess || this.geolinkStore.showSuccess) && this.renderSuccessBar()}
            </div>
            <div className="col-xs-12">
              {(this.manageFavoritesStore.shouldRenderRows || this.manageFavoritesStore.showSearchResults) && this.renderTopAndBottomFeatures()}
              <SortableTable
                store={this.manageFavoritesStore}
                tableId="manage-locations-table"
                idKey="locationFavoriteId"
                columns={tableColumns}
                rows={this.manageFavoritesStore.sortedRows}
                shouldRenderRows={this.manageFavoritesStore.shouldRenderRows}
                activeColumn={this.manageFavoritesStore.activeColumn}
                sortDirections={this.manageFavoritesStore.sortDirections}
                hasCheckboxRow={true}/>
              {this.manageFavoritesStore.isLoading && this.renderIsLoading()}
              {!this.manageFavoritesStore.shouldRenderRows && this.renderNoResults()}
              {this.manageFavoritesStore.shouldRenderRows && this.renderTopAndBottomFeatures()}
              {this.manageFavoritesStore.showLoadMoreButton && this.manageFavoritesStore.shouldRenderRows && this.renderLoadMoreButton()}
            </div>
          </div>
        </div>
        {this.renderDeleteModal()}
      </article>
    )
  }
}
