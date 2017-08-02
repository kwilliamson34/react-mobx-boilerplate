jest.unmock('../card-list');
jest.unmock('axios');

// unmocking because we want to test all the way down the chain. If you ONLY want to test card-list, leave these mocked, but that defeats the purpose of testing
jest.unmock('../../summary-card/summary-card');
jest.unmock('../../rating/rating');

import {CardList} from '../card-list';
import {MemoryRouter} from 'react-router-dom';

describe('<CardList />', () => {
  let card = {
    display: {
      name: 'NAME ERROR',
      publisher: 'PUBLISHER ERROR',
      imageUrl: '../../images/app-icon.png',
      rating: 0,
      badge: '',
      platform: '',
    },
    events: {
      link: '#'
    }
  }
  let props = {
    filteredAppsCount: 2,
    cards: [],
    itemsPerPage: 20,
    changeAppAvailability: jest.fn(),
    changeAppRecommended: jest.fn(),
    getMatchingApp: jest.fn(),
    pushToMDM: jest.fn(),
    appCatalogMDMStatuses: {
      123: ''
    }
  };
  let component, tree;

  describe('renders', () => {
    test('matches snapshot with zero, one, and many cards', () => {
      let component, tree;

      props.cards = [];
      component = renderer.create(<MemoryRouter>
        <CardList { ...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.cards = [card];
      component = renderer.create(<MemoryRouter>
        <CardList { ...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.cards = [card, card, card, card, card];
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('matches snapshot before and after loading', () => {
      let component, tree;

      props.isLoading = true;
      component = renderer.create(<MemoryRouter>
        <CardList { ...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.isLoading = false;
      component = renderer.create(<MemoryRouter>
        <CardList { ...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('matches snapshot with no results', () => {
      let component, tree;

      component = renderer.create(<MemoryRouter>
        <CardList { ...props}/>
      </MemoryRouter>);
      component.showNoResultsBlock = true;
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  //TODO: test can-load-more functionality
});
