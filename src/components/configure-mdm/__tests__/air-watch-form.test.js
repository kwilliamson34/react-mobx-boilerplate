jest.unmock('../air-watch-form');

import {AirWatchForm} from '../air-watch-form';

describe('<AirWatchForm />', () => {
  let props = {
    store: {},
    connectionSet: false,
    formData: {}
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<AirWatchForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.connectionSet = true;
      component = renderer.create(<AirWatchForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('displays an error when any field is empty', () => {
      props.formData.aw_hostName = '';
      let component = renderer.create(<AirWatchForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.aw_tenantCode = '';
      component = renderer.create(<AirWatchForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.aw_userName = '';
      component = renderer.create(<AirWatchForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.aw_password = '';
      component = renderer.create(<AirWatchForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
