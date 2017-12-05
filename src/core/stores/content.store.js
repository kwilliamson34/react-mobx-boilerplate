import {observable, action} from 'mobx';
import {faqs} from '../../content/faq-data.json';

class ContentStore {
  // @action toggleFaqPageHeaderButton(isOnFaqPage) {
  //   this.onFaqPage = Boolean(isOnFaqPage);
  // }

  @action updateFilter(filter) {
    console.log('filter', filter);
    this.faqCategoryFilter = filter;

    if (filter === 'ALL') {
      this.filteredFaqEntries = this.faqs.entries;
    } else {
      this.filteredFaqEntries = this.faqs.entries.filter(faq => faq.category === filter);
    }
  }

  @observable faqs = faqs;
  // @observable onFaqPage = false;
  @observable faqCategoryFilter = 'ALL';
  @observable filteredFaqEntries = this.faqs.entries;
}

export const contentStore = new ContentStore();
