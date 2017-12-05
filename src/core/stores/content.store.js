import {observable, action, computed} from 'mobx';
import {faqs} from '../../content/faq-data.json';
import {userStore} from './user.store';
import _ from 'lodash';

class ContentStore {

  @action updateFilter(filter) {
    this.activeCategory = filter;
  }

  @computed get permissionedCategories() {
    return faqs.categories.filter(category => {
      return _.intersection(category.permissions, userStore.user.roles).length > 0;
    });
  }

  @computed get filteredFaqEntries() {
    if (this.activeCategory === 'All') {
      return faqs.entries.filter(faq => this.permissionedCategories.map(category => category.title).indexOf(faq.category) > -1);
    } else {
      return faqs.entries.filter(faq => faq.category === this.activeCategory);
    }
  }

  @observable activeCategory = 'All';
}

export const contentStore = new ContentStore();
