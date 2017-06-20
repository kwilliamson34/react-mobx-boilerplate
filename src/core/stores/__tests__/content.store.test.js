jest.unmock('../content.store');
jest.unmock('react-router-dom');

import { contentStore } from '../content.store';

const store = contentStore;

describe("FilterStore", () => {

    // Change this when actual FAQs are added to the file
    test("is not filtered initially", () => {
        expect(store.filteredFaqEntries.length).toBe(8)
        expect(store.faqCategoryFilter).toBe('ALL');
    });

    test("filters list after applying filter", () => {
        store.updateFilter('Lorem Ipsum 1');
        expect(store.filteredFaqEntries.length).toBe(2)
        expect(store.faqCategoryFilter).toBe('LOREM IPSUM 1');
    });

    test("filters all functionality working", () => {
        store.updateFilter('ALL');
        expect(store.filteredFaqEntries.length).toBe(8)
        expect(store.faqCategoryFilter).toBe('ALL');
    });

    test("on Faq Page functionality", () => {
        expect(store.onFaqPage).toBe(false);
        store.toggleFaqPageHeaderButton(true);
        expect(store.onFaqPage).toBe(true);
        store.toggleFaqPageHeaderButton(false);
        expect(store.onFaqPage).toBe(false);
    });

});