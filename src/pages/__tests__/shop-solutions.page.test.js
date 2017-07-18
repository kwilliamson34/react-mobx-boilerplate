jest.unmock('axios');
jest.unmock('../../core/stores/master.store');
jest.unmock('../shop-solutions.page');

import {observer, inject} from 'mobx-react';
import {externalLinkStore} from '../../core/stores/external-link.store';
import ShopSolutionsPage from '../shop-solutions.page';
import {MemoryRouter} from 'react-router-dom';

describe('<ShopSolutionsPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        externalLinkStore
      }
    }
    let card = {
      name: 'name',
      thumbnail_url: 'url',
      thumbnail_alt: 'alt',
      description: 'description'
    }

    test('matches snapshot with zero, one and many cards', () => {
      let component, tree;

      component = renderer.create(<ShopSolutionsPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.externalLinkStore.solutionCategories = [card];
      component = renderer.create(<MemoryRouter>
        <ShopSolutionsPage { ...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.externalLinkStore.solutionCategories = [card, card, card, card, card];
      component = renderer.create(<MemoryRouter>
        <ShopSolutionsPage { ...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
