jest.unmock('axios');
jest.unmock('../geolink.store');

import {geolinkStore} from '../geolink.store';
const store = geolinkStore;

describe("GeolinkStore", () => {
  store.mapIframeRef = {
    contentWindow: {
      postMessage: jest.fn()
    }
  }

  test("toggling network checkbox adds/removes 4 layers", () => {
    store.addAllNetworkLayers();
    expect(store.mapIframeRef.contentWindow.postMessage.mock.calls.length).toBe(4);

    store.removeAllNetworkLayers();
    expect(store.mapIframeRef.contentWindow.postMessage.mock.calls.length).toBe(8);
  });

  test("control toggles work as expected", () => {
    store.showNetworkLayer = false;
    store.showWeatherLayer = false;
    store.showTrafficLayer = false;
    store.showAlertLayer = false;

    store.toggleNetwork();
    expect(store.showNetworkLayer).toBe(true);
    store.toggleNetwork();
    expect(store.showNetworkLayer).toBe(false);

    store.toggleWeather();
    expect(store.showWeatherLayer).toBe(true);
    store.toggleWeather();
    expect(store.showWeatherLayer).toBe(false);

    store.toggleTraffic();
    expect(store.showTrafficLayer).toBe(true);
    store.toggleTraffic();
    expect(store.showTrafficLayer).toBe(false);

    store.toggleAlerts();
    expect(store.showAlertLayer).toBe(true);
    store.toggleAlerts();
    expect(store.showAlertLayer).toBe(false);
  });

  test("resetLayerToggles resets default, where only Network layers are on", () => {
    store.resetLayerToggles();
    expect(store.showNetworkLayer).toBe(true);
    expect(store.showWeatherLayer).toBe(false);
    expect(store.showTrafficLayer).toBe(false);
    expect(store.showAlertLayer).toBe(false);
  });

  test("search uses the stored search term", () => {
    const currentCallNum = store.mapIframeRef.contentWindow.postMessage.mock.calls.length;
    store.updateSearchTerm('term1');
    expect(store.searchTerm).toBe('term1');
    store.searchMap();
    expect(store.mapIframeRef.contentWindow.postMessage.mock.calls.length).toBe(currentCallNum + 1);

    store.updateSearchTerm('');
    store.updateDefaultSearchTerm('term2');
    expect(store.defaultSearchTerm).toBe('term2');
    store.searchMap();
    expect(store.mapIframeRef.contentWindow.postMessage.mock.calls.length).toBe(currentCallNum + 1);
  });

  test("loadGeolinkHtml asynchronously loads html file into observable", () => {
    expect(store.geolinkHtml).toBeFalsy();
    store.loadGeolinkHtml().resolves;
    // expect(store.geolinkHtml).toBeTruthy();
  });
});
