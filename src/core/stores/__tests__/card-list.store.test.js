jest.unmock('axios');
jest.unmock('lodash');
jest.unmock('../card-list.store');
jest.unmock('react-router-dom');
jest.unmock('history/createBrowserHistory');

import { apiService } from '../../services/api.service';
import { history } from '../../services/history.service';
import { cardListStore } from '../card-list.store';

const store = cardListStore;
// set your store here, you're testing actions against the store, not the store itself

describe("FilterStore", () => {

  beforeAll(() => {
    store.searchResults = [{title: "one", custom_metadata: {user_segment: [1]}, isRecommended: true},
      {title: "two", custom_metadata: {user_segment: ["FIRE & RESCUE"]}, isRecommended: false},
      {title: "three", custom_metadata: {user_segment: ["LAW ENFORCEMENT"]}, isRecommended: false},
      {title: "four", custom_metadata: {user_segment: ["EMERGENCY MANAGEMENT"]}, isRecommended: false},
      {title: "five", custom_metadata: {user_segment: [1]}, isRecommended: true},
      {title: "six", custom_metadata: {user_segment: ["HAZMAT DISPATCH"]}, isRecommended: false}];
  });

  test("is not filtered initially", () => {
    expect(store.filteredSearchResults.length).toBe(6)
    expect(store.isFiltered).toBe(false);
  });

  test("filters list after applying filter", () => {
    store.changeSegmentFilter("FIRE & RESCUE");
    expect(store.filteredSearchResults.length).toBe(1);
  });

  test("is filtered after applying filter", () => {
    expect(store.isFiltered).toBe(true);
  });

});

describe("CardListStore", () => {

    // will run once before everything
    beforeAll(() => {
      store.searchResults = [{title: "one", custom_metadata: {user_segment: [1]}, isRecommended: true},
        {title: "two", custom_metadata: {user_segment: ["FIRE & RESCUE"]}, isRecommended: false},
        {title: "three", custom_metadata: {user_segment: ["LAW ENFORCEMENT"]}, isRecommended: false},
        {title: "four", custom_metadata: {user_segment: ["EMERGENCY MANAGEMENT"]}, isRecommended: false},
        {title: "five", custom_metadata: {user_segment: [1]}, isRecommended: true},
        {title: "six", custom_metadata: {user_segment: ["HAZMAT DISPATCH"]}, isRecommended: false}];

        store.segments = [
          {display: '', name: 'FIRE & RESCUE'},
          {display: '', name: 'LAW ENFORCEMENT'},
          {display: '', name: 'HAZMAT DISPATCH'},
          {display: '', name: 'EMERGENCY MANAGEMENT'},
          {display: '', name: 'recommended'},
        ]
    });

    // will run once after everything
    afterAll(() => {
        clearStore();
    });

    test("has things in it", () => {
        expect(store.searchResults.length).toBe(6);
    });

    test("Homepage Cards has the right segments", () => {
      expect(Object.keys(store.homepageCards).length).toBe(5)
      expect(store.homepageCards['FIRE & RESCUE'][0].title).toBe("two");
      expect(store.homepageCards['LAW ENFORCEMENT'][0].title).toBe("three");
      expect(store.homepageCards['EMERGENCY MANAGEMENT'][0].title).toBe("four");
      expect(store.homepageCards['HAZMAT DISPATCH'][0].title).toBe("six");
      expect(store.homepageCards['recommended'].length).toBe(2);
    })
});

describe("SearchStore", () => {

  beforeAll(() => {
    store.clearFilters();
    store.searchResults = [{title: "one", user_segment: [1], isRecommended: true}]
    history.push = jest.fn();
  });

  test("accepts input", () => {
    let testText = "gibberish";
    store.handleInput(testText);
    expect(store.searchQuery).toBe(testText);
  });

  test("gets search results successfully", () => {
    expect(store.searchResults).toBeTruthy();
  });

  test("calculates populated result set size", () => {
    expect(store.numSearchResults).toBe(1);
  });

  test("displays search component", () => {
    store.searchIconClick();
    expect(store.searchIsVisible).toBe(true);
  });

  test("hides search component", () => {
    store.handleClose();
    expect(store.searchIsVisible).toBe(false);
    expect(store.searchQuery).toBeFalsy();
  });

});
