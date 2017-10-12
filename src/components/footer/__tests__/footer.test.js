
jest.unmock('../../../core/stores/master.store');
jest.unmock('../footer');

import {observer, inject} from 'mobx-react';
import {headerStore} from '../../../core/stores/header.store';
import {userStore} from '../../../core/stores/user.store';
import {externalLinkStore} from '../../../core/stores/external-link.store';
import {joyrideStore} from '../../../core/stores/joyride.store';
import Footer from '../footer';
import {MemoryRouter} from 'react-router-dom';

describe('<Footer />', () => {
  describe('renders', () => {
    let props = {
      store: {
        headerStore,
        userStore,
        externalLinkStore,
        joyrideStore
      }
    }

    test('matches previous footer snapshot', () => {
      const component = renderer.create(<MemoryRouter>
        <Footer {...props}/>
      </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('user role-based snapshots', () => {
      //Options: 'G_FN_IM','G_FN_ADM','G_FN_SUB','G_FN_VOL_ADM','G_FN_VOL'
      props.store.userStore.user.roles = ['G_FN_IM'];
      let component = renderer.create(<MemoryRouter>
        <Footer {...props}/>
      </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.userStore.user.roles = ['G_FN_ADM'];
      component = renderer.create(<MemoryRouter>
        <Footer {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.userStore.user.roles = ['G_FN_SUB'];
      component = renderer.create(<MemoryRouter>
        <Footer {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.userStore.user.roles = ['G_FN_VOL_ADM'];
      component = renderer.create(<MemoryRouter>
        <Footer {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.userStore.user.roles = ['G_FN_VOL'];
      component = renderer.create(<MemoryRouter>
        <Footer {...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
