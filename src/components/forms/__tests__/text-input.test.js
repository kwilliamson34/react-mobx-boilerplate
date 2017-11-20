jest.unmock('../text-input');

import TextInput from '../text-input';

describe('<TextInput />', () => {
  let props = {
    dataObject: {
      key: ''
    },
    id: 'key',
    type: 'input'
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      props.type = 'textarea';
      let component = renderer.create(<TextInput {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.type = 'search';
      component = renderer.create(<TextInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.type = 'input';
      component = renderer.create(<TextInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.showClearButton = true;
      props.dataObject['key'] = 'testvalue';
      component = renderer.create(<TextInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.handleSubmit = jest.fn();
      props.submitIcon = 'icon-search';
      component = renderer.create(<TextInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.required = true;
      component = renderer.create(<TextInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.disabled = true;
      component = renderer.create(<TextInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
