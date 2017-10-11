jest.unmock('../select-input');

import SelectInput from '../select-input';

describe('<SelectInput />', () => {
  let props = {
    dataObject: {
      key: ''
    },
    id: 'key',
    optionList: []
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<SelectInput {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.optionList = [{title: 'option 1', value: '1'}];
      component = renderer.create(<SelectInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.optionList = [{title: 'option 1', value: '1'},{title: 'option 2', value: '2'},{title: 'option 3', value: '3'}];
      component = renderer.create(<SelectInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.placeholder = 'Placeholder';
      component = renderer.create(<SelectInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.disabled = true;
      component = renderer.create(<SelectInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.required = true;
      component = renderer.create(<SelectInput {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
