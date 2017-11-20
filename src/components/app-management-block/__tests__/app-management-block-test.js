
jest.unmock('../app-management-block');
jest.unmock('../../forms/checkbox');
jest.unmock('jquery');

import AppManagementBlock from '../app-management-block';

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
      let component, tree;

      props.getMatchingApp = () => {
        return {
          isAvailable: false,
          isRecommended: false
        }
      }
      component = renderer.create(<AppManagementBlock { ...props }/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.getMatchingApp = () => {
        return {
          isAvailable: true,
          isRecommended: false
        }
      }
      component = renderer.create(<AppManagementBlock { ...props }/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.getMatchingApp = () => {
        return {
          isAvailable: true,
          isRecommended: true
        }
      }
      component = renderer.create(<AppManagementBlock { ...props }/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      //this case is not allowed by the service, but testing anyway
      props.getMatchingApp = () => {
        return {
          isAvailable: false,
          isRecommended: true
        }
      }
      component = renderer.create(<AppManagementBlock { ...props }/>);
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
      let component = TestUtils.renderIntoDocument(<AppManagementBlock {...props} />);

      //determine the function to spy on
      const functionToWatch = component.props.changeAppAvailability;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        if(ReactDOM.findDOMNode(inst) && ReactDOM.findDOMNode(inst).getAttribute('id'))
          return ReactDOM.findDOMNode(inst).getAttribute('id') === 'Available-123';
      })[0];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('toggling Recommended results in a service call', () => {
      props.getMatchingApp = () => {
        return {
          isAvailable: true,
          isRecommended: false
        }
      }
      let component = TestUtils.renderIntoDocument(<AppManagementBlock {...props} />);

      //determine the function to spy on
      const functionToWatch = component.props.changeAppRecommended;
      expect(functionToWatch).not.toHaveBeenCalled();

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        if(ReactDOM.findDOMNode(inst) && ReactDOM.findDOMNode(inst).getAttribute('id'))
          return ReactDOM.findDOMNode(inst).getAttribute('id') === 'Recommended-123';
      })[0];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': true, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});
      expect(functionToWatch).toHaveBeenCalled();
    });

    test('toggling Available to Off when Recommended is On results in 2 service calls', () => {
      props.getMatchingApp = () => {
        return {
          isAvailable: true,
          isRecommended: true
        }
      }
      let component = TestUtils.renderIntoDocument(<AppManagementBlock {...props} />);

      //trigger the action
      const checkbox = TestUtils.findAllInRenderedTree(component, (inst) => {
        if(ReactDOM.findDOMNode(inst) && ReactDOM.findDOMNode(inst).getAttribute('id'))
          return ReactDOM.findDOMNode(inst).getAttribute('id') === 'Available-123';
      })[0];

      TestUtils.Simulate.change(checkbox, {'target': {'checked': false, 'type': 'checkbox'}});

      //assert an outcome
      expect(component.props.changeAppAvailability).toHaveBeenCalled();
      expect(component.props.changeAppRecommended).toHaveBeenCalled();
    });
  });
});
