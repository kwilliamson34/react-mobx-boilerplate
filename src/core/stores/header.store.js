import { action, observable } from 'mobx';
//import { apiService } from '../services/api.service';

class HeaderStore {

	@action toggleMainMenu (){
		this.mainMenuIsOpen = !this.mainMenuIsOpen;
	}

	@action updatePSE (val) {
		console.log(val)
		this.currentPSE = this.pse_list[val];
	}

	@observable mainMenuIsOpen = false;
	@observable currentPSE = 'Fire & Rescue Station 32';
	@observable pse_list = ['Fire & Rescue Station 32','Fire Station 12','Fire & Rescue Station 24','Fire Station 6','Fire Station 10']

}

export const headerStore = new HeaderStore();
