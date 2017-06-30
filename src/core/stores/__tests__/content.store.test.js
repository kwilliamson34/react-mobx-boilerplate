jest.unmock('../content.store');
jest.unmock('react-router-dom');
jest.unmock('../../../content/faq-data.json');

import { contentStore } from '../content.store';
import { faqs } from '../../../content/faq-data.json';

const store = contentStore;

describe("FilterStore", () => {

    // Change this when actual FAQs are added to the file
    test("is not filtered initially", () => {
        expect(store.filteredFaqEntries.length).toBe(store.faqs.entries.length)
        expect(store.faqCategoryFilter).toBe('ALL');
    });

    test("filters list after applying filter", () => {
        store.updateFilter(store.faqs.categories[0]);
        let newFilterCount = store.faqs.entries.filter(faq => faq.category.toUpperCase() === store.faqs.categories[0].toUpperCase()).length;
        expect(store.filteredFaqEntries.length).toBe(newFilterCount);
        expect(store.faqCategoryFilter).toBe(store.faqs.categories[0].toUpperCase());
    });

    test("filters all functionality working", () => {
        store.updateFilter('ALL');
        expect(store.filteredFaqEntries.length).toBe(store.faqs.entries.length)
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