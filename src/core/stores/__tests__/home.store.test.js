jest.unmock('axios');
jest.unmock('../home.store');


import { homeStore } from '../home.store';
import { apiService } from '../../services/api.service';

const store = homeStore;
// set your store here, you're testing actions against the store, not the store itself
store.homeCards = [];

// over ride the API call with an instantly resolved promise
apiService.getHomeCards = () => {return new Promise((resolve) => {
        return resolve([{title: "one", category: [1]},
                {title: "two", category: [2]},
                {title: "three", category: [3]},
                {title: "four", category: [4]},
                {title: "five", category: [1]},
                {title: "six", category: [5]}]);
})};

// just for fun, clean up after yourself
const clearStore = () => {
    store.homeCards = [];
}


describe("HomeStore", () => {

    // will run once before everything
    beforeAll(() => {
        return store.getHomeCards();
    });

    // will run once after everything
    afterAll(() => {
        clearStore();
    });

    test("has things in it", () => {
        expect(store.homeCards.length).toBe(6);
    });

    test("returns only recommended items", () => {
        expect(store.recommendedCards.length).toBe(2);
        expect(store.recommendedCards[0].title).toBe("one");
        expect(store.recommendedCards[1].title).toBe("five");
    });
    test("returns only fire items", () => {
        expect(store.fireCards.length).toBe(1);
        expect(store.fireCards[0].title).toBe("two");
    });
    test("returns only law items", () => {
        expect(store.lawCards.length).toBe(1);
        expect(store.lawCards[0].title).toBe("three");
    });
    test("returns only emergency items", () => {
        expect(store.emergencyCards.length).toBe(1);
        expect(store.emergencyCards[0].title).toBe("four");
    });
    test("returns only dispatch items", () => {
        expect(store.dispatchCards.length).toBe(1);
        expect(store.dispatchCards[0].title).toBe("six");
    });

});