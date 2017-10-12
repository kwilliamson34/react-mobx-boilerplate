import React from 'react';
import PropTypes from 'prop-types';

export default class GeolinkMap extends React.Component {
  static propTypes = {
    geolinkStore: PropTypes.object.isRequired,
    hidden: PropTypes.bool
  }

  componentWillMount() {
    window.iframeLoaded = this.onIframeLoad;

    this.props.geolinkStore.loadGeolinkHtml().then(() => {
      //write the html into the iframe
      var doc = this.props.geolinkStore.mapIframeRef.contentWindow.document;
      doc.open();
      doc.write(this.props.geolinkStore.geolinkHtml);
      doc.close();
    });
  }

  componentWillUnmount() {
    window.iframeLoaded = null;
  }

  handleUserAllowingLocation = (position) => {
    const defaultAddress = position.coords.latitude + ', ' + position.coords.longitude;
    this.props.geolinkStore.defaultValues.locationAddress = defaultAddress;
    this.props.geolinkStore.values.locationAddress = defaultAddress;
    this.props.geolinkStore.searchMap();
    this.props.geolinkStore.disableSearch = false;
  }

  handleUserBlockingLocation = () => {
    console.log('User has blocked geolocation.');
    this.props.geolinkStore.disableSearch = false;
  }

  onIframeLoad = () => {
    //record isReady in store to swap the placeholder for the map
    this.props.geolinkStore.iframeIsFullyLoaded = true;

    //set map defaults
    if (this.props.geolinkStore.externalSearchRequest) {
      this.props.geolinkStore.searchMap();
      this.props.geolinkStore.disableSearch = false;
      this.props.geolinkStore.externalSearchRequest = false;
    } else if (!this.props.geolinkStore.externalSearchRequest && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
      const defaultSearchTerm = position.coords.latitude + ', ' + position.coords.longitude;
      this.props.geolinkStore.updateDefaultSearchTerm(defaultSearchTerm);
      this.props.geolinkStore.updateSearchTerm(defaultSearchTerm);
      this.props.geolinkStore.searchMap();
      });
     } else {
       console.warn('Geolocation is not allowed by the browser.');
     }

    this.props.geolinkStore.addAllNetworkLayers();
  }

  render() {
    return (
      <section className={`geolink-map ${this.props.hidden ? 'hidden' : ''}`}>
        <div className="map-wrapper">
          <iframe
            id="coverage-map"
            title="Interactive Coverage Map"
            ref={(ref) => this.props.geolinkStore.mapIframeRef = ref}/>
        </div>
      </section>
    );
  }
}
