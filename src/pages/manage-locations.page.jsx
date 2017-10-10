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

  renderEditButton = () => {
    return (
      <div className="edit-location-button">
        <button>
          Edit
        </button>
      </div>
    )
  }

  renderMapItButton = () => {
    return (
      <div className="map-it-button">
        <button>
          Map It
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
        pageTitle: 'Manage Locations'
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
            <div className="col-xs-12 col-lg-offset-1 col-lg-10">
              <h1>Manage Location Favorites</h1>
            </div>
            <div className="col-xs-12 col-lg-offset-1 col-lg-10">
              <SortableTable
                store={this.manageLocationsStore}
                idKey={'locationFavoriteId'}
                columns={tableColumns}
                sortedRows={this.manageLocationsStore.sortedRows}
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
