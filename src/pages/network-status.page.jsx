import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import config from 'config';
import {utilsService} from '../core/services/utils.service';
import PageTitle from '../components/page-title/page-title';

import GeolinkMap from '../components/geolink-map/geolink-map';
import GeolinkControls from '../components/geolink-map/geolink-controls';
import LocationFavoriteForm from '../components/geolink-map/location-favorite-form';

@inject('store')
@observer
export default class NetworkStatusPage extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.geoStore = this.props.store.geolinkStore;
    this.joyrideStore = this.props.store.joyrideStore;
    this.manageFavoritesStore = this.props.store.manageFavoritesStore;

    if(!this.geoStore.authIsComplete) {
      window.addEventListener('message', (event) => {
        if(event.data === 'geo-ready') {
          console.log('geo-ready message received from iframe');
          this.geoStore.authIsComplete = true;
        }
      }, false);
    }
  }

  componentDidUpdate() {
    this.joyrideStore.updatePlacement();
  }

  renderPlaceholder = () => {
    return (
      <div className="map-placeholder">
        <p className="as-h2" aria-live="polite">
          <i className="as-h2 icon-reload" aria-hidden="true"></i>
          Loading map&hellip;
        </p>
      </div>
    )
  }

  renderEditLocationDeleteButton = () => {
    return (
      <div className="manage-favorites-delete-button">
        <button className="as-link" onClick={this.handleEditLocationDelete}>
          <i className="icon-trash" aria-hidden="true" />
          Delete Favorite
        </button>
      </div>
    )
  }

  handleEditLocationDelete = () => {
    const idToDelete = this.geoStore.values.locationId;
    //reset values so that the unsaved changes modal doesn't show;
    this.geoStore.values = Object.assign({}, this.geoStore.defaultValues);
    this.manageFavoritesStore.deleteEditLocationFavorite(idToDelete);
  }

  render() {
    const showMap = this.geoStore.iframeIsFullyLoaded;
    return (
      <article id="network-page" className={`content-wrapper ${utilsService.getIsInternetExplorer() ? 'isIE' : ''}`}>
        <PageTitle className="sr-only">{this.geoStore.pageTitle}</PageTitle>
        <iframe src={config.geolinkAuthScript} aria-hidden="true" className="hidden-iframe"></iframe>

        <section id="map-section">
          {!showMap && this.renderPlaceholder()}
          <GeolinkMap geolinkStore={this.geoStore} hidden={!showMap} />
        </section>

        <GeolinkControls geolinkStore={this.geoStore} disabled={!showMap}/>

        {(this.geoStore.pageTitle === 'Add New Favorite' || this.geoStore.pageTitle === 'Edit Favorite') &&
          <div className="container location-favorites">
            <div className="row">
              <div className="col-xs-12">
                <h2 className="as-h1">{this.geoStore.pageTitle}</h2>
                {this.geoStore.pageTitle === 'Edit Favorite' && this.renderEditLocationDeleteButton()}
              </div>
              <LocationFavoriteForm store={this.geoStore}/>
            </div>
          </div>}
      </article>
    )
  }
}
