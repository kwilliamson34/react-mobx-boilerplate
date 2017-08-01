jest.unmock('../air-watch-form');
jest.unmock('axios');
jest.unmock('mobx');
jest.unmock('../../../core/stores/mdm.store');

import {mdmStore} from '../../../core/stores/mdm.store';
import {AirWatchForm} from '../air-watch-form';

describe('<AirWatchForm />', () => {
  let props = {
    renderFormInput: jest.fn()
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<AirWatchForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('displays an error when any field is empty', () => {
      mdmStore.formData.aw_hostName = '';
      let component = renderer.create(<AirWatchForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.aw_tenantCode = '';
      component = renderer.create(<AirWatchForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.aw_userName = '';
      component = renderer.create(<AirWatchForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.aw_password = '';
      component = renderer.create(<AirWatchForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
