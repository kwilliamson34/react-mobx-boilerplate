jest.unmock('../terms.page');
import TermsPage from '../terms.page';

describe('<TermsPage />', () => {
  describe('render', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<TermsPage />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
