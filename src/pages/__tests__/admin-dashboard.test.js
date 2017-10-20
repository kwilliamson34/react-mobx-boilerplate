
jest.unmock('../../core/stores/user.store');
jest.unmock('../admin-dashboard.page');

import {observer, inject} from 'mobx-react';
import {userStore} from '../../core/stores/user.store';
import AdminDashboard from '../admin-dashboard.page';
import {MemoryRouter} from 'react-router-dom';

describe('<AdminDashboard />', () => {
  let props = {
    store: {
      userStore
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
