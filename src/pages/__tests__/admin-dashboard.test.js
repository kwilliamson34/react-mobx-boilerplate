jest.unmock('axios');
jest.unmock('../../core/stores/external-link.store');
jest.unmock('../admin-dashboard.page');

import {observer, inject} from 'mobx-react';
import {externalLinkStore} from '../../core/stores/external-link.store';
import AdminDashboard from '../admin-dashboard.page';
import {MemoryRouter} from 'react-router-dom';

describe('<AdminDashboard />', () => {
  let props = {
    store: {
      externalLinkStore
    }
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component, tree;

      component = renderer.create(<MemoryRouter>
          <AdminDashboard {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
