jest.unmock('../../core/stores/master.store');
jest.unmock('../../core/stores/external-link.store');
jest.unmock('../../core/stores/lead-capture.store');
jest.unmock('../../core/services/utils.service');
jest.unmock('../solutions-details.template');

import {observer, inject} from 'mobx-react';
import {externalLinkStore} from '../../core/stores/external-link.store';
import {leadCaptureStore} from '../../core/stores/lead-capture.store';
import {appCatalogStore} from '../../core/stores/app-catalog.store';
import SolutionsDetailsTemplate from '../solutions-details.template';
import {MemoryRouter} from 'react-router-dom';
import {utilsService} from '../../core/services/utils.service';

describe('<SolutionsDetailsTemplate />', () => {
  let props = {
    store: {
      externalLinkStore,
      leadCaptureStore,
      appCatalogStore
    },
    match: {
      params: {
        solutionCategory: 'category1',
        solutionDetail: 'detail1'
      }
    }
  }

  describe('render', () => {
    props.store.externalLinkStore.currentSolutionName = 'detail1';
    let card = {
      promo_title: 'title',
      promo_image_url: 'url',
      promo_description: 'description'
    }

    test('matches snapshot', () => {
      let component, tree;

      component = renderer.create(<MemoryRouter>
          <SolutionsDetailsTemplate {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders lead capture section', () => {
      let component, tree;

      //normal
      props.store.leadCaptureStore.showSuccess = false;
      component = renderer.create(<MemoryRouter>
          <SolutionsDetailsTemplate {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      //after success
      props.store.leadCaptureStore.showSuccess = true;
      component = renderer.create(<MemoryRouter>
          <SolutionsDetailsTemplate {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      //disabled
      props.store.leadCaptureStore.solutionName = 'mobileiron';
      utilsService.getCookie = jest.fn().mockReturnValue('[mobileiron,airwatch]')
      component = renderer.create(<MemoryRouter>
          <SolutionsDetailsTemplate {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders related app section', () => {
      let component, tree;
      // props.store.externalLinkStore.allSolutionDetails = [{}, {}];
      props.store.externalLinkStore.hasValidRelatedApp = jest.fn().mockReturnValue(true);
      props.store.appCatalogStore = {
        currentAppObject: {
          detailsFetched: true
        }
      };

      component = renderer.create(<MemoryRouter>
          <SolutionsDetailsTemplate {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders purchasing info section', () => {
      let component, tree;
      props.store.externalLinkStore.getSolutionDetails = jest.fn().mockReturnValue(new Promise(resolve => resolve()));
      props.store.externalLinkStore.currentSolutionDetail = {
        contact_name: 'name',
        constact_phone: 'phone'
      };

      component = renderer.create(<MemoryRouter>
          <SolutionsDetailsTemplate {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('API', () => {
    test('fetches if the details are missing', () => {
      let component, tree;
      props.store.externalLinkStore.getSolutionDetails = jest.fn().mockReturnValue(new Promise(resolve => resolve()));
      props.store.externalLinkStore.currentSolutionName = 'detail2';

      props.store.externalLinkStore.allSolutionDetails = [];
      component = renderer.create(<MemoryRouter>
          <SolutionsDetailsTemplate {...props} />
      </MemoryRouter>);

      expect(props.store.externalLinkStore.getSolutionDetails).toBeCalled();
      expect(props.store.externalLinkStore.getSolutionDetails).resolves;
    });
  });

});
