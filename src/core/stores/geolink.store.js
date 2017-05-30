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

  @action updateSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
  }

  @action updateDefaultSearchTerm(defaultSearchTerm) {
    this.defaultSearchTerm = defaultSearchTerm;
  }

  @action searchMap() {
    console.log('Searching map for ' + this.searchTerm + '...');
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'doMapGeocode',
      value: this.searchTerm || this.defaultSearchTerm
    }, '*');
  }

  @action toggleNetwork() {
    console.log('Toggling network layers');
    this.showNetworkLayer = !this.showNetworkLayer;
    if(this.showWeatherLayer) {
      this.addAllNetworkLayers();
    } else {
      this.removeAllNetworkLayers();
    }
  }

  @action addAllNetworkLayers() {
    networkLayerNames.map(layerName => {
      this.addLayer(layerName);
    });
  }

  @action removeAllNetworkLayers() {
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

  @action toggleTraffic() {
    console.log('Toggling traffic');
    this.showTrafficLayer = !this.showTrafficLayer;
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'toggleTraffic'
    }, '*');
  }

  @action toggleWeather() {
    console.log('Toggling weather layer/animation');
    this.showWeatherLayer = !this.showWeatherLayer;
    if(this.showWeatherLayer) {
      this.addWeather();
    } else {
      this.removeWeather();
    }
  }

  @action addWeather() {
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'loadRadar',
      options: {
        opacity: .7
      }
    }, '*');

    //Weather layer animation
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'animateRadar',
      options: {
        frameSpeed: 1500 //milliseconds
      }
    }, '*');
  }

  @action removeWeather() {
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'removeRadar'
    }, '*');
  }

  @action toggleAlerts() {
    console.log('Toggling alerts layer');
    this.showAlertLayer = !this.showAlertLayer;
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'loadLayer',
      value: 'FirstNet:GTOCOutages',
      flag: this.showAlertLayer
    }, '*');
  }

  @observable isGeolinkReady = false;
  @observable geolinkHtml = null;
  @observable mapIframeRef = null;
  @observable searchTerm = '';
  @observable defaultSearchTerm = '';

  @observable showNetworkLayer = true;
  @observable showWeatherLayer = false;
  @observable showTrafficLayer = false;
  @observable showAlertLayer = false;
}

export const geolinkStore = new GeolinkStore();
