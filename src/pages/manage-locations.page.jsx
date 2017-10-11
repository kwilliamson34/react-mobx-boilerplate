import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

import {history} from '../core/services/history.service';
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
    this.manageLocationsStore = this.props.store.manageLocationsStore;
    this.geolinkStore = this.props.store.geolinkStore;
  }

  componentWillMount() {
    this.manageLocationsStore.isLoading = true;
    this.manageLocationsStore.fetchRows();
  }

  componentWillUnmount() {
    this.manageLocationsStore.resetPage();
    this.clearSuccess();
  }

  noResultsJsx = () => {
    return (
      <div className="no-results-block">
        <div className="as-h2">No Favorites</div>
        <div className="as-h3">No favorite locations have been added yet. Add some!</div>
        <button className="fn-primary">
          <Link to={'/network-status'}>Add From Map</Link>
        </button>
      </div>
    )
  }

  renderSearchBar = () => {
    return (
      <TextInput
        dataObject={this.manageLocationsStore}
        id="searchQuery"
        type="search"
        labelText="Search"
        className="col-xs-12 search-form"
        showClearButton={true}
        handleSubmit={this.manageLocationsStore.searchLocations.bind(this.manageLocationsStore)}
        handleClearClick={this.manageLocationsStore.resetSearch.bind(this.manageLocationsStore)}
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
          <strong>Success!&nbsp;</strong>{this.manageLocationsStore.successText || this.geolinkStore.successText}
        </p>
      </div>
    )
  }

  clearSuccess = () => {
    this.manageLocationsStore.clearSuccess();
    this.geolinkStore.showSuccess = false;
    this.geolinkStore.successText = false;
  }

  renderEditButton = () => {
    return (
      <button className="as-link edit-location-button" onClick={this.handleEditButton}>
        <Link to={'/network-status'}>
          <i className="icon-pencil" aria-hidden="true" />
          Edit
        </Link>
      </button>
    )
  }

  renderMapItButton = () => {
    return (
      <button className="as-link map-it-button" onClick={this.handleMapItButton}>
        <Link to={'/network-status'}>
          <i className="icon-map-marker" aria-hidden="true" />
          Map It
        </Link>
      </button>
    )
  }

  handleMapItButton = (e) => {
    const targetId = $(e.target).parent().parent()[0].dataset.id;
    let rowData = this.manageLocationsStore.findRowData(targetId);
    this.geolinkStore.performExternalSearch(rowData.locationFavoriteAddress);
  }

  handleEditButton = (e) => {
    const targetId = $(e.target).parent().parent()[0].dataset.id;
    let rowData = this.manageLocationsStore.findRowData(targetId);
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
        className: 'favorite-name-column'
      },
      {
        name: 'Location/Address',
        key: 'locationFavoriteAddress',
        inlineButtonJsx: this.renderMapItButton(),
        className: 'location-address-column'
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
              {(this.manageLocationsStore.showSuccess || this.geolinkStore.showSuccess) && this.renderSuccessBar()}
            </div>
            <div className="col-xs-12">
              <SortableTable
                store={this.manageLocationsStore}
                tableId="manage-locations-table"
                idKey="locationFavoriteId"
                columns={tableColumns}
                rows={this.manageLocationsStore.sortedRows}
                allRowsCount={this.manageLocationsStore.rows.length}
                noResultsJsx={this.noResultsJsx()}
                hasCheckboxRow={true}
                pagination={true}
                />
            </div>
          </div>
        </div>
      </article>
    )
  }
}
