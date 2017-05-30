import {action, observable} from 'mobx';
import axios from 'axios';
import config from 'config';

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
      html = html.replace(new RegExp('@@geolinkScriptPath', 'g'), config.geolinkScripts);
      html = html.replace(new RegExp('@@geolinkAbMapConstantsFileName', 'g'), config.geolinkAbMapConstants);
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

  @action toggleTraffic() {
    console.log('Toggling traffic');
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'toggleTraffic'
    }, '*');
  }

  @action addWeather() {
    console.log('Adding weather layer/animation');
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'loadRadar',
      options: {
        opacity: .7
      }
    }, '*');

    //Additional weather evants
    // this.mapIframeRef.contentWindow.postMessage({
    //   eventName: 'showHurricane',
    //   flag: true
    // }, '*');
    // this.mapIframeRef.contentWindow.postMessage({
    //   eventName: 'loadLayer',
    //   value: '1184FF', //Flash flood
    //   flag: true
    // }, '*');
    // this.mapIframeRef.contentWindow.postMessage({
    //   eventName: 'loadLayer',
    //   value: '1187STW', //Thunder storm
    //   flag: true
    // }, '*');
    // this.mapIframeRef.contentWindow.postMessage({
    //   eventName: 'loadLayer',
    //   value: '1188TW', //Tornado
    //   flag: true
    // }, '*');

    //Weather layer animation
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'animateRadar',
      options: {
        frameSpeed: 1500 //milliseconds
      }
    }, '*');
  }

  @action removeWeather() {
    console.log('Removing weather layer/animation');
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'removeRadar'
    }, '*');
  }

  @action toggleAlerts(turnOn) {
    console.log('Toggling alerts layer');
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'loadLayer',
      value: 'FirstNet:GTOCOutages',
      flag: turnOn
    }, '*');
  }

  @observable isGeolinkReady = false;
  @observable geolinkHtml = null;
  @observable mapIframeRef = null;
  @observable searchTerm = '';
  @observable defaultSearchTerm = '';

}

export const geolinkStore = new GeolinkStore();
