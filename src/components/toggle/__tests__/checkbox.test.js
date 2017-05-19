jest.unmock('../checkbox');

import Checkbox from '../checkbox';

describe('<Checkbox />', () => {
  let props = {
    value: 'testVal',
    label: 'testLabel'
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      props.defaultOn = undefined;
      let component = renderer.create(<Checkbox {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.defaultOn = true;
      component = renderer.create(<Checkbox {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.defaultOn = false;
      component = renderer.create(<Checkbox {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.onChange = jest.fn();
      component = renderer.create(<Checkbox {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.disabled = true;
      component = renderer.create(<Checkbox {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.disabled = false;
      component = renderer.create(<Checkbox {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
