
jest.unmock('../../core/stores/master.store');
jest.unmock('../solutions-details.template');

import {observer, inject} from 'mobx-react';
import {externalLinkStore} from '../../core/stores/external-link.store';
import SolutionsDetailsTemplate from '../solutions-details.template';

describe('<SolutionsDetailsTemplate />', () => {
  describe('render', () => {
    let props = {
      store: {
        externalLinkStore
      },
      match: {
        params: {}
      }
    }

    props.store.externalLinkStore.currentSolutionDetail = {
      path: 'match'
    };
    props.store.externalLinkStore.currentPurchasingInfo = 'info';
    props.match.params.solutionCategory = 'match';
    props.match.params.solutionDetail = 'match';

    let card = {
      promo_title: 'title',
      promo_image_url: 'url',
      promo_description: 'description'
    }

    test('matches snapshot', () => {
      let component, tree;

      component = renderer.create(<SolutionsDetailsTemplate {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('API', () => {
    let props = {
      store: {
        externalLinkStore
      },
      match: {
        params: {
          solutionCategory: 'category',
          solutionDetail: 'detail'
        }
      }
    }

    test('displays if the details have been retrieved', () => {
      let component, tree;
      props.store.externalLinkStore.fetchSolutionDetails = jest.fn();

      props.store.externalLinkStore.allSolutionDetails = [{},{}];
      component = renderer.create(<SolutionsDetailsTemplate { ...props}/>);

      expect(props.store.externalLinkStore.fetchSolutionDetails).toBeCalled();
    });

    test('fetches if the details are missing', () => {
      let component, tree;
      props.store.externalLinkStore.getSolutionDetails = jest.fn();
      props.store.externalLinkStore.getSolutionDetails.mockReturnValue(new Promise(resolve => resolve()));

      props.store.externalLinkStore.allSolutionDetails = [];
      component = renderer.create(<SolutionsDetailsTemplate { ...props}/>);

      expect(props.store.externalLinkStore.getSolutionDetails).toBeCalled();
      expect(props.store.externalLinkStore.getSolutionDetails).resolves;
    });
  });

});
