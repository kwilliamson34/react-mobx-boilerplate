import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import config from 'config';
import GeolinkMap from '../components/geolink-map/geolink-map';
import GeolinkControls from '../components/geolink-map/geolink-controls';
import {utilsService} from '../core/services/utils.service';
import $ from 'jquery';

@inject('store')
@observer
export default class NetworkStatusPage extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.geoStore = this.props.store.geolinkStore;

    if(!this.geoStore.authIsComplete) {
      window.addEventListener('message', (event) => {
        if(event.data === 'geo-ready') {
          console.log('geo-ready message received from iframe');
          this.geoStore.authIsComplete = true;
        }
      }, false);
    }
  }

  componentDidMount() {
    console.log('IE: ' + utilsService.getIsInternetExplorer());
    if(utilsService.getIsInternetExplorer()){
      console.log('isIE');
      $('#network-page').addClass('isIE');
    }
  }

  renderPlaceholder() {
    return (
      <div className="map-placeholder">
        <p className="as-h2" aria-live="polite">
          <i className="as-h2 icon-reload" aria-hidden="true"></i>
          Loading map&hellip;
        </p>
      </div>
    )
  }

  render() {
    const showMap = this.geoStore.iframeIsFullyLoaded;
    return (
      <article id="network-page" className="content-wrapper">
        <h1 className="sr-only">Network Status</h1>
        <iframe src={config.geolinkAuthScript} aria-hidden="true" className="hidden-iframe"></iframe>

        {!showMap && this.renderPlaceholder()}
        <GeolinkMap geolinkStore={this.geoStore} hidden={!showMap}/>
        <GeolinkControls geolinkStore={this.geoStore} disabled={!showMap}/>

      </article>
    )
  }
}
