import React from 'react';
import PropTypes from 'prop-types';

export default class GeolinkMap extends React.Component {
  static propTypes = {
    networkStore: PropTypes.object.isRequired,
    hidden: PropTypes.bool
  }

  componentWillMount() {
    window.iframeLoaded = this.onIframeLoad;

    this.props.networkStore.loadGeolinkHtml().then(() => {
      //write the html into the iframe
      var doc = this.props.networkStore.mapIframeRef.contentWindow.document;
      // FNMP-1646 - this stops the browser from creating additional history object just for the iframe
      // "If you dont want to create a history entry, replace open() with open("text/html", "replace").""
      // from: https://developer.mozilla.org/en-US/docs/Web/API/Document/open
      doc.open('text/html', 'replace');
      doc.write(this.props.networkStore.geolinkHtml);
      doc.close();
    });
  }

  componentWillUnmount() {
    window.iframeLoaded = null;
  }

  handleUserAllowingLocation = (position) => {
    const defaultAddress = position.coords.latitude + ', ' + position.coords.longitude;
    this.props.networkStore.defaultValues.locationAddress = defaultAddress;
    this.props.networkStore.values.locationAddress = defaultAddress;
    this.props.networkStore.searchMap();
  }

  handleUserBlockingLocation = () => {
    console.log('User has blocked geolocation.');
  }

  onIframeLoad = () => {
    //record isReady in store to swap the placeholder for the map
    this.props.networkStore.iframeIsFullyLoaded = true;

    //set map defaults
    if (this.props.networkStore.values.locationAddress) {
      this.props.networkStore.searchMap();
      this.props.networkStore.disableSearch = false;
    } else if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.handleUserAllowingLocation, this.handleUserBlockingLocation);
    } else {
      console.warn('Geolocation is not allowed by the browser.');
    }

    this.props.networkStore.addAllNetworkLayers();
  }

  render() {
    return (
      <section className={`geolink-map ${this.props.hidden ? 'hidden' : ''}`}>
        <div className="map-wrapper">
          <iframe
            id="coverage-map"
            role="map"
            title="Interactive Coverage Map"
            ref={(ref) => this.props.networkStore.mapIframeRef = ref}/>
        </div>
      </section>
    );
  }
}
