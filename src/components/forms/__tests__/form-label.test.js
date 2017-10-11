jest.unmock('../form-label');

import FormLabel from '../form-label';

describe('<FormLabel />', () => {
  let props = {
    id: 'id',
    labelText: 'testLabel'
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<FormLabel {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.helperText = 'helper text';
      component = renderer.create(<FormLabel {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.fieldIsRequired = true;
      component = renderer.create(<FormLabel {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.hasError = true;
      component = renderer.create(<FormLabel {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.srOnly = true;
      component = renderer.create(<FormLabel {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
