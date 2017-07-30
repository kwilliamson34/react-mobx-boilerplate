jest.unmock('../mdm-alerts');

import {MDMAlerts} from '../mdm-alerts';

describe('<MDMAlerts />', () => {
  let props = {
    store: {
      removeAlert: jest.fn(),
      clearAppsReferencedByAlert: jest.fn()
    },
    alertList: [],
    clearSelectedCards: jest.fn()
  }

  let exampleError = {
    type: 'error',
    headline: 'Error: ',
    message: 'Please correct the errors below.'
  };

  describe('renders', () => {
    test('renders with zero, one, and many alerts', () => {
      let component, tree;

      component = renderer.create(<MDMAlerts {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.alertList.push(exampleError);
      component = renderer.create(<MDMAlerts {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.alertList.push(exampleError);
      props.alertList.push(exampleError);
      props.alertList.push(exampleError);
      props.alertList.push(exampleError);
      component = renderer.create(<MDMAlerts {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders as expected on different pages', () => {
      let component, tree;

      component = renderer.create(<MDMAlerts {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.page = 'mdm_form';
      props.store.mdm_form_alerts = props.store.alert_msgs;
      component = renderer.create(<MDMAlerts {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.page = 'manage_apps';
      props.store.manage_apps_alerts = props.store.alert_msgs;
      component = renderer.create(<MDMAlerts {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('User interaction', () => {
    test('removes alert upon clicking the close button', () => {
      props.alertList = [];
      props.alertList.push(exampleError);

      let component = TestUtils.renderIntoDocument(<MDMAlerts {...props} />);

      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
      expect(buttons.length).toBe(1);
      TestUtils.Simulate.click(buttons[0]);

      expect(props.store.removeAlert).toBeCalled();
    });
  });
});
