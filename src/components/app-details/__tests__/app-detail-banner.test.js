jest.unmock('../app-detail-banner');
jest.unmock('date-fns');
jest.unmock('axios');

jest.unmock('../../push-to-mdm/push-to-mdm');
jest.unmock('../../forms/checkbox');

import {AppDetailBanner} from '../app-detail-banner';

describe('<AppDetailBanner /> ', () => {

  let props = {
    appCatalogStore: {
      getMatchingApp: jest.fn(),
      setCurrentApp: jest.fn(),
      fetchAppDetailByPsk: jest.fn(),
      changeAppAvailability: jest.fn(),
      changeAppRecommended: jest.fn(),
      currentAppObject: {
        rating: 5,
        reviews_count: 1,
        app_name: 'Vampire Finder 3000',
        app_psk: '12345',
        platform: 'IOS',
        version: {
          author: 'Tiny Rick',
          version_num: '1.8.2'
        },
        custom_metadata: {
          release_date: '2017-07-14T15:30:08+00:00'
        }
      },
      configuredMDMType: 'airwatch',
      pushToMDM:  jest.fn(),
      appCatalogMDMStatuses: {
        12345: 'NOT_INSTALLED'
      }
    }
  }

  describe('render tests', () => {
    test('matches snapshot when app is NOT_INSTALLED', () => {
      const component = renderer.create(
        <AppDetailBanner {...props} />
      )

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('matches snapshot when app is INSTALLED', () => {
      props.appCatalogStore.appCatalogMDMStatuses[12345] = 'INSTALLED';

      const component = renderer.create(
        <AppDetailBanner {...props} />
      )

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('matches snapshot when configuredMDMType is falsey', () => {
      props.appCatalogStore.configuredMDMType = '';

      const component = renderer.create(
        <AppDetailBanner {...props} />
      )

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
