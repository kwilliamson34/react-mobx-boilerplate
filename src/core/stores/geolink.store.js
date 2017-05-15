import {
  action,
  observable
} from 'mobx';
import axios from 'axios';

const networkLayerNames = [
  'FirstNet:Coverage2G',
  'FirstNet:Coverage3G4GIndoor',
  'FirstNet:Coverage3G4GOutdoor',
  'FirstNet:CoverageLTEWithPriorityIndoor',
  'FirstNet:CoverageLTEWithPriorityOutdoor',
  'FirstNet:CoverageLTEWithoutPriority'
];
// const outageLayerName = 'FirstNet:GTOCOutages';

class GeolinkStore {
  @action loadGeolinkHtml() {
    const success = (response) => {
      //TODO point to the script domain specified in configs
      let html = response.data;
      html = html.replace(new RegExp('@@geolinkScriptPath', 'g'), 'https://geo.stage.att.com/appboard'); //endpoints.geolinkScriptPath);
      html = html.replace(new RegExp('@@geolinkAbMapConstantsFileName', 'g'), 'abMapConstantsFNST.js'); //endpoints.geolinkAbMapConstantsFileName);
      this.geolinkHtml = html;
    }
    const fail = (err) => {
      console.warn(err);
    }

    return axios.get('/maps/geolink.html', {
      headers: {
        'X-Frame-Options': 'deny'
      }
    }).then(success, fail);
  }

  @action addAllCoverageLayers() {
    networkLayerNames.map(layerName => {
      this.addLayer(layerName);
    });
  }

  @action removeAllCoverageLayers() {
    networkLayerNames.map(layerName => {
      this.removeLayer(layerName);
    });
  }

  @action addLayer(layerName) {
    console.log('Turning ON ' + layerName);
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'loadLayer',
      value: layerName,
      flag: true
    }, '*');
  }

  @action removeLayer(layerName) {
    console.log('Turning OFF ' + layerName);
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'loadLayer',
      value: layerName,
      flag: false
    }, '*');
  }

  @action updateSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
  }

  @action searchMap() {
    console.log('Searching map for ' + this.searchTerm + '...');
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'doMapGeocode',
      value: this.searchTerm
    }, '*');
  }

  @action toggleTraffic() {
    console.log('Toggling traffic');
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'toggleTraffic'
    }, '*');
  }

  @action addWeather() {
    console.log('Adding weather layer/animation');
    const options = {
      opacity: .7
    };
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'loadRadar',
      options: options
    }, '*');
    /*TODO Evaluate weather the "animate weather" event is needed
    once the map is visible and we know what the baseline weather
    display is. */
  }

  @action removeWeather() {
    console.log('Removing weather layer/animation');
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'removeRadar'
    }, '*');
  }

  @observable isGeolinkReady = false;
  @observable geolinkHtml = null;
  @observable mapIframeRef = null;
  @observable searchTerm = '';

}

export const geolinkStore = new GeolinkStore();
