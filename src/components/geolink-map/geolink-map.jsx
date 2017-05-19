import React from 'react';
import PropTypes from 'prop-types';

import GeolinkControls from './geolink-controls';

export default class GeolinkMap extends React.Component {
  static propTypes = {
    geolinkStore: PropTypes.object.isRequired
  }

  componentWillMount() {
    window.iframeLoaded = this.setDefaults.bind(this);

    this.props.geolinkStore.loadGeolinkHtml().then(() => {
      //write the html into the iframe
      var doc = document.getElementsByTagName('iframe')[0].contentWindow.document;
      doc.open();
      doc.write(this.props.geolinkStore.geolinkHtml);
      doc.close();
    });
  }

  componentWillUnmount() {
    window.iframeLoaded = null;
  }

  setDefaults() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const searchTerm = position.coords.latitude + ', ' + position.coords.longitude;
        this.props.geolinkStore.updateSearchTerm(searchTerm);
        this.props.geolinkStore.searchMap();
      });
    } else {
      console.warn('Geolocation is not allowed by the browser.');
    }

    this.props.geolinkStore.toggleTraffic();
    this.props.geolinkStore.addWeather();
  }

  render() {
    return (
      <section className="geolink-map">
        <div className="map-wrapper">
          <iframe
            title="Interactive Coverage Map"
            ref={(ref) => this.props.geolinkStore.mapIframeRef = ref}/>
        </div>
        <GeolinkControls geolinkStore={this.props.geolinkStore}/>
      </section>
    );
  }
}
