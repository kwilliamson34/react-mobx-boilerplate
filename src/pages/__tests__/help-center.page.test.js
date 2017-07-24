jest.unmock('../help-center.page');
import HelpCenterPage from '../help-center.page';

describe('<HelpCenterPage />', () => {
  describe('render', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<HelpCenterPage />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
