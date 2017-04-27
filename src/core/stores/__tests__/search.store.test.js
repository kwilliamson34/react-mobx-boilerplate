jest.unmock('axios');
jest.unmock('lodash');
jest.unmock('../search.store');

import { history } from '../../services/history.service';
import { searchStore } from '../search.store';
import { apiService } from '../../services/api.service';

const store = searchStore;
// set your store here, you're testing actions against the store, not the store itself
store.searchResults = null;

// over ride the API call with an instantly resolved promise
apiService.getSearchResults = (query) => {
  return new Promise((resolve) => {
    return resolve(["one lone element"]);
})};

describe("SearchStore", () => {

    test("search button is disabled by default", () => {
      expect(store.searchButtonIsEnabled).toBe(false);
    });

    test("accepts input", () => {
      let testText = "gibberish";
      store.handleInput(testText);
      expect(store.searchQuery).toBe(testText);
    });

    test("search button is enabled after text is entered", () => {
      expect(store.searchButtonIsEnabled).toBe(true);
    });

    test("clears input", () => {
      store.clear();
      expect(store.searchQuery).toBe('');
    });

    test("gets search results", () => {
      store.getSearchResults().then((response) => {
        expect(store.searchResults).toBeTruthy();
      });
    });

    test("calculates populated result set size", () => {
      store.getSearchResults().then((response) => {
        expect(store.numSearchResults).toBe(1);
      });
    });

    test("clears search results", () => {
      store.reset();
      expect(store.searchResults).toBeNull();
    });

    test("calculates empty result set size", () => {
      expect(store.numSearchResults).toBe(0);
    });

    test("search displays", () => {
      store.searchIconClick();
      expect(store.searchIsVisible).toBe(true);
    });

    test("search hides", () => {
      store.handleClose();
      expect(store.searchIsVisible).toBe(false);
    });

});
