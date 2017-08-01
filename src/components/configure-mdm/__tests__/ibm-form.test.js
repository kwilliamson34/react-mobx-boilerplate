jest.unmock('../ibm-form');
jest.unmock('axios');
jest.unmock('mobx');
jest.unmock('../../../core/stores/mdm.store');

import {mdmStore} from '../../../core/stores/mdm.store';
import {IBMForm} from '../ibm-form';

describe('<IBMForm />', () => {
  let props = {
    renderFormInput: jest.fn()
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<IBMForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('displays an error when any field is empty', () => {
      mdmStore.formData.ibm_rootURL = '';
      let component = renderer.create(<IBMForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.ibm_billingID = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.ibm_userName = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.ibm_password = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.ibm_platformID = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.ibm_appID = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.ibm_appVersion = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      mdmStore.formData.ibm_appAccessKey = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
