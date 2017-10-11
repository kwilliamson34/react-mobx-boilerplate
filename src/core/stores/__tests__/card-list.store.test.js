
jest.unmock('lodash');
jest.unmock('../card-list.store');
jest.unmock('react-router-dom');
jest.unmock('history/createBrowserHistory');

import { apiService } from '../../services/api.service';
import { history } from '../../services/history.service';
import { cardListStore } from '../card-list.store';

const store = cardListStore;

let arrayOfSixApps = [
  {title: "one", category: ["cat1"], user_segment: ["FIRE & RESCUE"], platform: "ANDROID", isRecommended: true},
  {title: "two", category: ["cat1"], user_segment: ["FIRE & RESCUE","LAW ENFORCEMENT","HAZMAT"], platform: "IOS", isRecommended: false},
  {title: "three", category: ["cat1"], user_segment: ["LAW ENFORCEMENT"], platform: "IOS", isRecommended: false},
  {title: "four", category: ["cat1"], user_segment: ["EMERGENCY MANAGEMENT"], platform: "IOS", isRecommended: false},
  {title: "five", category: ["cat1","cat2"], user_segment: ["HAZMAT"], platform: "IOS", isRecommended: true},
  {title: "six", category: ["cat2"], user_segment: ["HAZMAT"], platform: "ANDROID", isRecommended: false}
];

describe("FilterStore", () => {

  beforeAll(() => {
    store.searchResults = arrayOfSixApps;
  });

  test("is not filtered or searched initially", () => {
    expect(store.filteredSearchResults.length).toBe(6)
    expect(store.searchIsApplied).toBe(false);
    expect(store.platformFilter).toBe('');
    expect(store.categoryFilter).toBe('');
    expect(store.segmentFilter).toBe('');
  });

  test("filters list after applying filter", () => {
    store.changeSegmentFilter("FIRE & RESCUE");
    expect(store.segmentFilter).toBe("FIRE & RESCUE");
    expect(store.filteredSearchResults.length).toBe(2);

    store.changeSegmentFilter("EMERGENCY MANAGEMENT");
    expect(store.segmentFilter).toBe("EMERGENCY MANAGEMENT");
    expect(store.filteredSearchResults.length).toBe(1);

    store.changeSegmentFilter("");
    store.changeCategoryFilter("cat2");
    expect(store.categoryFilter).toBe("cat2");
    expect(store.filteredSearchResults.length).toBe(2);

    store.changeCategoryFilter("");
    store.changePlatformFilter("IOS");
    expect(store.platformFilter).toBe("IOS");
    expect(store.filteredSearchResults.length).toBe(4);
  });

  test("can filter by level of recommendation", () => {
      expect(store.recommendedCards.length).toBe(2);
  });

  test("updates appropriately when user resets their filters", () => {
    store.searchResults = arrayOfSixApps;
    store.changeSegmentFilter("");
    store.changeCategoryFilter("");
    store.changePlatformFilter("");
    expect(store.filteredSearchResults.length).toBe(6);

    store.changePlatformFilter("ANDROID");
    expect(store.platformFilter).toBe("ANDROID");
    expect(store.filteredSearchResults.length).toBe(2);

    store.resetFilters();
    expect(store.platformFilter).toBe("");
    expect(store.filteredSearchResults.length).toBe(6);
    expect(store.filterIsApplied).toBe(false);
  });

});

describe("CardListStore", () => {

    // will run once before everything
    beforeAll(() => {
      store.searchResults = arrayOfSixApps;
    });

    // will run once after everything
    afterAll(() => {
        clearStore();
    });

    test("has things in it", () => {
        expect(store.searchResults.length).toBe(6);
    });

    test("updates appropriately when user clears all search and filter inputs", () => {
      store.originalCardList = arrayOfSixApps;
      store.searchResults = [];
      store.changePlatformFilter("ANDROID");
      store.changeSegmentFilter("HAZMAT");
      store.handleSearchInput("hello");

      store.restoreOriginalList();
      expect(store.platformFilter).toBe("");
      expect(store.segmentFilter).toBe("");
      expect(store.categoryFilter).toBe("");
      expect(store.searchQuery).toBe("");
      expect(store.searchIsApplied).toBe(false);
      expect(store.searchResults).toBe(arrayOfSixApps);
    });
});

describe("SearchStore", () => {

  beforeAll(() => {
    store.resetFilters();
    store.searchResults = [{title: "one", category:"cat1", user_segment: ["FIRE & RESCUE"], isRecommended: true}]
    history.push = jest.fn();
  });

  test("accepts input", () => {
    let testText = "gibberish";
    store.handleSearchInput(testText);
    expect(store.searchQuery).toBe(testText);
  });

  test("generates correct result count label", () => {
    store.isLoading = false;
    expect(store.resultsCountLabel).toBe(undefined);

    store.searchIsApplied = true;

    store.resetFilters();
    store.searchResults = [];
    expect(store.resultsCountLabel).toBe("");

    store.searchResults = [{title: "one", category:"cat1", user_segment: ["FIRE & RESCUE"], isRecommended: true}]
    expect(store.resultsCountLabel).toBe("1 Result");

    store.searchResults = arrayOfSixApps;
    expect(store.resultsCountLabel).toBe("6 Results");
  });

  test("updates appropriately when user clears their search", () => {
    store.originalCardList = arrayOfSixApps;
    store.searchIsApplied = true;
    store.searchQuery = "rescue";
    store.searchResults = [{title: "one", category:"cat1", user_segment: ["FIRE & RESCUE"], isRecommended: true}];

    store.clearSearchQuery();
    expect(store.searchQuery).toBe("");
    expect(store.searchResults).toBe(arrayOfSixApps);
    expect(store.searchIsApplied).toBe(false);
  });
});
