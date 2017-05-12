import React from 'react';
import PropTypes from 'prop-types';

import GeolinkControls from './geolink-controls';

export default class GeolinkMap extends React.Component {
  static propTypes = {
    geolinkStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.loadInitialLayers = this.loadInitialLayers.bind(this);
  }

  componentWillMount() {
    this.props.geolinkStore.loadGeolinkHtml().then(() => {
      //write the html into the iframe
      var doc = document.getElementsByTagName('iframe')[0].contentWindow.document;
      doc.open();
      doc.write(this.props.geolinkStore.geolinkHtml);
      doc.close();
    });
  }

  loadInitialLayers() {
    this.props.geolinkStore.addAllCoverageLayers();
  }

  render() {
    return (
      <section className="geolink-map">
        <div className="map-wrapper">
          <iframe
            title="Interactive Coverage Map"
            ref={(ref) => this.props.geolinkStore.mapIframeRef = ref}
            onLoad={() => this.loadInitialLayers}/>
        </div>
        <GeolinkControls geolinkStore={this.props.geolinkStore}/>
      </section>
    );
  }
}
