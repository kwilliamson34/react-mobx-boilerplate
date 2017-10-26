
jest.unmock('../../core/stores/master.store');
jest.unmock('../app-details.page');
jest.unmock('date-fns');

import {observer, inject} from 'mobx-react';
import {appCatalogStore} from '../../core/stores/app-catalog.store';
import {mdmStore} from '../../core/stores/mdm.store';
import {userStore} from '../../core/stores/user.store';
import AppDetailsPage from '../app-details.page';
import {utilsService} from '../../core/services/utils.service';

describe('<AppDetailsPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        appCatalogStore,
        mdmStore,
        userStore
      },
      match: {
        params: {
          appPsk: '123'
        }
      }
    }

    test('matches snapshot before and after PSE is assigned', () => {
      let component, tree;
      props.store.appCatalogStore.fetchAppCatalog = () => {return new Promise(resolve => resolve())};

      props.store.userStore.user.pse === '';
      component = renderer.create(<AppDetailsPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.userStore.user.pse === '123';
      component = renderer.create(<AppDetailsPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('matches snapshot when app has not been matched yet', () => {
      let component, tree;
      props.store.appCatalogStore.fetchAppCatalog = () => {return new Promise(resolve => resolve())};

      props.store.appCatalogStore.currentAppObject = undefined;
      component = renderer.create(<AppDetailsPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.appCatalogStore.currentAppObject = {
        detailsFetched: false
      };
      component = renderer.create(<AppDetailsPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.appCatalogStore.currentAppObject = {
        detailsFetched: true,
        mobileScreenshots: [],
        tabletScreenshots: [],
        reviews: [],
        custom_metadata: {
          developer_description: '',
          developer_website: ''
        },
        version: {
          version_note: 'note',
          release_date: '20111031'
        }
      };
      props.store.mdmStore.pseMDMObject = {
        toJS: () => {return {mdm_type: 'AIRWATCH'} }
      };
      props.store.mdmStore.appCatalogMDMStatuses = {
        toJS: () => {return {mdm_type: 'AIRWATCH'} }
      };
      component = renderer.create(<AppDetailsPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('API', () => {
  let props = {
    store: {
      appCatalogStore,
      mdmStore,
      userStore
    },
    match: {
      params: {
        appPsk: '123'
      }
    }
  }

  test('maps authorizations if pse doesnt exist', () => {
    props.store.userStore.user.pse = '';
    utilsService.handlePendingAuthorizationsMapping = jest.fn();
    let component = renderer.create(<AppDetailsPage {...props}/>);
    expect(utilsService.handlePendingAuthorizationsMapping).toBeCalled();
  });

  test('fetches app catalog if missing', () => {
    props.store.appCatalogStore.allApps = [];
    props.store.userStore.user.pse = '123';
    props.store.appCatalogStore.fetchAppCatalog = jest.fn();
    props.store.appCatalogStore.fetchAppCatalog.mockReturnValue(new Promise(resolve => resolve()));
    let component = renderer.create(<AppDetailsPage {...props}/>);
    expect(props.store.appCatalogStore.fetchAppCatalog).toBeCalled();
  });

  test('fetches and updates app details if app catalog is already loaded', () => {
    props.store.appCatalogStore.allApps = [{},{}];
    props.store.userStore.user.pse = '123';
    props.store.appCatalogStore.fetchAppDetailByPsk = jest.fn();
    let component = renderer.create(<AppDetailsPage {...props}/>);
    expect(props.store.appCatalogStore.fetchAppDetailByPsk).toBeCalled();
  });
});
