import {action, observable, computed, autorun} from 'mobx';
import axios from 'axios';
import config from 'config';
import {utilsService} from '../services/utils.service';
import {apiService} from '../services/api.service';
import {history} from '../services/history.service';
import _ from 'lodash';

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
      if(this.values.locationName !== this.selectedFavoriteName && this.shouldDisplayLocationName && this.values.locationName !== '' && this.pageTitle === 'Network Status') {
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
    if(this.values.locationAddress) {
      console.log('Searching map for ' + this.values.locationAddress + '...');
      this.mapIframeRef.contentWindow.postMessage({
        eventName: 'doMapGeocode',
        value: this.values.locationAddress
      }, '*');
    }
  }

  @action performMapFavoriteRequest(locationData) {
    this.values = {
      locationAddress: locationData.locationFavoriteAddress,
      locationName: locationData.favoriteName,
      locationId: locationData.locationFavoriteId
    };
    this.resetCurrentFavorite(locationData)

    this.pageTitle = 'Network Status';
    history.push('/network');
  }

  @action performEditLocationRequest(locationData) {
    this.values = {
      locationAddress: locationData.locationFavoriteAddress,
      locationName: locationData.favoriteName,
      locationId: locationData.locationFavoriteId
    };
    this.defaultValues = {
      locationAddress: locationData.locationFavoriteAddress,
      locationName: locationData.favoriteName,
      locationId: locationData.locationFavoriteId
    };

    this.pageTitle = 'Edit Favorite';
    history.push('/network');
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
    this.clearAlertBars();
  }

  @action showEditLocationForm() {
    this.pageTitle = 'Edit Favorite';
    this.clearAlertBars();
  }

  @action submitForm() {
    if(this.pageTitle === 'Edit Favorite') {
      this.editLocation();
    } else if(this.pageTitle === 'Add New Favorite') {
      this.addLocation();
    }
  }

  @action resetCurrentFavorite() {
    this.selectedFavoriteAddress = this.values.locationAddress;
    this.selectedFavoriteName = this.values.locationName;
    this.shouldDisplayLocationName = true;
    this.dropdownIsVisible = false;
    this.loadFavorites();
  }

  @action addLocation() {
    const success = () => {
      this.resetCurrentFavorite();
      this.pageTitle = 'Network Status';
      this.updateSuccess('"' + this.values.locationName + '" has been added.');
      this.updateAlert('');
      this.formFieldRefList.find((el) => {
        return el && (el.input.id === 'locationName' || el.input.id === 'locationAddress');
      }).input.focus();
    }
    const failure = (err) => {
      let text;
      if(err.response && err.response.data && err.response.data.message && err.response.data.message.indexOf('already exists') > -1) {
        text = 'You already have a favorite named "' + this.values.locationName + '".';
      } else {
        text = 'The system encountered a problem. Please try again later.';
      }
      this.updateAlert(text);
    }
    apiService.addLocationFavorite(this.values).then(success, failure);
  }

  @action editLocation() {
    const success = () => {
      this.resetCurrentFavorite();
      this.pageTitle = 'Network Status';
      this.updateAlert('');
      this.updateSuccess('"' + this.values.locationName + '" has been updated.');
      history.push('/manage-favorites');
      this.resetValues();
    }
    const failure = (err) => {
      const text = err.response && err.response.data && err.response.data.message.indexOf('already exists') > -1
        ? 'You already have a favorite named "' + this.values.locationName + '".'
        : 'Please fix the following errors.';
      this.updateAlert(text);
    }
    apiService.editLocationFavorite(this.values).then(success, failure);
  }

  @action handleSecondaryAction() {
    if (this.pageTitle === 'Edit Favorite') {
      this.clearForm();
      history.push('/manage-favorites');
    } else if (this.pageTitle === 'Add New Favorite') {
      this.pageTitle = 'Network Status';
    }
  }

  @action setPageTitle(title) {
    this.pageTitle = title;
  }

  @action clearForm() {
    this.resetValues();
    this.clearAlertBars();
    this.clearFormFieldRefList();
    this.setPageTitle('Network Status');
    this.searchMap();
  }

  @action clearSearch() {
    // necessary in order to hide favorite star when value is removed via 'clear' button
    this.shouldDisplayLocationName = false;
    this.values.locationAddress = '';
    this.selectedFavoriteName = '';
  }

  @action clearFormFieldRefList() {
    this.formFieldRefList = [];
  }

  @action clearAlertBars() {
    this.updateAlert('');
    this.updateSuccess('');
  }

  @action updateAlert(alertText) {
    this.alertToDisplay = alertText;
  }

  @action updateSuccess(successText) {
    this.successToDisplay = successText;
  }

  @action resetValues() {
    this.defaultValues = {
      locationAddress: '',
      locationName: '',
      locationId: ''
    };
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
        searchTermPattern = new RegExp(_.escapeRegExp(term), 'i');
        if(!searchTermPattern.test(favorite.favoriteName) && !searchTermPattern.test(favorite.locationFavoriteAddress)) {
          allSearchTermsMatchFavorite = false;
          break;
        }
      }
      return allSearchTermsMatchFavorite;
    }).splice(0, 8);
  }

  @computed get submitButtonText() {
    return this.pageTitle == 'Edit Favorite' ? 'Update Favorite' : 'Save Favorite';
  }

  //OBSERVABLES
  //Page
  @observable pageTitle = 'Network Status';

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

  //Map Search, Add and Edit Location Favorites
  @observable formFieldRefList = [];
  @observable formHasError = true;
  @observable alertToDisplay = '';
  @observable successToDisplay = '';
  @observable defaultValues = {
    locationAddress: '',
    locationName: '',
    locationId: ''
  };
  @observable values = Object.assign({}, this.defaultValues);
  @observable dropdownIsVisible = false;
  @observable favorites = [];

  @observable shouldDisplayLocationName = false;
}

export const networkStore = new GeolinkStore();
