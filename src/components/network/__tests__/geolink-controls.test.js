jest.unmock('../geolink-controls');

// unmocking because we want to test all the way down the chain.
jest.unmock('../../forms/checkbox');

import GeolinkControls from '../geolink-controls';
import { MemoryRouter } from 'react-router-dom';

describe('<GeolinkControls />', () => {
  let props = {
    networkStore: {
      toggleNetwork: jest.fn(),
      toggleTraffic: jest.fn(),
      toggleAlerts: jest.fn(),
      toggleWeather: jest.fn(),
      searchMap: jest.fn(),
      resetLayerToggles: jest.fn(),
      showAddLocationForm: jest.fn(),
      loadFavorites: jest.fn(),
      selectFavorite: jest.fn(),
      clearFormFieldRefList: jest.fn(),
      formFieldRefList: [],
      values: {
        locationName: '',
        locationAddress: ''
      }
    }
  }

  describe('renders', () => {
    test('matches snapshot when enabled and disabled', () => {
      let component, tree;

      props.networkStore.authIsComplete = false;
      props.disabled = true;
      component = renderer.create(<MemoryRouter>
        <GeolinkControls {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.networkStore.authIsComplete = false;
      props.disabled = false;
      component = renderer.create(<MemoryRouter>
        <GeolinkControls {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.networkStore.authIsComplete = true;
      props.disabled = false;
      component = renderer.create(<MemoryRouter>
        <GeolinkControls {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('matches snapshot when dropdown is showing', () => {
      let component, tree;

      props.networkStore.predictedFavorites = [
        { favoriteName: 'Sapient Corporation', locationFavoriteAddress: '40 Fulton Street, New York, NY' },
        { favoriteName: 'Williamsburg', locationFavoriteAddress: 'Bedford Ave, Brooklyn, NY' }
      ]

      props.networkStore.dropdownIsVisible = true;
      component = renderer.create(<MemoryRouter>
        <GeolinkControls {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('UI interaction', () => {
    test('displaying controls loads list of favorites', () => {
      //determine the function to spy on
      const functionToWatch = props.networkStore.loadFavorites;

      //trigger the action
      TestUtils.renderIntoDocument(<MemoryRouter><GeolinkControls {...props} /></MemoryRouter>);

      expect(functionToWatch).toHaveBeenCalled();
    });
  });
});
