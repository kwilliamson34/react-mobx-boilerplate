jest.unmock('../geolink-controls');

// unmocking because we want to test all the way down the chain.
jest.unmock('../../forms/checkbox');

import GeolinkControls from '../geolink-controls';
import { MemoryRouter } from 'react-router-dom';

describe('<GeolinkControls />', () => {
  let props = {
    geolinkStore: {
      toggleNetwork: jest.fn(),
      toggleTraffic: jest.fn(),
      toggleAlerts: jest.fn(),
      toggleWeather: jest.fn(),
      searchMap: jest.fn(),
      resetLayerToggles: jest.fn(),
      showAddLocationForm: jest.fn(),
      loadFavorites: jest.fn(),
      selectFavorite: jest.fn(),
      values: {
        locationName: '',
        locationAddress: ''
      }
    }
  }

  describe('renders', () => {
    test('matches snapshot when enabled and disabled', () => {
      let component, tree;

      props.geolinkStore.authIsComplete = false;
      props.disabled = true;
      component = renderer.create(<MemoryRouter>
        <GeolinkControls {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.geolinkStore.authIsComplete = false;
      props.disabled = false;
      component = renderer.create(<MemoryRouter>
        <GeolinkControls {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.geolinkStore.authIsComplete = true;
      props.disabled = false;
      component = renderer.create(<MemoryRouter>
        <GeolinkControls {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('matches snapshot when dropdown is showing', () => {
      let component, tree;

      props.geolinkStore.predictedFavorites = [
        { favoriteName: 'Sapient Corporation', locationFavoriteAddress: '40 Fulton Street, New York, NY' },
        { favoriteName: 'Williamsburg', locationFavoriteAddress: 'Bedford Ave, Brooklyn, NY' }
      ]

      props.geolinkStore.dropdownIsVisible = true;
      component = renderer.create(<MemoryRouter>
        <GeolinkControls {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('UI interaction', () => {
    test('toggling first checkbox results in geolink store action call about Network', () => {
      let component = TestUtils.renderIntoDocument(<MemoryRouter><GeolinkControls {...props} /></MemoryRouter>);

      //determine the function to spy on
      const functionToWatch = props.geolinkStore.toggleNetwork;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        if(ReactDOM.findDOMNode(inst) && ReactDOM.findDOMNode(inst).getAttribute('type')) {
          return ReactDOM.findDOMNode(inst).getAttribute('type') == 'checkbox';
        }
      })[0];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('toggling second checkbox results in geolink store action call about Weather', () => {
      let component = TestUtils.renderIntoDocument(<MemoryRouter><GeolinkControls {...props} /></MemoryRouter>);

      //determine the function to spy on
      const functionToWatch = props.geolinkStore.toggleWeather;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        if(ReactDOM.findDOMNode(inst) && ReactDOM.findDOMNode(inst).getAttribute('type')) {
          return ReactDOM.findDOMNode(inst).getAttribute('type') == 'checkbox';
        }
      })[1];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('toggling third checkbox results in geolink store action call about Traffic', () => {
      let component = TestUtils.renderIntoDocument(<MemoryRouter><GeolinkControls {...props} /></MemoryRouter>);

      //determine the function to spy on
      const functionToWatch = props.geolinkStore.toggleTraffic;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        if(ReactDOM.findDOMNode(inst) && ReactDOM.findDOMNode(inst).getAttribute('type')) {
          return ReactDOM.findDOMNode(inst).getAttribute('type') == 'checkbox';
        }
      })[2];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('toggling fourth checkbox results in geolink store action call about Alerts', () => {
      let component = TestUtils.renderIntoDocument(<MemoryRouter><GeolinkControls {...props} /></MemoryRouter>);
      props.geolinkStore.authIsComplete = true;

      //determine the function to spy on
      const functionToWatch = props.geolinkStore.toggleAlerts;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        if(ReactDOM.findDOMNode(inst) && ReactDOM.findDOMNode(inst).getAttribute('type')) {
          return ReactDOM.findDOMNode(inst).getAttribute('type') == 'checkbox';
        }
      })[3];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('able to search geolink store', () => {

    });

    test('displaying controls loads list of favorites', () => {
      //determine the function to spy on
      const functionToWatch = props.geolinkStore.loadFavorites;

      //trigger the action
      TestUtils.renderIntoDocument(<MemoryRouter><GeolinkControls {...props} /></MemoryRouter>);

      expect(functionToWatch).toHaveBeenCalled();
    });
  });
});
