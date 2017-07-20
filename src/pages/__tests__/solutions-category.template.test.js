jest.unmock('axios');
jest.unmock('../../core/stores/master.store');
jest.unmock('../solutions-category.template');

import {observer, inject} from 'mobx-react';
import {externalLinkStore} from '../../core/stores/external-link.store';
import SolutionsCategoryTemplate from '../solutions-category.template';
import {MemoryRouter} from 'react-router-dom';

describe('<SolutionsCategoryTemplate />', () => {
  describe('render', () => {
    let props = {
      store: {
        externalLinkStore
      },
      match: {
        params: {}
      }
    }

    props.store.externalLinkStore.currentCategory = 'match';
    props.match.params.solutionCategory = 'match';

    let card = {
      promo_title: 'title',
      promo_image_url: 'url',
      promo_description: 'description'
    }

    test('matches snapshot with zero, one and many cards', () => {
      let component, tree;
      props.store.externalLinkStore.currentSolutionCategoryData = {
        cards: []
      };

      component = renderer.create(<SolutionsCategoryTemplate {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.externalLinkStore.currentSolutionCategoryData.cards = [card];
      component = renderer.create(<MemoryRouter>
        <SolutionsCategoryTemplate { ...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.externalLinkStore.currentSolutionCategoryData.cards = [card, card, card, card, card];
      component = renderer.create(<MemoryRouter>
        <SolutionsCategoryTemplate { ...props}/>
      </MemoryRouter>);
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
          solutionCategory: 'category'
        }
      }
    }

    test('displays if the category has been retrieved', () => {
      let component, tree;
      props.store.externalLinkStore.fetchAndShowSolutionCategory = jest.fn();

      props.store.externalLinkStore.allSolutionDetails = [{},{}];
      component = renderer.create(<MemoryRouter>
        <SolutionsCategoryTemplate { ...props}/>
      </MemoryRouter>);

      expect(props.store.externalLinkStore.fetchAndShowSolutionCategory).toBeCalled();
    });

    test('fetches if the category is missing', () => {
      let component, tree;
      props.store.externalLinkStore.getSolutionDetails = jest.fn();
      props.store.externalLinkStore.getSolutionDetails.mockReturnValue(new Promise(resolve => resolve()));

      props.store.externalLinkStore.allSolutionDetails = [];
      component = renderer.create(<MemoryRouter>
        <SolutionsCategoryTemplate { ...props}/>
      </MemoryRouter>);

      expect(props.store.externalLinkStore.getSolutionDetails).toBeCalled();
      expect(props.store.externalLinkStore.getSolutionDetails).resolves;
    });
  });

});
