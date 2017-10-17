import {action, observable, computed, autorun} from 'mobx';
import axios from 'axios';
import config from 'config';
import {utilsService} from '../services/utils.service';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';

const networkLayerNames = [
  'FirstNet:Coverage2G',
  'FirstNet:Coverage3G4GOutdoor',
  'FirstNet:CoverageLTEWithPriorityOutdoor',
  'FirstNet:CoverageLTEWithoutPriority'
];

class GeolinkStore {

  constructor() {
    this.selectedFavoriteAddress = '';
    this.selectedFavoriteName = '';

    // determines whether to show address or favorite name
    autorun(() => {
      if(this.values.locationName !== this.selectedFavoriteName && this.shouldDisplayLocationName && this.values.locationName !== '') {
        this.values.locationAddress = this.values.locationName;
        this.values.locationName = '';
        this.selectedFavoriteName = '';
        this.shouldDisplayLocationName = false;
      }
    });
    // hides and shows dropdown
    autorun(() => {
      let inputContentMatchesSelection = this.values.locationAddress === this.selectedFavoriteAddress;
      let inputIsEmptyOrSpaces = !/\w+/.test(this.values.locationAddress);
      if(inputContentMatchesSelection || inputIsEmptyOrSpaces) {
        this.dropdownIsVisible = false;
        this.selectedFavoriteAddress = '';
      } else if(this.values.locationAddress) {
        this.dropdownIsVisible = true;
      }
    });
    // necessary in order to hide favorite star when value is removed via 'clear' button
    autorun(() => {
      if(this.values.locationName === '' && this.selectedFavoriteName !== '') {
        this.shouldDisplayLocationName = false;
        this.values.locationAddress = '';
      }
    })
    // check form for errors
    autorun(() => {
      let hasError = false;
      this.formFieldRefList.forEach(ref => {
        if(ref && ref.hasFunctionalError) {
          hasError = true;
        }
      });
      this.formHasError = hasError;
    })
  }

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
    this.dropdownIsVisible = false;
    this.shouldDisplayLocationName = false;
    if(this.values.locationAddress) {
      console.log('Searching map for ' + this.values.locationAddress + '...');
      this.mapIframeRef.contentWindow.postMessage({
        eventName: 'doMapGeocode',
        value: this.values.locationAddress
      }, '*');
    }
  }

  @action performExternalSearch(address) {
    this.values.locationAddress = address;
    history.replace('/network-status');
  }

  @action performEditLocationRequest(locationData) {
    this.pageTitle = 'Edit Favorite';
    this.values = {
      locationAddress: locationData.locationFavoriteAddress,
      locationName: locationData.favoriteName,
      locationId: locationData.locationFavoriteId
    };
    history.replace('/network-status');
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

  @action showAddLocationForm() {
    this.pageTitle = 'Add New Favorite';
    this.values.locationName = '';
    this.clearAlerts();
  }

  @action showEditLocationForm() {
    this.pageTitle = 'Edit Favorite';
    this.clearAlerts();
  }

  @action submitForm() {
    if(this.formHasError) {
      this.showAllFormErrors();
      return;
    }
    if(this.pageTitle === 'Edit Favorite') {
      this.editLocation();
    } else if(this.pageTitle === 'Add New Favorite') {
      this.addLocation();
    }
  }

  @action addLocation() {
    const success = () => {
      this.pageTitle = 'Network Status';
      this.successText = '"' + this.values.locationName + '" has been added.';
      this.showAlert = false;
      this.showSuccess = true;
    }
    const failure = (err) => {
      if(err.response && err.response.data && err.response.data.message && err.response.data.message.indexOf('already exists') > -1) {
        this.alertText = 'You already have a favorite named "' + this.values.locationName + '".';
      } else {
        this.alertText = 'The system encountered a problem. Please try again later.';
      }
      this.showAlert = true;
    }
    apiService.addLocationFavorite(this.values).then(success, failure);
  }

  @action editLocation() {
    const success = () => {
      this.pageTitle = 'Network Status';
      this.successText = '"' + this.values.locationName + '" has been updated.';
      this.showSuccess = true;
      history.replace('/manage-favorites');
    }
    const failure = (err) => {
      this.alertText = err.response && err.response.data && err.response.data.message.indexOf('already exists') > -1
        ? 'You already have a favorite named "' + this.values.locationName + '".'
        : 'Please fix the following errors.';
      this.showAlert = true;
    }
    apiService.editLocationFavorite(this.values).then(success, failure);
  }

  @action handleSecondaryAction() {
    if (this.pageTitle === 'Edit Favorite') {
      //reset values so that the unsaved changes modal doesn't show, but don't clear alerts because they're needed on Manage Favorites page;
      this.clearForm();
      history.replace('/manage-favorites');
    } else if (this.pageTitle === 'Add New Favorite') {
      this.pageTitle = 'Network Status';
    }
  }

  @action setPageTitle(title) {
    this.pageTitle = title;
  }

  @action clearForm() {
    this.resetValues();
    this.clearAlerts();
    this.pageTitle = 'Network Status';
    this.searchMap();
  }

  @action clearAlerts() {
    this.showAlert = false;
    this.showSuccess = false;
  }

  @action clearAlertsText() {
    this.successText = '';
    this.alertText = '';
  }

  @action resetValues() {
    this.values = Object.assign({}, this.defaultValues);
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

  @action showAllFormErrors() {
    this.formFieldRefList.forEach(ref => {
      if(ref && ref.hasFunctionalError) {
        ref.hasVisibleError = ref.hasFunctionalError;
      }
    });
    this.alertText = 'Please fix the following errors.';
    this.showAlert = true;
  }

  @action loadFavorites() {
    const success = (res) => {
      this.favorites = res.data.userlocationfavorite;
    }
    const fail = (err) => {
      utilsService.handleError(err);
    }
    apiService.getLocationFavorites().then(success, fail);
  }

  @action selectFavorite(favorite) {
    this.selectedFavoriteAddress = favorite.locationFavoriteAddress;
    this.values.locationAddress = favorite.locationFavoriteAddress;
    this.values.locationName = favorite.favoriteName;
    this.searchMap();
    this.shouldDisplayLocationName = true;
    this.selectedFavoriteName = favorite.favoriteName;
  }

  @computed get searchTerms() {
    return this.values.locationAddress.split(' ');
  }

  @computed get predictedFavorites() {
    let allSearchTermsMatchFavorite = null;
    let searchTermPattern = null;
    return this.favorites.filter(favorite => {
      allSearchTermsMatchFavorite = true;
      for(let term of this.searchTerms) {
        searchTermPattern = new RegExp(term, 'i');
        if(!searchTermPattern.test(favorite.favoriteName) && !searchTermPattern.test(favorite.locationFavoriteAddress)) {
          allSearchTermsMatchFavorite = false;
          break;
        }
      }
      return allSearchTermsMatchFavorite;
    }).splice(0, 8);
  }

  //OBSERVABLES
  //Page
  @observable pageTitle = 'Network Status';

  //Map
  @observable iframeIsFullyLoaded = false;
  @observable authIsComplete = false;
  @observable geolinkHtml = null;
  @observable mapIframeRef = null;
  @observable disableSearch = false;

  //Controls
  @observable showNetworkLayer = true;
  @observable showWeatherLayer = false;
  @observable showTrafficLayer = false;
  @observable showAlertLayer = false;
  @observable networkIssueNumber = '800-574-7000';

  //Map Search, Add and Edit Location Favorites
  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable showAlert = false;
  @observable alertText = '';
  @observable showSuccess = false;
  @observable successText = '';
  @observable defaultValues = {
    locationAddress: '',
    locationName: '',
    locationId: ''
  };
  @observable values = {
    locationAddress: '',
    locationName: '',
    locationId: ''
  };
  @observable dropdownIsVisible = false;
  @observable favorites = [];

  @observable shouldDisplayLocationName = false;
}

export const geolinkStore = new GeolinkStore();
