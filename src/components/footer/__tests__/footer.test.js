jest.unmock('axios');
jest.unmock('../../../core/stores/master.store');
import {masterStore} from '../../../core/stores/master.store';
const store = masterStore;

jest.unmock('../footer');

import Footer from '../footer';
import {MemoryRouter} from 'react-router-dom';

describe('<Footer />', () => {
  describe('renders', () => {
    let props = {
      store: {}
    }

    test('matches previous footer snapshot', () => {
      const component = renderer.create(<MemoryRouter>
        <Footer {...props}/>
      </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
