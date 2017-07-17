jest.unmock('../privacy.page');
import PrivacyPage from '../privacy.page';

describe('<PrivacyPage />', () => {
  describe('render', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<PrivacyPage />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
