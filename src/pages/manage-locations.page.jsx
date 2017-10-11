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
    this.manageLocationsStore = this.props.store.manageLocationsStore;
    this.geolinkStore = this.props.store.geolinkStore;
  }

  componentWillMount() {
    this.manageLocationsStore.isLoading = true;
    this.manageLocationsStore.fetchRows();
  }

  componentWillUnmount() {
    this.manageLocationsStore.resetPage();
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
        submitIcon="icon-search" />
    )
  }

  renderEditButton = () => {
    return (
      <button className="as-link edit-location-button">
        <i className="icon-pencil" aria-hidden="true" />
        Edit
      </button>
    )
  }

  handleEditButton = () => {
    console.log('PUT SOME EDIT FUNCTION HERE');
  }

  renderMapItButton = () => {
    return (
      <button className="as-link map-it-button" onClick={this.handleMapItButton}>
        <i className="icon-map-marker" aria-hidden="true" />
        Map It
      </button>
    )
  }

  handleMapItButton = (e) => {
    e.preventDefault();
    let location = $(e.target).prev().text();
    this.geolinkStore.performExternalSearch(location);
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
        className: 'col-xs-5'
      },
      {
        name: 'Location/Address',
        key: 'locationFavoriteAddress',
        inlineButtonJsx: this.renderMapItButton(),
        className: 'col-xs-5'
      }
    ];

    return (
      <article id="manage-location-favorites-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Manage Favorites</h1>
            </div>
            {this.renderSearchBar()}
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
