jest.unmock('axios');
jest.unmock('../card-list.store');

import {cardListStore} from '../card-list.store';
import {apiService} from '../../services/api.service';

const store = cardListStore;
// set your store here, you're testing actions against the store, not the store itself
store.searchResults = [];

// over ride the API call with an instantly resolved promise
apiService.getAdminApps = () => {
  return new Promise((resolve) => {
    return resolve([{
        title: "one",
        category: [1]
      },
      {
        title: "two",
        category: [2]
      },
      {
        title: "three",
        category: [3]
      },
      {
        title: "four",
        category: [4]
      },
      {
        title: "five",
        category: [1]
      },
      {
        title: "six",
        category: [5]
      }
    ]);
  })
};

// clean up after yourself
const clearStore = () => {
  store.searchResults = [];
}

describe("HomeStore", () => {
  // will run once before everything
  beforeAll(() => {
    return store.getAdminApps();
  });

  // will run once after everything
  afterAll(() => {
    clearStore();
  });

  test("has things in it", () => {
    expect(store.searchResults.length).toBe(6);
  });

  test("returns only recommended items", () => {
    expect(store.recommendedCards.length).toBe(2);
    expect(store.recommendedCards[0].title).toBe("one");
    expect(store.recommendedCards[1].title).toBe("five");
  });
});
