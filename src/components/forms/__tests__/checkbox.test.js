jest.unmock('../checkbox');

import Checkbox from '../checkbox';

describe('<Checkbox />', () => {
  let props = {
    value: 'testVal',
    label: 'testLabel',
    handleOnChange: jest.fn()
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

      props.tooltipText = 'dummy text';
      component = renderer.create(<Checkbox {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('error state', () => {
    test('detects functional error', () => {
      let component, tree;

      props.required = false;
      props.checked = false;
      component = TestUtils.renderIntoDocument(<Checkbox {...props}/>);
      component.hasBeenVisited = true;
      expect(component.hasFunctionalError).toBe(false);

      props.required = true;
      component = TestUtils.renderIntoDocument(<Checkbox {...props}/>);
      expect(component.hasFunctionalError).toBe(true);
    });

    test('shows error on blur', () => {
      let component, tree;
      props.required = true;
      props.checked = false;
      component = TestUtils.renderIntoDocument(<Checkbox {...props}/>);
      component.hasBeenVisited = false;
      expect(component.hasFunctionalError).toBe(true);
      expect(component.hasVisibleError).toBe(false);

      component.handleOnBlur({target: {checked: false}});
      expect(component.hasBeenVisited).toBe(true);
      expect(component.hasVisibleError).toBe(true);
    });

    test('shows error on change', () => {
      let component, tree;
      props.required = true;
      props.checked = false;
      component = TestUtils.renderIntoDocument(<Checkbox {...props}/>);
      component.hasBeenVisited = false;
      expect(component.hasFunctionalError).toBe(true);
      expect(component.hasVisibleError).toBe(false);

      component.handleOnChange({target: {checked: false}});
      expect(component.hasBeenVisited).toBe(true);
      expect(component.hasVisibleError).toBe(true);
    });
  });
});
