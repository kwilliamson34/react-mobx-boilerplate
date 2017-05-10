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

  geolinkTurnLayerOn(iframe, layer) {
    if(!iframe) {
      console.error('No iframe provided!');
      return;
    }

    const fieldName = this.getGeolinkFieldName(layer);
    console.log('Turning ON ' + fieldName);
    iframe.contentWindow.postMessage({
      eventName: 'loadLayer',
      value: fieldName,
      flag: true
    }, '*');
  }

  geolinkTurnLayerOff(iframe, layer) {
    if(!iframe) {
      console.error('No iframe provided!');
      return;
    }

    const fieldName = this.getGeolinkFieldName(layer);
    console.log('Turning OFF ' + fieldName);
    iframe.contentWindow.postMessage({
      eventName: 'loadLayer',
      value: fieldName,
      flag: false
    }, '*');
  }

  getGeolinkFieldName(layer) {
    return 'FirstNet:Coverage' + layer;
  }
}

export const geolinkService = new GeolinkService();
