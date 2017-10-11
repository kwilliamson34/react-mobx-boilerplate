
jest.unmock('../../../core/stores/geolink.store');
jest.unmock('../geolink-map');

import GeolinkMap from '../geolink-map';
import {MemoryRouter} from 'react-router-dom';
import {geolinkStore} from '../../../core/stores/geolink.store';

describe('<GeolinkMap />', () => {
  const dumbPromise = new Promise(resolve => {resolve()});
  let props = {
    geolinkStore
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
      props.geolinkStore.loadGeolinkHtml = jest.fn();
      props.geolinkStore.loadGeolinkHtml.mockReturnValue(new Promise(resolve => resolve()));
      let component = renderer.create(<GeolinkMap {...props}/>);
      expect(props.geolinkStore.loadGeolinkHtml).toBeCalled();
    });

    test('adds network layers by default once iframe loads', () => {
      props.geolinkStore.addAllNetworkLayers = jest.fn();

      let component = renderer.create(<GeolinkMap {...props}/>);
      window.iframeLoaded();

      expect(props.geolinkStore.loadGeolinkHtml).toBeCalled();
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

      props.geolinkStore.updateDefaultSearchTerm = jest.fn();
      props.geolinkStore.updateSearchTerm = jest.fn();
      props.geolinkStore.searchMap = jest.fn();

      let component = renderer.create(<GeolinkMap {...props}/>);
      window.iframeLoaded();

      // expect(props.geolinkStore.updateDefaultSearchTerm).toBeCalled();
      // expect(props.geolinkStore.updateSearchTerm).toBeCalled();
      // expect(props.geolinkStore.searchMap).toBeCalled();
      // expect(props.geolinkStore.searchTerm).toBe('lat, long')
    });
  });
});
