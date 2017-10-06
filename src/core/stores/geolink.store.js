import {action, observable, computed} from 'mobx';
import axios from 'axios';
import config from 'config';
import {utilsService} from '../services/utils.service';
import {apiService} from '../services/api.service';

const networkLayerNames = [
  'FirstNet:Coverage2G',
  'FirstNet:Coverage3G4GOutdoor',
  'FirstNet:CoverageLTEWithPriorityOutdoor',
  'FirstNet:CoverageLTEWithoutPriority'
];

class GeolinkStore {
  @action loadGeolinkHtml() {
    const success = (response) => {
      let html = response.data;
      html = html.replace(new RegExp('@@geolinkScriptPath', 'g'), config.cloudGeolinkAssets);
      html = html.replace(new RegExp('@@geolinkAbMapConstantsFileName', 'g'), config.geolinkAbMapConstantsFileName);
      this.geolinkHtml = html;
    }
    const fail = (err) => {
      utilsService.handleError(err);
    }

    return axios.get('/maps/geolink.html', {
      headers: {
        'X-Frame-Options': 'deny'
      }
    }).then(success, fail);
  }

  @action searchMap() {
    if(this.values.locationAddress) {
      console.log('Searching map for ' + this.values.locationAddress + '...');
      this.mapIframeRef.contentWindow.postMessage({
        eventName: 'doMapGeocode',
        value: this.values.locationAddress
      }, '*');
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

  @action toggleNetwork() {
    this.showNetworkLayer = !this.showNetworkLayer;
    if(this.showNetworkLayer) {
      this.addAllNetworkLayers();
    } else {
      this.removeAllNetworkLayers();
    }
  }

  @action toggleTraffic() {
    this.showTrafficLayer = !this.showTrafficLayer;
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'toggleTraffic'
    }, '*');
  }

  @action toggleWeather() {
    this.showWeatherLayer = !this.showWeatherLayer;
    if(this.showWeatherLayer) {
      this.addWeather();
    } else {
      this.removeWeather();
    }
  }

  @action addWeather() {
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
    this.showAlertLayer = !this.showAlertLayer;
    this.mapIframeRef.contentWindow.postMessage({
      eventName: 'loadLayer',
      value: 'FirstNet:GTOCOutages',
      flag: this.showAlertLayer
    }, '*');
  }

  @action resetLayerToggles() {
    this.showNetworkLayer = true;
    this.showWeatherLayer = false;
    this.showTrafficLayer = false;
    this.showAlertLayer = false;
  }

  @computed get searchTerms() {
    return this.searchTerm.split(' ');
  }

  @computed get predictedFavorites() {
    let termsMatchFavorite = null;
    let re = null;
    return this.favorites.filter(favorite => {
      termsMatchFavorite = true;
      this.searchTerms.forEach(term => {
        re = new RegExp(term, 'i');
        if(!re.test(favorite.name) && !re.test(favorite.address)) {
          termsMatchFavorite = false;
        }
      })
      return termsMatchFavorite;
    }).splice(0, 8);
  }

  @action showAddLocationForm() {
    this.pageMode = 'ADD_LOCATION';
    this.values.locationName = '';
    this.clearAlerts();
  }

  @action showEditLocationForm() {
    this.pageMode = 'EDIT_LOCATION';
    this.clearAlerts();
  }

  @action submitForm() {
    const success = () => {
      this.pageMode = 'MAP_CONTROLS';
      this.successText = '"' + this.store.values.locationName + '" has been added.';
      this.showSuccess = true;
    }
    const failure = (err) => {
      this.alertText = err.response && err.response.data && err.response.data.message.indexOf('already exists') > -1
        ? 'You already have a favorite named "' + this.values.locationName + '".'
        : 'Please fix the following errors.';
      this.showAlert = true;
    }
    apiService.addLocationFavorite(this.values).then(success, failure);
  }

  @action clearForm() {
    this.values = Object.assign({}, this.defaultValues);
    this.clearAlerts();
    this.pageMode = 'MAP_CONTROLS';
  }

  @action clearAlerts() {
    this.showAlert = false;
    this.showSuccess = false;
  }

  @computed get formIsDirty() {
    let formHasChanged = false;
    Object.keys(this.values).forEach(key => {
      if(this.values[key].toString() !== this.defaultValues[key].toString()) {
        formHasChanged = true;
      }
    });
    return formHasChanged;
  }

  @action checkFormForErrors() {
    let hasError = false;
    this.formFieldRefList.forEach(ref => {
      if(ref && ref.hasFunctionalError) {
        hasError = true;
      }
    });
    this.formHasError = hasError;
  }

  //OBSERVABLES
  //Page
  @observable pageMode = 'MAP_CONTROLS';

  //Map
  @observable iframeIsFullyLoaded = false;
  @observable authIsComplete = false;
  @observable geolinkHtml = null;
  @observable mapIframeRef = null;

  //Controls
  @observable showNetworkLayer = true;
  @observable showWeatherLayer = false;
  @observable showTrafficLayer = false;
  @observable showAlertLayer = false;
  @observable networkIssueNumber = '800-574-7000';

  @observable favorites = [
    { name: 'Sapient Corporation', address: '40 Fulton Street, New York, NY' },
    { name: 'Sapient', address: '40 Fulton Street' },
    { name: 'Sapient', address: '40 Fulton Street' },
    { name: 'Sapient', address: '40 Fulton Street' },
    { name: 'Saaaaaaaaaapient', address: '40 Fulton Street' },
    { name: 'Sapient', address: '40 Fulton Streeeeeeeeet' },
    { name: 'Sapient', address: '40 Fulton Street' },
    { name: 'Sapient', address: '40 Fulton Street' }
  ]

  //Map Search, Add and Edit Location Favorites
  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable showAlert = false;
  @observable alertText = '';
  @observable showSuccess = false;
  @observable successText = '';
  @observable defaultValues = {
    locationAddress: '',
    locationName: ''
  };
  @observable values = {
    locationAddress: '',
    locationName: ''
  };
}

export const geolinkStore = new GeolinkStore();
