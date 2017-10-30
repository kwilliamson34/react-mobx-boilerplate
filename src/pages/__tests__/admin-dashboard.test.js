jest.unmock('../admin-dashboard.page');

import {observer, inject} from 'mobx-react';
import AdminDashboard from '../admin-dashboard.page';
import {MemoryRouter} from 'react-router-dom';

describe('<AdminDashboard />', () => {
  let props = {
    store: {
      userStore: {}
    }
  }

  describe('renders', () => {
    test('basic render', () => {
      let component, tree;
      props.store.userStore.destinationIsPermitted = {};

      component = renderer.create(<MemoryRouter>
          <AdminDashboard {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('render with aside', () => {
      let component, tree;
      props.store.userStore.destinationIsPermitted = {
        shopStandardDevices: true,
        shopSpecializedDevices: true,
        shopPublicSafetySolutions: true
      };

      component = renderer.create(<MemoryRouter>
          <AdminDashboard {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('render with 2 cards', () => {
      let component, tree;
      props.store.userStore.destinationIsPermitted = {
        manageUsers: true,
        manageApps: true
      };

      component = renderer.create(<MemoryRouter>
          <AdminDashboard {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('render with 3 cards', () => {
      let component, tree;
      props.store.userStore.destinationIsPermitted = {
        manageApps: true,
        manageBilling: true,
        manageVoicemail: true
      };

      component = renderer.create(<MemoryRouter>
          <AdminDashboard {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('render with 4 cards', () => {
      let component, tree;
      props.store.userStore.destinationIsPermitted = {
        manageApps: true,
        manageBilling: true,
        manageVoicemail: true,
        viewReports: true
      };

      component = renderer.create(<MemoryRouter>
          <AdminDashboard {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('render with 5 cards', () => {
      let component, tree;
      props.store.userStore.destinationIsPermitted = {
        manageUsers: true,
        manageApps: true,
        manageBilling: true,
        manageVoicemail: true,
        viewReports: true
      };

      component = renderer.create(<MemoryRouter>
          <AdminDashboard {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
