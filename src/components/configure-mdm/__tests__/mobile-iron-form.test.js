jest.unmock('../mobile-iron-form');

import {MobileIronForm} from '../mobile-iron-form';

describe('<MobileIronForm />', () => {
  let props = {
    store: {},
    connectionSet: false,
    formData: {}
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<MobileIronForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.connectionSet = true;
      component = renderer.create(<MobileIronForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('displays an error when any field is empty', () => {
      props.formData.mi_hostName = '';
      let component = renderer.create(<MobileIronForm {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.mi_userName = '';
      component = renderer.create(<MobileIronForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.formData.mi_password = '';
      component = renderer.create(<MobileIronForm {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
