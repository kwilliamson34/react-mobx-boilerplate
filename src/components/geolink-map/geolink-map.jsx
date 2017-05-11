import React from 'react';
import axios from 'axios';

import GeolinkControls from './geolink-controls';
import {geolinkService} from '../../core/services/geolink.service.js';

export default class GeolinkMap extends React.Component {

    componentWillMount() {
      //render the map html into the iframe
      axios.get('/maps/geolink.html', {
        headers: { 'X-Frame-Options': 'deny' }
      }).then((response) => {
        //TODO point to the script domain specified in configs
        let html = response.data.replace(new RegExp('@@geolinkScriptType', 'g'), 'html');//text/javascript
        html = html.replace(new RegExp('@@geolinkScriptPath', 'g'), 'https://geo.stage.att.com/appboard');//endpoints.geolinkScriptPath);

        //write the html into the iframe
        var doc = document.getElementsByTagName('iframe')[0].contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();
      }).catch(err => {
        console.log(err);
      });
    }

    render() {
      return (
        <section className="geolink-map">
          <div className="map-wrapper noPadding">
            <iframe
              title="Interactive Coverage Map"
              ref={(ref) => this.iframe = ref}
              onLoad={() => {/*TODO center the map */}}/>
          </div>
          <GeolinkControls
            addLayer={this.addLayer.bind(this)}
            removeLayer={this.removeLayer.bind(this)}
            searchMap={this.searchMap.bind(this)}/>
        </section>
      );
    }

    /* Pass geolink functions to children, maintain control of iframe ref */
    addLayer(layer) {
      geolinkService.geolinkTurnLayerOn(this.iframe, layer);
    }

    removeLayer(layer) {
      geolinkService.geolinkTurnLayerOff(this.iframe, layer);
    }

    searchMap(searchValue) {
      geolinkService.geolinkSearchMap(this.iframe, searchValue);
    }
}
