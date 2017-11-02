jest.unmock('../radio-group');

import RadioGroup from '../radio-group';

describe('<RadioGroup />', () => {
  let props = {
    dataObject: {
      key: ''
    },
    id: 'key',
    labelText: 'testLabel',
    optionsList: [{title: 'option 1'}, {title: 'option 2'}]
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component, tree;

      props.disabled = true;
      component = renderer.create(<RadioGroup {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.disabled = false;
      component = renderer.create(<RadioGroup {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.helperText = 'dummy helper text';
      component = renderer.create(<RadioGroup {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.required = true;
      component = renderer.create(<RadioGroup {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('error state', () => {
    test('detects functional error', () => {
      let component, tree;

      props.required = false;
      component = TestUtils.renderIntoDocument(<RadioGroup {...props}/>);
      expect(component.hasFunctionalError).toBe(false);

      props.required = true;
      component = TestUtils.renderIntoDocument(<RadioGroup {...props}/>);
      expect(component.hasFunctionalError).toBe(true);
    });

    test('shows error on blur', () => {
      let component, tree;
      props.required = true;
      component = TestUtils.renderIntoDocument(<RadioGroup {...props}/>);
      expect(component.hasFunctionalError).toBe(true);
      expect(component.hasVisibleError).toBe(false);

      component.handleOnBlur();
      expect(component.hasVisibleError).toBe(true);
    });

    test('shows error on change', () => {
      let component, tree;
      props.required = true;
      component = TestUtils.renderIntoDocument(<RadioGroup {...props}/>);
      expect(component.hasFunctionalError).toBe(true);
      expect(component.hasVisibleError).toBe(false);

      component.handleOnChange({target: {value: ''}});
      expect(component.hasVisibleError).toBe(true);
    });
  });
});
