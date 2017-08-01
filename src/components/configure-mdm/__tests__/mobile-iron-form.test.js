jest.unmock('../mobile-iron-form');
jest.unmock('axios');
jest.unmock('mobx');
jest.unmock('../../../core/stores/mdm.store');

import {mdmStore} from '../../../core/stores/mdm.store';
import {MobileIronForm} from '../mobile-iron-form';

describe('<MobileIronForm />', () => {
  let props = {
    renderFormInput: jest.fn()
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<MobileIronForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('displays an error when any field is empty', () => {
      mdmStore.formData.mi_hostName = '';
      let component = renderer.create(<MobileIronForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.mi_userName = '';
      component = renderer.create(<MobileIronForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.mi_password = '';
      component = renderer.create(<MobileIronForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
