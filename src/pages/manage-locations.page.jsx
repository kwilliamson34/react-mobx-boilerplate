import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
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
  }

  componentWillMount() {
    this.manageLocationsStore.isLoading = true;
    this.manageLocationsStore.fetchRows();
  }

  noResultsJsx = () => {
    return (
      <div>
        <div className="as-h2">No Favorites</div>
        <div className="as-h3">No favorite locations have been added yet. Add some!</div>
        <button className="fn-primary">Add From Map</button>
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
        pageTitle: 'Manage Locations'
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
              <SortableTable
                idKey={'locationFavoriteId'}
                columns={tableColumns}
                rows={this.manageLocationsStore.sortedRows}
                store={this.manageLocationsStore}
                noResultsJsx={this.noResultsJsx()}
                hasCheckboxRow={true}
                />
            </div>
          </div>
        </div>
      </article>
    )
  }
}
