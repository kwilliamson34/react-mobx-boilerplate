import { observable, action, computed } from 'mobx';
import { apiService } from '../services/api.service';
import _ from 'lodash';

class SearchStore {

  @action clear() {
    this.searchQuery = '';
  }

  @action getSearchResults = _.debounce(() => {

    if(this.searchQuery === ''){
      console.log("clear")
      this.searchResults = null;
      return;
    }

    const success = (response) => {
      this.searchResults = response;
      this.finishLoading();
    }

    const failure = (error) => {
      console.warn(error);
      this.searchResults = [];
      this.finishLoading();
    }

    this.isLoading = true;
    apiService.getSearchResults(this.searchQuery)
      .then(success, failure)
  }, 500, { leading: true, trailing: false });

  @action finishLoading() {
    this.isLoading = false;
  }

  @action handleInput(value) {
    this.searchQuery = value;
  }

  @computed get searchButtonIsEnabled() {
    // return this.searchQuery !== '';
    return true;
  }

  @observable searchQuery = '';
  @observable searchResults = null;
  @observable isLoading = false;

  // @observable categories = ['a', 'b', 'c'];
  // @observable categoryFilter = this.categories[0];
  // @observable segments = ['d', 'e', 'f'];
  // @observable segmentFilter = this.segments[0];
}

export const searchStore = new SearchStore();
