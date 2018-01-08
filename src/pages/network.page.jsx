import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import config from 'config';
import PageTitle from '../components/page-title/page-title';

import GeolinkMap from '../components/network/geolink-map';
import GeolinkControls from '../components/network/geolink-controls';
import LocationFavoriteForm from '../components/network/location-favorite-form';
import Modal from '../components/portals/modal';

@inject('store')
@observer
export default class NetworkPage extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.networkStore = this.props.store.networkStore;
    this.joyrideStore = this.props.store.joyrideStore;
    this.manageFavoritesStore = this.props.store.manageFavoritesStore;
    this.deleteModal = {};

    if(!this.networkStore.authIsComplete) {
      window.addEventListener('message', (event) => {
        if(event.data === 'geo-ready') {
          console.log('geo-ready message received from iframe');
          this.networkStore.authIsComplete = true;
        }
      }, false);
    }
  }

  componentDidUpdate() {
    this.joyrideStore.updatePlacement();
  }

  componentWillUnmount() {
    //restore default defaultValues changed during editLocation request;
    this.networkStore.resetValues();
  }

  renderDeleteModal = () => {
    return <Modal
      id="delete-modal"
      title={`Delete "${this.networkStore.values.locationName}"?`}
      ref={i => this.deleteModal = i}
      restoreFocusTo="#delete-modal-launcher"
      primaryAction={this.deleteFavorite}
      primaryButtonLabel="Delete Favorite"
      secondaryAction={this.keepFavorite}
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
          <span>Delete Favorite</span>
        </button>
      </div>
    )
  }

  deleteFavorite = (e) => {
    e.preventDefault();
    const idToDelete = this.networkStore.values.locationId;
    this.networkStore.clearForm();
    this.manageFavoritesStore.deleteEditLocationFavorite(idToDelete);
    this.deleteModal.hideModal();
  }

  keepFavorite = (e) => {
    e.preventDefault();
    this.deleteModal.hideModal();
  }

  render() {
    const showMap = this.networkStore.iframeIsFullyLoaded;
    return (
      <article id="network-page" className="content-wrapper">
        <PageTitle className="sr-only">{this.networkStore.pageTitle}</PageTitle>
        <iframe src={config.geolinkAuthScript} aria-hidden="true" className="hidden-iframe"></iframe>

        <section id="map-section">
          {!showMap && this.renderPlaceholder()}
          <GeolinkMap networkStore={this.networkStore} hidden={!showMap} />
        </section>

        {this.networkStore.pageTitle === 'Network Status' &&
          <GeolinkControls networkStore={this.networkStore} disabled={!showMap}/>}

        {(this.networkStore.pageTitle === 'Add New Favorite' || this.networkStore.pageTitle === 'Edit Favorite') &&
          <section>
            <div className="container location-favorites">
              <div className="row">
                <div className="col-xs-12 title-wrapper">
                  <h2 className="as-h1">{this.networkStore.pageTitle}</h2>
                  {this.networkStore.pageTitle === 'Edit Favorite' && this.renderEditLocationDeleteButton()}
                </div>
                <LocationFavoriteForm store={this.networkStore} disabled={!this.networkStore.formIsDirty}/>
              </div>
            </div>
          </section>}

        {this.renderDeleteModal()}
      </article>
    )
  }
}
