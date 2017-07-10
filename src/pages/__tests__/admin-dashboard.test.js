jest.unmock('../../core/stores/master.store');
import {masterStore} from '../../core/stores/master.store';
const store = masterStore;

jest.unmock('../admin-dashboard.page');

import AdminDashboard from '../admin-dashboard.page';
import {MemoryRouter} from 'react-router-dom';

describe('<AdminDashboard />', () => {
  let props = {
    externalLinkStore: {
      togglePushToTalkModal: jest.fn(),
      setPushToTalkProvider: jest.fn(),
      pushToTalkLink: 'example link',
      manageUsersLink: 'manage users link',
      manageServicesLink: 'manage services link',
      viewWirelessReportsLink: 'view reports link',
      shopStandardDevicesLink: 'shop devices link',
      showPushToTalkModal: false
    }
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<MemoryRouter>
          <AdminDashboard {...props} />
      </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.externalLinkStore.showPushToTalkModal = true;
      component = renderer.create(<MemoryRouter>
          <AdminDashboard {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
