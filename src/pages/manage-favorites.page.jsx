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
export default class ManageLocationsPage extends React.Component {

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

  keepFavorites = (e) => {
    e.preventDefault();
    this.manageFavoritesStore.hideDeleteModal();
  }

  deleteFavorites = (e) => {
    e.preventDefault();
    this.manageFavoritesStore.deleteRows();
    this.manageFavoritesStore.hideDeleteModal();
  }

  renderDeleteModal = () => {
    return (
      <div id="delete-modal" role="dialog" tabIndex="-1" className="modal fade" aria-labelledby="modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.manageFavoritesStore.hideDeleteModal}>
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

  noFetchResultsJsx = () => {
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

  noSearchResultsJsx = () => {
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
        submitIcon="icon-search"
        />
    )
  }

  renderSuccessBar = () => {
    return (
      <div className="alert alert-success">
        <button type="button" className="close_btn icon-close" onClick={this.clearSuccess}>
          <span className="sr-only">Close alert</span>
        </button>
        <p role="alert" aria-live="assertive">
          <strong>Success!&nbsp;</strong>{this.manageFavoritesStore.successText || this.geolinkStore.successText}
        </p>
      </div>
    )
  }

  resetSearch = () => {
    this.manageFavoritesStore.resetSearch();
  }

  clearSuccess = () => {
    this.manageFavoritesStore.clearSuccess();
    this.geolinkStore.clearAlerts();
    this.geolinkStore.successText = '';
  }

  renderEditButton = () => {
    return (
      <button className="as-link edit-location-button" onClick={this.handleEditButton}>
        <Link to={'/network-status'}>
          <i className="icon-pencil" aria-hidden="true" />
          <span>Edit</span>
        </Link>
      </button>
    )
  }

  renderMapItButton = () => {
    return (
      <button className="as-link map-it-button" onClick={this.handleMapItButton}>
        <Link to={'/network-status'}>
          <i className="icon-map-marker" aria-hidden="true" />
          <span>Map It</span>
        </Link>
      </button>
    )
  }

  handleMapItButton = (e) => {
    const targetId = $(e.target).parent().parent().parent()[0].dataset.id;
    let rowData = this.manageFavoritesStore.findRowData(targetId);
    this.geolinkStore.performExternalSearch(rowData.locationFavoriteAddress);
  }

  handleEditButton = (e) => {
    const targetId = $(e.target).parent().parent().parent()[0].dataset.id;
    let rowData = this.manageFavoritesStore.findRowData(targetId);
    this.geolinkStore.performEditLocationRequest(rowData);
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
      },
      {
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
            <div className="alert-bars col-xs-12">
              {(this.manageFavoritesStore.showSuccess || this.geolinkStore.showSuccess) && this.renderSuccessBar()}
            </div>
            <div className="col-xs-12">
              <SortableTable
                store={this.manageFavoritesStore}
                tableId="manage-locations-table"
                idKey="locationFavoriteId"
                columns={tableColumns}
                rows={this.manageFavoritesStore.sortedRows}
                activeColumn={this.manageFavoritesStore.activeColumn}
                sortDirections={this.manageFavoritesStore.sortDirections}
                allRowsCount={this.manageFavoritesStore.rows.length}
                noFetchResultsJsx={this.noFetchResultsJsx()}
                noSearchResultsJsx={this.noSearchResultsJsx()}
                hasCheckboxRow={true}
                pagination={true}
                />
            </div>
          </div>
        </div>
        {this.renderDeleteModal()}
      </article>
    )
  }
}
