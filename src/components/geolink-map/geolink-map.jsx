import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
    //render the map html into the iframe
    axios.get('/maps/geolink.html', {
      headers: {
        'X-Frame-Options': 'deny'
      }
    }).then((response) => {
      //TODO point to the script domain specified in configs
      let html = response.data;
      html = html.replace(new RegExp('@@geolinkScriptPath', 'g'), 'https://geo.stage.att.com/appboard'); //endpoints.geolinkScriptPath);
      html = html.replace(new RegExp('@@geolinkAbMapConstantsFileName', 'g'), 'abMapConstantsFNST.js'); //endpoints.geolinkAbMapConstantsFileName);

      //write the html into the iframe
      var doc = document.getElementsByTagName('iframe')[0].contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    }).catch(err => {
      console.log(err);
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
