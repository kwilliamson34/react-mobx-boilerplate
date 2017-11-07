import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import config from 'config';
import {utilsService} from '../core/services/utils.service';
import PageTitle from '../components/page-title/page-title';
import $ from 'jquery';

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

  componentWillUnmount() {
    //restore default defaultValues changed during editLocation request;
    this.geoStore.resetValues();
  }

  showDeleteModal = () => {
    $('#delete-modal').modal({backdrop: 'static'});
    $('#delete-modal').modal('show');
  }

  hideDeleteModal = () => {
    $('#delete-modal').modal('hide');
    $('#delete-modal').data('bs.modal', null);
  }

  renderDeleteModal = () => {
    return (
      <div id="delete-modal" role="dialog" tabIndex="-1" className="modal fade" aria-labelledby="modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.hideDeleteModal}>
                <i aria-hidden="true" className="icon-close"></i>
                <span className="sr-only">Close window</span>
              </button>
              <div className="row no-gutters" id="modal-title">
                <div className="col-xs-12">
                  <h1 className="as-h2">
                    {`Delete ${this.geoStore.values.locationName}?`}
                  </h1>
                  <p>This cannot be undone. New favorites can be added at any time.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className="fn-primary" onClick={this.keepFavorite}>Keep Favorite</button>
                  <button className="fn-secondary" onClick={this.deleteFavorite}>Delete Favorite</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
        <button className="btn as-link" onClick={this.handleEditLocationDelete}>
          <i className="icon-trash" aria-hidden="true" />
          Delete Favorite
        </button>
      </div>
    )
  }

  handleEditLocationDelete = () => {
    this.showDeleteModal();
  }

  deleteFavorite = (e) => {
    e.preventDefault();
    const idToDelete = this.geoStore.values.locationId;
    this.manageFavoritesStore.deleteEditLocationFavorite(idToDelete);
    this.geoStore.setPageTitle('Network Status');
    this.geoStore.resetValues();
  }

  keepFavorite = (e) => {
    e.preventDefault();
    this.hideDeleteModal();
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
          <section className="light-grey-bg">
            <div className="container location-favorites">
              <div className="row">
                <div className="col-xs-12 title-wrapper">
                  <h2 className="as-h1">{this.geoStore.pageTitle}</h2>
                  {this.geoStore.pageTitle === 'Edit Favorite' && this.renderEditLocationDeleteButton()}
                </div>
                <LocationFavoriteForm store={this.geoStore} disabled={!this.geoStore.formIsDirty}/>
              </div>
            </div>
            {this.renderDeleteModal()}
          </section>}
      </article>
    )
  }
}
