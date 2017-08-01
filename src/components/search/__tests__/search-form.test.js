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

  test('handleInput works as expected', () => {
    props.store.handleSearchInput = jest.fn();

    let component = TestUtils.renderIntoDocument(<SearchForm {...props} />);
    let input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
    TestUtils.Simulate.change(input);

    expect(props.store.handleSearchInput).toHaveBeenCalled();
  });

  test('handleSubmit works as expected', () => {
    props.resetPagination = jest.fn();
    props.store.getSearchResults = jest.fn();
    const event = {preventDefault: jest.fn()};
    let component;

    props.store.searchQuery = '';
    component = TestUtils.renderIntoDocument(<SearchForm {...props} />);
    component.handleSubmit(event);
    expect(props.resetPagination).toHaveBeenCalled();
    expect(props.store.getSearchResults).toHaveBeenCalled();

    props.store.searchQuery = 'blah';
    component = TestUtils.renderIntoDocument(<SearchForm {...props} />);
    component.handleSubmit(event);
    expect(props.resetPagination).toHaveBeenCalled();
    expect(props.store.getSearchResults).toHaveBeenCalled();
  });

  test('handleClearClick works as expected', () => {
    props.resetPagination = jest.fn();
    props.store.clearSearchQuery = jest.fn();

    let component = TestUtils.renderIntoDocument(<SearchForm {...props} />);

    component.handleClearClick();
    expect(props.resetPagination).toHaveBeenCalled();
    expect(props.store.clearSearchQuery).toHaveBeenCalled();
  });
});
