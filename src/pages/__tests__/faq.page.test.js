jest.unmock('axios');
jest.unmock('../../core/stores/master.store');
import {masterStore} from '../../core/stores/master.store';
const store = masterStore;

jest.unmock('../faq.page');
jest.unmock('../../components/faq/faq-main');
import FAQPage from '../faq.page';
import {FaqMain} from '../../components/faq/faq-main';

describe('<FAQPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        contentStore: {}
      }
    }

    test('matches previous snapshot', () => {
      let component = renderer.create(<FAQPage {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
