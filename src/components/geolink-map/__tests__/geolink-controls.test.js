jest.unmock('../geolink-controls');

// unmocking because we want to test all the way down the chain.
jest.unmock('../../toggle/checkbox');

import GeolinkControls from '../geolink-controls';
import { MemoryRouter } from 'react-router-dom';

describe('<GeolinkControls />', () => {
  let props = {
    geolinkStore: {
      addAllNetworkLayers: jest.fn(),
      removeAllNetworkLayers: jest.fn(),
      toggleTraffic: jest.fn(),
      toggleAlerts: jest.fn(),
      addWeather: jest.fn(),
      removeWeather: jest.fn(),
      updateSearchTerm: jest.fn(),
      searchMap: jest.fn()
    }
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      const component = renderer.create(<GeolinkControls {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('UI interaction', () => {
    test('toggling network checkbox results in geolink store action calls', () => {
      let component = TestUtils.renderIntoDocument(<GeolinkControls {...props} />);

      //determine the function to spy on
      const functionToWatch1 = component.props.geolinkStore.addAllNetworkLayers;
      const functionToWatch2 = component.props.geolinkStore.removeAllNetworkLayers;
      expect(functionToWatch1).not.toHaveBeenCalled();
      expect(functionToWatch2).not.toHaveBeenCalled();

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('id') == 'network-toggle';
      })[0];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'type': 'checkbox'}});
      expect(functionToWatch1).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});
      expect(functionToWatch2).toHaveBeenCalled();
    });

    test('toggling weather checkbox results in geolink store action calls', () => {
      let component = TestUtils.renderIntoDocument(<GeolinkControls {...props} />);

      //determine the function to spy on
      const functionToWatch1 = component.props.geolinkStore.addWeather;
      const functionToWatch2 = component.props.geolinkStore.removeWeather;
      expect(functionToWatch1).not.toHaveBeenCalled();
      expect(functionToWatch2).not.toHaveBeenCalled();

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('id') == 'weather-toggle';
      })[0];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'type': 'checkbox'}});
      expect(functionToWatch1).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});
      expect(functionToWatch2).toHaveBeenCalled();
    });

    test('toggling alerts checkbox results in geolink store action calls', () => {
      let component = TestUtils.renderIntoDocument(<GeolinkControls {...props} />);

      //determine the function to spy on
      const functionToWatch = component.props.geolinkStore.toggleAlerts;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('id') == 'alerts-toggle';
      })[0];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('toggling traffic checkbox results in geolink store action calls', () => {
      let component = TestUtils.renderIntoDocument(<GeolinkControls {...props} />);

      //determine the function to spy on
      const functionToWatch = component.props.geolinkStore.toggleTraffic;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('id') == 'traffic-toggle';
      })[0];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('clicking search button results in geolink store action call', () => {
      let component = TestUtils.renderIntoDocument(<GeolinkControls {...props} />);

      //determine the function to spy on
      const functionToWatch = component.props.geolinkStore.searchMap;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const button = TestUtils.findAllInRenderedTree(component, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('type') == 'button';
      })[0];

      TestUtils.Simulate.click(button);
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('pressing enter in search field results in geolink store action call', () => {
      let component = TestUtils.renderIntoDocument(<GeolinkControls {...props} />);

      //determine the function to spy on
      const functionToWatch = component.props.geolinkStore.searchMap;

      //trigger the action
      const textField = TestUtils.findAllInRenderedTree(component, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('id') == 'geo-search';
      })[0];

      TestUtils.Simulate.keyPress(textField, {'key': 'Enter'});
      expect(functionToWatch).toHaveBeenCalled();
    });
  });
});
