jest.unmock('../accessibility.page');
import AccessibilityPage from '../accessibility.page';

describe('<AccessibilityPage />', () => {
  describe('render', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<AccessibilityPage />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
