import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

@inject('store')
@observer
export default class ManageLocationFavorites extends React.Component {

  static propTypes = {
    store: PropTypes.object
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

    return (
      <article id="manage-location-favorites-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-offset-1 col-lg-10">
              <h1>Manage Location Favorites</h1>
            </div>
          </div>
        </div>
      </article>
    )
  }
}
