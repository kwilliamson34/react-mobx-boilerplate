
jest.unmock('../../../core/stores/network.store');
jest.unmock('../geolink-map');

import GeolinkMap from '../geolink-map';
import {MemoryRouter} from 'react-router-dom';
import {networkStore} from '../../../core/stores/network.store';

describe('<GeolinkMap />', () => {
  const dumbPromise = new Promise(resolve => {resolve()});
  let props = {
    networkStore
  }

  describe('renders', () => {
    test('matches snapshot when hidden and visible', () => {
      let component, tree;

      props.hidden = true;
      component = renderer.create(<GeolinkMap {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.hidden = false;
      component = renderer.create(<GeolinkMap {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('API', () => {
    test('starts loading iframe immediately upon initialization', () => {
      props.networkStore.loadGeolinkHtml = jest.fn();
      props.networkStore.loadGeolinkHtml.mockReturnValue(new Promise(resolve => resolve()));
      let component = renderer.create(<GeolinkMap {...props}/>);
      expect(props.networkStore.loadGeolinkHtml).toBeCalled();
    });

    test('adds network layers by default once iframe loads', () => {
      props.networkStore.addAllNetworkLayers = jest.fn();

      let component = renderer.create(<GeolinkMap {...props}/>);
      window.iframeLoaded();

      expect(props.networkStore.loadGeolinkHtml).toBeCalled();
    });

    test('uses geolocation if available', () => {
      navigator.geolocation = {
        getCurrentPosition: jest.fn()
      }
      navigator.geolocation.getCurrentPosition.mockReturnValue({
        coords: {
          latitude: 'lat',
          longitude: 'long'
        }
      });

      let component = renderer.create(<GeolinkMap {...props}/>);
      window.iframeLoaded();

      expect(navigator.geolocation.getCurrentPosition).toBeCalled();
    });

    test('executes default search based on geolocation', () => {
      navigator.geolocation = {
        getCurrentPosition: () => {return {
          coords: {
            latitude: 'lat',
            longitude: 'long'
          }
        }}
      }

      props.networkStore.updateDefaultSearchTerm = jest.fn();
      props.networkStore.updateSearchTerm = jest.fn();
      props.networkStore.searchMap = jest.fn();

      let component = renderer.create(<GeolinkMap {...props}/>);
      window.iframeLoaded();

      // expect(props.networkStore.updateDefaultSearchTerm).toBeCalled();
      // expect(props.networkStore.updateSearchTerm).toBeCalled();
      // expect(props.networkStore.searchMap).toBeCalled();
      // expect(props.networkStore.searchTerm).toBe('lat, long')
    });
  });
});
