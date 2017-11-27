jest.unmock('../modal');

import Modal from '../modal';

describe('<Modal />', () => {
  let props = {
    id: 'test-modal',
    title: 'Test Modal',
    primaryAction: jest.fn()
  }

  describe('render', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<Modal {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      let children = (<p>This is the first child.</p>);
      component = renderer.create(<Modal {...props}>{children}</Modal>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.secondaryAction = jest.fn();
      component = renderer.create(<Modal {...props}>{children}</Modal>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    test('shows and hides', () => {
      let component = TestUtils.renderIntoDocument(<Modal {...props}/>);
      component.showModal();
      expect(component.show).toBe(true);
      component.hideModal();
      expect(component.show).toBe(false);
      component.toggleModal();
      expect(component.show).toBe(true);
      component.toggleModal();
      expect(component.show).toBe(false);
    });

    test('hides when the escape key is pressed', () => {
      let component = TestUtils.renderIntoDocument(<Modal {...props}/>);
      component.hideModal = jest.fn();
      component.showModal();
      component.onKeyDown({keyCode: 27});
      expect(component.hideModal).toHaveBeenCalled();
    });
  });
});
