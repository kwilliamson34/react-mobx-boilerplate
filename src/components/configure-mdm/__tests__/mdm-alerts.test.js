jest.unmock('../mdm-alerts');

import {MDMAlerts} from '../mdm-alerts';

describe('<MDMAlerts />', () => {
  let props = {
    store: {
      removeAlert: jest.fn(),
      alert_msgs: []
    }
  }

  let exampleError = {
    type: 'error',
    headline: 'Error: ',
    message: 'Please correct the errors below.'
  };

  describe('renders', () => {
    test('renders with no alerts', () => {
      let component = renderer.create(<MDMAlerts {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders with one alert', () => {
      props.store.alert_msgs.push(exampleError);
      let component = renderer.create(<MDMAlerts {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders with many alerts', () => {
      props.store.alert_msgs.push(exampleError);
      props.store.alert_msgs.push(exampleError);
      props.store.alert_msgs.push(exampleError);
      props.store.alert_msgs.push(exampleError);
      let component = renderer.create(<MDMAlerts {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
