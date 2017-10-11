jest.unmock('../checkbox-list');

import CheckboxList from '../checkbox-list';

describe('<CheckboxList />', () => {
  let props = {
    dataObject: {
      key: []
    },
    id: 'key',
    children: []
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<CheckboxList {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.children = ['1','2'];
      component = renderer.create(<CheckboxList {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.required = true;
      component = renderer.create(<CheckboxList {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
