jest.unmock('axios');
jest.unmock('../../core/stores/master.store');
jest.unmock('../manage-apps.page');
jest.unmock('../../components/card-list/card-list');
jest.unmock('jquery');

import {observer, inject} from 'mobx-react';
import {cardListStore} from '../../core/stores/card-list.store';
import {appCatalogStore} from '../../core/stores/app-catalog.store';
import {mdmStore} from '../../core/stores/mdm.store';
import {userStore} from '../../core/stores/user.store';
import ManageAppsPage from '../manage-apps.page';
import {MemoryRouter} from 'react-router-dom';
import {utilsService} from '../../core/services/utils.service';

describe('<ManageAppsPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        cardListStore,
        appCatalogStore,
        mdmStore,
        userStore,
        pages: ['manageAppsPage']
      }
    }

    props.store.userStore.user.pse = '';
    props.store.cardListStore.filteredSearchResults = [];
    props.store.mdmStore.app_alerts = [];

    props.store.mdmStore.pseMDMObject = {};
    props.store.mdmStore.pseMDMObject.toJS = jest.fn();
    props.store.mdmStore.pseMDMObject.toJS.mockReturnValue({mdm_type: 'mdm-type'});

    props.store.mdmStore.appCatalogMDMStatuses = {};
    props.store.mdmStore.appCatalogMDMStatuses.toJS = jest.fn();

    test('matches previous snapshot', () => {
      let component, tree;

      //default
      props.store.cardListStore.filteredSearchResults = [];
      props.store.mdmStore.app_alerts = [];
      component = renderer.create(<MemoryRouter>
          <ManageAppsPage {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      //with alerts
      props.store.mdmStore.app_alerts = [{},{}];
      component = renderer.create(<MemoryRouter>
          <ManageAppsPage {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      //with cards
      props.store.cardListStore.filteredSearchResults = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
      component = renderer.create(<MemoryRouter>
          <ManageAppsPage {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('API', () => {
    let props = {
      store: {
        cardListStore,
        appCatalogStore,
        mdmStore,
        userStore,
        pages: {
          manageAppsPage: 0
        }
      }
    }

    props.store.userStore.user.pse = '';
    props.store.cardListStore.filteredSearchResults = [];
    props.store.mdmStore.app_alerts = [];

    props.store.mdmStore.pseMDMObject = {};
    props.store.mdmStore.pseMDMObject.toJS = jest.fn();
    props.store.mdmStore.pseMDMObject.toJS.mockReturnValue({mdm_type: 'mdm-type'});

    props.store.mdmStore.appCatalogMDMStatuses = {};
    props.store.mdmStore.appCatalogMDMStatuses.toJS = jest.fn();
    props.store.mdmStore.appCatalogMDMStatuses.toJS.mockReturnValue({});

    test('does fetch if PSE is populated', () => {
      props.store.userStore.user.pse = '123';

      props.store.mdmStore.getMDMConfiguration = jest.fn();
      props.store.appCatalogStore.fetchAppCatalog = jest.fn();
      props.store.cardListStore.fetchCategoriesAndSegments = jest.fn();
      props.store.registerPage = jest.fn();

      let component = renderer.create(<MemoryRouter>
          <ManageAppsPage {...props} />
      </MemoryRouter>);

      expect(props.store.mdmStore.getMDMConfiguration).toBeCalled();
      expect(props.store.appCatalogStore.fetchAppCatalog).toBeCalled();
      expect(props.store.cardListStore.fetchCategoriesAndSegments).toBeCalled();
    });

    test('initializes pagination if necessary', () => {
      props.store.userStore.user.pse = '123';
      props.store.pages['manageAppsPage'] = undefined;
      props.store.registerPage = jest.fn();

      let component = TestUtils.renderIntoDocument(<MemoryRouter>
          <ManageAppsPage {...props} />
      </MemoryRouter>);

      expect(props.store.registerPage).toBeCalled();
    });

    test('restores app list and resets pagination on button click', () => {
      props.store.cardListStore.filteredSearchResults = [];
      props.store.cardListStore.restoreOriginalList = jest.fn();
      props.store.resetPage = jest.fn();
      props.store.cardListStore.resetIdToFocus = jest.fn();

      let component = TestUtils.renderIntoDocument(<MemoryRouter>
          <ManageAppsPage {...props} />
      </MemoryRouter>);

      const button = TestUtils.findAllInRenderedTree(component, (inst) => {
        if(ReactDOM.findDOMNode(inst) && ReactDOM.findDOMNode(inst).getAttribute('id')) {
          return ReactDOM.findDOMNode(inst).getAttribute('id') == 'view-all-apps-button';
        }
      })[0];

      TestUtils.Simulate.click(button);
      expect(props.store.cardListStore.restoreOriginalList).toBeCalled();
      expect(props.store.resetPage).toBeCalled();
      expect(props.store.cardListStore.resetIdToFocus).toBeCalled();
    });

    test('loads more apps on button click', () => {
      let card = {
        app_psk: '123',
        name: 'name'
      }
      props.store.cardListStore.filteredSearchResults = [card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card,card];
      props.store.pages['manageAppsPage'] = 1;

      props.store.changePage = jest.fn();
      props.store.cardListStore.setIdToFocus = jest.fn();

      let component = TestUtils.renderIntoDocument(<MemoryRouter>
          <ManageAppsPage {...props} />
      </MemoryRouter>);

      const button = TestUtils.findAllInRenderedTree(component, (inst) => {
        if(ReactDOM.findDOMNode(inst) && ReactDOM.findDOMNode(inst).getAttribute('id')) {
          return ReactDOM.findDOMNode(inst).getAttribute('id') == 'card-list-load-more-btn';
        }
      })[0];

      TestUtils.Simulate.click(button);
      expect(props.store.changePage).toBeCalled();
      expect(props.store.cardListStore.setIdToFocus).toBeCalled();
    });
  });
});
