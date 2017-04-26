jest.unmock('../search');

import { Search } from '../search';

describe('<Search />', () => {
    test('matches previous snapshot', () => {
      let props = {
        store: {
          searchIsVisible: true
        }
      };
      const component = renderer.create(
          <Search {...props} />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('gives correct feedback when loading', () => {
      let props = {
        store: {
          searchIsVisible: true,
          isLoading: true
        }
      };
      const component = renderer.create(
          <Search {...props} />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('gives correct feedback when loaded', () => {
      let props = {
        store: {
          searchIsVisible: true,
          isLoading: false,
          searchResults: []
        }
      };
      const component = renderer.create(
          <Search {...props} />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('accepts input', () => {
      let props = {
        store: {
          searchIsVisible: true,
          isLoading: false,
          searchQuery: "asdf"
        }
      };
      const component = renderer.create(
          <Search {...props} />
      );
      
      // TODO change input value here

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
});
