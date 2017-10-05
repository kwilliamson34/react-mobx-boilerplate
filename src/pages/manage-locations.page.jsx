import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import SortableTable from '../components/sortable-table/sortable-table';

@inject('store')
@observer
export default class ManageLocations extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.manageLocationsStore = this.props.store.manageLocationsStore;
  }

  render() {

    const crumbs = [
      {
        pageHref: '/network-status',
        pageTitle: 'Network Status'
      }, {
        pageHref: '/network-status/manage-favorites',
        pageTitle: 'Manage Favorites'
      }
    ];

    const tableColumns = [
      {
        name: 'Name',
        key: 'favoriteName',
        columnWidth: 'col-xs-5'
      },
      {
        name: 'Location/Address',
        key: 'locationFavoriteAddress',
        columnWidth: 'col-xs-5'
      }
    ];

    return (
      <article id="manage-location-favorites-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-offset-1 col-lg-10">
              <h1>Manage Location Favorites</h1>
            </div>
            <div className="col-xs-12 col-lg-offset-1 col-lg-10">
              <SortableTable columns={tableColumns} rows={this.manageLocationsStore.sortedRows} store={this.manageLocationsStore} />
            </div>
          </div>
        </div>
      </article>
    )
  }
}
