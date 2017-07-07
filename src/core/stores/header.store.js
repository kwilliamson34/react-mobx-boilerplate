import { action, observable } from 'mobx';
import config from 'config';


class HeaderStore {

	@action toggleMainMenu() {
		this.mainMenuIsOpen = !this.mainMenuIsOpen;
	}

	@action closeMainMenu(){
		this.mainMenuIsOpen = false;
		this.closeSubMenus();
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

	@action closeSubMenus(){
		this.profileSubMenuIsOpen = false;
		this.adminSubMenuIsOpen = false;
		this.helpSubMenuIsOpen = false;
	}

	@action toggleProfileSubMenu(){
		if(this.profileSubMenuIsOpen){
			this.closeSubMenus();
		}else{
			this.closeSubMenus();
			this.profileSubMenuIsOpen = true;
		}
	}

	@action toggleAdminSubMenu(){
		if(this.adminSubMenuIsOpen){
			this.closeSubMenus();
		}else{
			this.closeSubMenus();
			this.adminSubMenuIsOpen = true;
		}
	}

	@action openAdminSubMenu() {
		this.closeSubMenus();
		this.adminSubMenuIsOpen = true;
	}

	@action closeAdminSubMenu() {
		this.adminSubMenuIsOpen = false;
	}

	@action toggleHelpSubMenu(){
		if(this.helpSubMenuIsOpen){
			this.closeSubMenus();
		}else{
			this.closeSubMenus();
			this.helpSubMenuIsOpen = true;
		}
	}

	@action externalTabOpen() {
		this.toggleMainMenu();
		this.closeSubMenus();
	}

	@action updateViewportDimensions() {
		this.viewportWidth = window.innerWidth;
		this.viewportHeight = window.innerHeight;
	}

	@observable viewportWidth = window.innerWidth;
	@observable viewportHeight = window.innerHeight;
	
	@observable ATTSupportPhone = config.attCustomerSupportPhone || '800-574-7000';
	@observable mainMenuIsOpen = false;
	@observable footerSitemapExpanded = false;

	@observable profileSubMenuIsOpen = false;
	@observable adminSubMenuIsOpen = false;
	@observable helpSubMenuIsOpen = false;

	@observable currentPSEName = 'Fire & Rescue Station 32';
	@observable pse_list = ['Fire & Rescue Station 32','Fire Station 12','Fire & Rescue Station 24','Fire Station 6','Fire Station 10']

}

export const headerStore = new HeaderStore();
