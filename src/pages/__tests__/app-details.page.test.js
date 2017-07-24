jest.unmock('axios');
jest.unmock('../../core/stores/master.store');
jest.unmock('../app-details.page');

import {observer, inject} from 'mobx-react';
import {appCatalogStore} from '../../core/stores/app-catalog.store';
import {mdmStore} from '../../core/stores/mdm.store';
import {userStore} from '../../core/stores/user.store';
import AppDetailsPage from '../app-details.page';

describe('<AppDetailsPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        appCatalogStore,
        mdmStore,
        userStore
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

    test('matches snapshot when showing 0, 1, and many MDM alerts', () => {
      let component, tree;
      props.store.appCatalogStore.fetchAppCatalog = () => {return new Promise(resolve => resolve())};

      props.store.mdmStore.app_alerts.length = 0;
      component = renderer.create(<AppDetailsPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.mdmStore.app_alerts.length = 1;
      component = renderer.create(<AppDetailsPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.mdmStore.app_alerts.length = 3;
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
        }
      };
      props.store.mdmStore.pseMDMObject = {
        toJS: () => {return {mdm_type: 'test'} }
      };
      props.store.mdmStore.appCatalogMDMStatuses = {
        toJS: () => {return {mdm_type: 'test'} }
      };
      component = renderer.create(<AppDetailsPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
