jest.unmock('../filters');

import {Filters} from '../filters';

describe('<Filters />', () => {
  let props = {
    store: {
      searchQuery: '',
      resetFilters: jest.fn(),
      changeCategoryFilter: jest.fn(),
      changeSegmentFilter: jest.fn(),
      changePlatformFilter: jest.fn(),
      categories: [],
      segments: [],
      platforms: [],
      addFilterElementRef: jest.fn()
    }
  };

  const testArray = [{title: 'title1', value: 'value1'}, {title: 'title2', value: 'value2'}];

  test('matches previous snapshot', () => {
    let component = renderer.create(<Filters { ...props}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    props.store.categories = testArray;
    component = renderer.create(<Filters { ...props}/>);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    props.store.segments = testArray;
    component = renderer.create(<Filters { ...props}/>);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    props.store.platforms = testArray;
    component = renderer.create(<Filters { ...props}/>);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('changing a filter calls the appropriate store action', () => {
    let component = renderer.create(<Filters { ...props}/>);

    expect(props.store.changeCategoryFilter).not.toHaveBeenCalled();
    component.getInstance().handleCategoryChange({target: {}});
    expect(props.store.changeCategoryFilter).toHaveBeenCalled();

    expect(props.store.changeSegmentFilter).not.toHaveBeenCalled();
    component.getInstance().handleSegmentChange({target: {}});
    expect(props.store.changeSegmentFilter).toHaveBeenCalled();

    expect(props.store.changePlatformFilter).not.toHaveBeenCalled();
    component.getInstance().handlePlatformChange({target: {}});
    expect(props.store.changePlatformFilter).toHaveBeenCalled();
  });

  test('clicking Reset Filters calls the right store action', () => {
    let component = TestUtils.renderIntoDocument(
      <Filters { ...props}/>
    );

    expect(props.store.resetFilters).not.toHaveBeenCalled();
    component.resetFilters();
    expect(props.store.resetFilters).toHaveBeenCalled();
  });
});
