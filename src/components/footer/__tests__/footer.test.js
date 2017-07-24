jest.unmock('axios');
jest.unmock('../../../core/stores/master.store');
jest.unmock('../footer');

import {observer, inject} from 'mobx-react';
import {headerStore} from '../../../core/stores/header.store';
import {userStore} from '../../../core/stores/user.store';
import {externalLinkStore} from '../../../core/stores/external-link.store';
import Footer from '../footer';
import {MemoryRouter} from 'react-router-dom';

describe('<Footer />', () => {
  describe('renders', () => {
    let props = {
      store: {
        headerStore,
        userStore,
        externalLinkStore
      }
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
