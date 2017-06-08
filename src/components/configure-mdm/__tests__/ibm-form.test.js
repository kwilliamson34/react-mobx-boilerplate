jest.unmock('../ibm-form');

import {IBMForm} from '../ibm-form';

describe('<IBMForm />', () => {
  let props = {
    store: {},
    connectionSet: false,
    formData: {}
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<IBMForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.connectionSet = true;
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('displays an error when any field is empty', () => {
      props.formData.ibm_rootURL = '';
      let component = renderer.create(<IBMForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.ibm_billingID = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.ibm_userName = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.ibm_password = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.ibm_platformID = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.ibm_appID = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.ibm_appVersion = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.ibm_appAccessKey = '';
      component = renderer.create(<IBMForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
