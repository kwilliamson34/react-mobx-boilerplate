import {observable, action} from 'mobx';
import {faqs} from '../../content/faq-data.json';

class ContentStore {
  @observable faqs = faqs;
  @observable onFaqPage = false;
  @observable faqCategoryFilter = 'ALL';
  @observable filteredFaqEntries = this.faqs.entries;

  @action toggleFaqPageHeaderButton(isOnFaqPage) {
    this.onFaqPage = Boolean(isOnFaqPage);
  }

  @action updateFilter(filter) {
    this.faqCategoryFilter = filter;

    if (filter === 'ALL') {
      this.filteredFaqEntries = this.faqs.entries;
    } else {
      this.filteredFaqEntries = this.faqs.entries.filter(faq => faq.category === filter);
    }
  }
}

export const contentStore = new ContentStore();
