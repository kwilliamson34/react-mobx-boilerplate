import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import config from 'config';
import {utilsService} from '../core/services/utils.service';
import PageTitle from '../components/page-title/page-title';

import GeolinkMap from '../components/geolink-map/geolink-map';
import GeolinkControls from '../components/geolink-map/geolink-controls';
import LocationFavoriteForm from '../components/geolink-map/location-favorite-form';
import Modal from '../components/portals/modal';

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
    this.deleteModal = {};

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

  componentWillUnmount() {
    //restore default defaultValues changed during editLocation request;
    this.geoStore.resetValues();
  }

  renderDeleteModal = () => {
    return <Modal
      id="delete-modal"
      title={`Delete ${this.geoStore.values.locationName}?`}
      ref={i => this.deleteModal = i}
      restoreFocusTo="#delete-modal-launcher"
      primaryAction={this.deleteFavorite}
      primaryButtonLabel="Delete Favorite"
      secondaryAction={this.deleteModal.hideModal}
      secondaryButtonLabel="Keep Favorite">
      <p>This cannot be undone. New favorites can be added at any time.</p>
    </Modal>
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

  handleDeleteClick = () => {
    this.deleteModal.showModal();
  }

  renderEditLocationDeleteButton = () => {
    return (
      <div className="desktop-favorites-delete-button">
        <button id="delete-modal-launcher" className="btn as-link" onClick={this.handleDeleteClick}>
          <i className="icon-trash" aria-hidden="true" />
          Delete Favorite
        </button>
      </div>
    )
  }

  deleteFavorite = (e) => {
    e.preventDefault();
    const idToDelete = this.geoStore.values.locationId;
    this.manageFavoritesStore.deleteEditLocationFavorite(idToDelete);
    this.geoStore.setPageTitle('Network Status');
    this.geoStore.resetValues();
    this.deleteModal.hideModal();
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

        {this.geoStore.pageTitle === 'Network Status' &&
          <GeolinkControls geolinkStore={this.geoStore} disabled={!showMap}/>}

        {(this.geoStore.pageTitle === 'Add New Favorite' || this.geoStore.pageTitle === 'Edit Favorite') &&
          <section>
            <div className="container location-favorites">
              <div className="row">
                <div className="col-xs-12 title-wrapper">
                  <h2 className="as-h1">{this.geoStore.pageTitle}</h2>
                  {this.geoStore.pageTitle === 'Edit Favorite' && this.renderEditLocationDeleteButton()}
                </div>
                <LocationFavoriteForm store={this.geoStore} disabled={!this.geoStore.formIsDirty}/>
              </div>
            </div>
          </section>}

        {this.renderDeleteModal()}
      </article>
    )
  }
}
