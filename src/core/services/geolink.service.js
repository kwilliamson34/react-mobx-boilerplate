class GeolinkService {
  geolinkSearchMap(iframe, searchValue) {
    if(!iframe) {
      console.error('No iframe provided!');
      return;
    }

    console.log('Searching map for ' + searchValue + '...');
    iframe.contentWindow.postMessage({
      eventName: 'doMapGeocode',
      value: searchValue
    }, '*');
  }

  geolinkTurnLayerOn(iframe, {state = '', bandOrIoc = '', indoorOutdoor = ''}) {
    if(!iframe) {
      console.error('No iframe provided!');
      return;
    }

    const fieldName = this.getGeolinkFieldName(bandOrIoc, indoorOutdoor);
    console.log('Turning ON ' + fieldName + ' for region ' + state + '...');
    iframe.contentWindow.postMessage({
      eventName: 'loadLayer',
      value: fieldName,
      flag: true,
      filters: state ? 'State=\'' + state + '\'' : null
    }, '*');
  }

  geolinkTurnLayerOff(iframe, {state = '', bandOrIoc = '', indoorOutdoor = ''}) {
    if(!iframe) {
      console.error('No iframe provided!');
      return;
    }

    const fieldName = this.getGeolinkFieldName(bandOrIoc, indoorOutdoor);
    console.log('Turning OFF ' + fieldName + ' for region ' + state + '...');
    iframe.contentWindow.postMessage({
      eventName: 'loadLayer',
      value: fieldName,
      flag: false,
      filters: state ? 'State=\'' + state + '\'' : null
    }, '*');
  }

  getGeolinkFieldName(bandOrIoc, indoorOutdoor) {
    return 'FirstNet:Coverage' + bandOrIoc.replace('_', '') + indoorOutdoor;
  }

  getGeolinkStatName(ioc, indoorOutdoor, fieldName) {
    //insert underscore before digits in ioc name
    const iocString = ioc.replace(new RegExp('[\d+]', 'g'), new RegExp('_$&', 'g'));
    return indoorOutdoor + '_' + iocString + '_' + fieldName;
  }

}

export const geolinkService = new GeolinkService();
