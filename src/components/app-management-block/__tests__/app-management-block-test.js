jest.unmock('../app-management-block');

// unmocking because we want to test all the way down the chain.
jest.unmock('../../toggle/checkbox');

import AppManagementBlock from '../app-management-block';
import { MemoryRouter } from 'react-router-dom';
import ReactDom from 'react-dom';

describe('<AppManagementBlock />', () => {
  let props = {
    psk: 123,
    changeAppAvailability: jest.fn(),
    changeAppRecommended: jest.fn(),
    getMatchingApp: () => {
      return {
        isAvailable: false,
        isRecommended: false
      }
    }
  };

  describe('render', () => {
    test('matches snapshots with all group combinations', () => {
      props.getMatchingApp = () => {
        return {
          isAvailable: false,
          isRecommended: false
        }
      }
      let component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.getMatchingApp = () => {
        return {
          isAvailable: true,
          isRecommended: false
        }
      }
      component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.getMatchingApp = () => {
        return {
          isAvailable: true,
          isRecommended: true
        }
      }
      component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      //this case is not allowed by the service, but testing anyway
      props.getMatchingApp = () => {
        return {
          isAvailable: false,
          isRecommended: true
        }
      }
      component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('UI interaction', () => {
    test('toggling Available results in a service call', () => {
      props.getMatchingApp = () => {
        return {
          isAvailable: false,
          isRecommended: false
        }
      }

      let memoryRouterComponent = TestUtils.renderIntoDocument(
        <MemoryRouter>
          <AppManagementBlock {...props} />
        </MemoryRouter>
      );

      //determine the function to spy on
      const functionToWatch = memoryRouterComponent.props.children.props.changeAppAvailability;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const idToFind = 'Available-' + props.psk;
      const checkbox = TestUtils.findAllInRenderedTree(memoryRouterComponent, (inst) => {
        console.log(ReactDOM.findDOMNode(inst).getAttribute('checked'));
        return ReactDOM.findDOMNode(inst).getAttribute('id') == idToFind;
      })[0];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'target': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'target': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('toggling Recommended results in a service call', () => {
      props.getMatchingApp = () => {
        return {
          isAvailable: true,
          isRecommended: false
        }
      }

      let memoryRouterComponent = TestUtils.renderIntoDocument(
        <MemoryRouter>
          <AppManagementBlock {...props} />
        </MemoryRouter>
      );

      //determine the function to spy on
      const functionToWatch = memoryRouterComponent.props.children.props.changeAppRecommended;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const idToFind = 'Recommended-' + props.psk;
      const checkbox = TestUtils.findAllInRenderedTree(memoryRouterComponent, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('id') == idToFind;
      })[0];

      TestUtils.Simulate.click(checkbox, {'target': {'checked': true, 'target': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.click(checkbox, {'target': {'checked': false, 'target': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('toggling Available to Off when Recommended is On results in 2 service calls', () => {
      props.getMatchingApp = () => {
        return {
          isAvailable: true,
          isRecommended: true
        }
      }

      let memoryRouterComponent = TestUtils.renderIntoDocument(
        <MemoryRouter>
          <AppManagementBlock {...props} />
        </MemoryRouter>
      );

      //determine the function to spy on
      const functionToWatch1 = memoryRouterComponent.props.children.props.changeAppAvailability;
      const functionToWatch2 = memoryRouterComponent.props.children.props.changeAppRecommended;

      //trigger the action
      const idToFind = 'Available-' + props.psk;
      const checkbox = TestUtils.findAllInRenderedTree(memoryRouterComponent, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('id') == idToFind;
      })[0];
      TestUtils.Simulate.click(checkbox, {'target': {'checked': false, 'target': 'checkbox'}});

      //assert an outcome
      expect(functionToWatch1).toHaveBeenCalled();
      expect(functionToWatch2).toHaveBeenCalled();
    });
  });
});
