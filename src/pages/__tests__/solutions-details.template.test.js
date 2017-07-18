jest.unmock('axios');
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

    test('matches snapshot with and without purchasing info', () => {
      let component, tree;

      component = renderer.create(<SolutionsDetailsTemplate {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.externalLinkStore.showPurchasingInfo = true;
      component = renderer.create(<SolutionsDetailsTemplate { ...props}/>);
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

    //.match.params.solutionCategory
    test('displays if the category matches', () => {
      let component, tree;
      props.store.externalLinkStore.fetchAndShowSolutionDetails = jest.fn();

      props.store.externalLinkStore.allSolutionDetails = [{},{}];
      component = renderer.create(<SolutionsDetailsTemplate { ...props}/>);

      expect(props.store.externalLinkStore.fetchAndShowSolutionDetails).toBeCalled();
    });

    test('fetches if the category is missing', () => {
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
