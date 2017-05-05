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
          <div className="map-wrapper noPadding col-xs-12 col-sm-12 col-md-8 col-lg-9">
            <iframe
              title="Interactive Coverage Map"
              ref={(ref) => this.iframe = ref}
              onLoad={() => {/*TODO center the map */}}/>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <GeolinkControls/>
          </div>
        </section>
      );
    }
}
