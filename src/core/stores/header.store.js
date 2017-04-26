import { action, observable } from 'mobx';
//import { apiService } from '../services/api.service';

const $ = window.$;

class HeaderStore {

  @action toggleMainMenu (){
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
    if(this.mainMenuIsOpen){
      $('.pageMask').show();
    }else{
      $('.pageMask').hide();
    }
  }

  @observable mainMenuIsOpen = false;

}

export const headerStore = new HeaderStore();
