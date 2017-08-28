import {action, observable} from 'mobx';

class FormTemplateStore {

  @action handleSelectAll = (bool) => {
    this.selectAllButtonSelectsAll = bool;
  }

  @observable selectAllButtonSelectsAll = true;
}

export const formTemplateStore = new FormTemplateStore();
