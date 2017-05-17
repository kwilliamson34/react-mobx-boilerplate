jest.unmock('../app-management-block');

// unmocking because we want to test all the way down the chain.
jest.unmock('../../toggle/checkbox');

import AppManagementBlock from '../app-management-block';
import { MemoryRouter } from 'react-router-dom';
import ReactDom from 'react-dom';

describe('<AppManagementBlock />', () => {
  let props = {
    app: {
      psk: 123,
      isAvailable: false,
      isRecommended: false,
    },
    appManagementActions: {
      changeAppAvailability: jest.fn(),
      changeAppRecommended: jest.fn()
    }
  };

  describe('render', () => {
    test('matches snapshots with all group combinations', () => {
      props.app.isAvailable = false;
      props.app.isRecommended = false;
      let component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.app.isAvailable = true;
      props.app.isRecommended = false;
      component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.app.isAvailable = true;
      props.app.isRecommended = true;
      component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      //this case is not allowed by the service, but testing anyway
      props.app.isAvailable = false;
      props.app.isRecommended = true;
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
      props.app.isAvailable = false;
      props.app.isRecommended = false;

      let memoryRouterComponent = TestUtils.renderIntoDocument(
        <MemoryRouter>
          <AppManagementBlock {...props} />
        </MemoryRouter>
      );

      //determine the function to spy on
      const functionToWatch = memoryRouterComponent.props.children.props.appManagementActions.changeAppAvailability;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const idToFind = 'Available-' + props.app.psk;
      const checkbox = TestUtils.findAllInRenderedTree(memoryRouterComponent, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('id') == idToFind;
      })[0];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('toggling Recommended results in a service call', () => {
      props.app.isAvailable = true;
      props.app.isRecommended = false;

      let memoryRouterComponent = TestUtils.renderIntoDocument(
        <MemoryRouter>
          <AppManagementBlock {...props} />
        </MemoryRouter>
      );

      //determine the function to spy on
      const functionToWatch = memoryRouterComponent.props.children.props.appManagementActions.changeAppRecommended;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const idToFind = 'Recommended-' + props.app.psk;
      const checkbox = TestUtils.findAllInRenderedTree(memoryRouterComponent, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('id') == idToFind;
      })[0];

      TestUtils.Simulate.click(checkbox, {'target': {'checked': true}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.click(checkbox, {'target': {'checked': false}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('toggling Available to Off when Recommended is On results in 2 service calls', () => {
      props.app.isAvailable = true;
      props.app.isRecommended = true;

      let memoryRouterComponent = TestUtils.renderIntoDocument(
        <MemoryRouter>
          <AppManagementBlock {...props} />
        </MemoryRouter>
      );

      //determine the function to spy on
      const functionToWatch1 = memoryRouterComponent.props.children.props.appManagementActions.changeAppAvailability;
      const functionToWatch2 = memoryRouterComponent.props.children.props.appManagementActions.changeAppRecommended;

      //trigger the action
      const idToFind = 'Available-' + props.app.psk;
      const checkbox = TestUtils.findAllInRenderedTree(memoryRouterComponent, (inst) => {
        return ReactDOM.findDOMNode(inst).getAttribute('id') == idToFind;
      })[0];
      TestUtils.Simulate.click(checkbox, {'target': {'checked': false}});

      //assert an outcome
      expect(functionToWatch1).toHaveBeenCalled();
      expect(functionToWatch2).toHaveBeenCalled();
    });
  });
});
