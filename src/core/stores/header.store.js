import { action, observable } from 'mobx';
//import { apiService } from '../services/api.service';

class HeaderStore {

	@action toggleMainMenu() {
		this.mainMenuIsOpen = !this.mainMenuIsOpen;
	}

	@action toggleFooterSitemap() {
		this.footerSitemapExpanded = !this.footerSitemapExpanded;
	}

	@action getLastPSE() {
		let storedPSE = localStorage.getItem('pse-homepage_lastViewedPSE');

		this.currentPSEName = storedPSE ? this.pse_list[storedPSE] : this.pse_list[0];
	}

	@action updatePSE(val) {
		if(val>=0){
			localStorage.setItem('pse-homepage_lastViewedPSE', val);
			this.currentPSEName = this.pse_list[val];
		}
	}

	@action updateWindowDimensions() {
		this.windowDimensions = {
			width: window.innerWidth,
			height: window.innerHeight
		}
		if(this.windowDimensions.width > 991){
			this.currentBreakpoint = 'desktop';
		}else if(this.windowDimensions.width >= 768){
			this.currentBreakpoint = 'tablet';
		}else{
			this.currentBreakpoint = 'mobile';
		}
	}

	@observable windowDimensions = {
		width: window.innerWidth,
		height: window.innerHeight
  };

	@observable currentBreakpoint = '';
	@observable mainMenuIsOpen = false;
	@observable footerSitemapExpanded = false;

	@observable currentPSEName = 'Fire & Rescue Station 32';
	@observable pse_list = ['Fire & Rescue Station 32','Fire Station 12','Fire & Rescue Station 24','Fire Station 6','Fire Station 10']

}

export const headerStore = new HeaderStore();
