import { action, observable } from 'mobx';
//import { apiService } from '../services/api.service';

class HeaderStore {

  @action toggleMainMenu (){
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
    if(this.mainMenuIsOpen){
      console.log('hi');
    }
  }

  @observable mainMenuIsOpen = false;

}

export const headerStore = new HeaderStore();
