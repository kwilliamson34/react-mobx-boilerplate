jest.unmock('../search');

import { Search } from '../search';

describe('<Search />', () => {
    test('matches previous snapshot', () => {
      let props = {
        store: {}
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
