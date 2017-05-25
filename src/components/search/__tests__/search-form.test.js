jest.unmock('../search-form');

import {SearchForm} from '../search-form';

describe('<SearchForm />', () => {
  let props = {
    store: {
      searchQuery: '',
      getSearchResults: jest.fn()
    }
  };

  test('matches previous snapshot', () => {
    let component = renderer.create(<SearchForm { ...props}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    props.store.searchQuery = 'test search';
    component = renderer.create(<SearchForm { ...props}/>);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('gives correct feedback when loading', () => {
    props.store.isLoading = true;
    const component = renderer.create(<SearchForm { ...props}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('gives correct feedback when loaded', () => {
    props.store.isLoading = false;
    props.store.searchResults = [];
    const component = renderer.create(<SearchForm { ...props}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
