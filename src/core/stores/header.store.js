import {action, observable} from 'mobx';

class HeaderStore {

  @action toggleMainMenu() {
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
  }

  @action closeMainMenu() {
    this.mainMenuIsOpen = false;
    this.closeSubMenus();
  }

  @action toggleFooterSitemap() {
    this.footerSitemapExpanded = !this.footerSitemapExpanded;
  }

  @action closeSubMenus() {
    this.profileSubMenuIsOpen = false;
    this.adminSubMenuIsOpen = false;
    this.helpSubMenuIsOpen = false;
  }

  @action toggleProfileSubMenu() {
    const wasAlreadyOpen = this.profileSubMenuIsOpen;
    this.closeSubMenus();
    this.profileSubMenuIsOpen = !wasAlreadyOpen;
  }

  @action toggleHelpSubMenu() {
    const wasAlreadyOpen = this.helpSubMenuIsOpen;
    this.closeSubMenus();
    this.helpSubMenuIsOpen = !wasAlreadyOpen;
  }

  @action toggleAdminSubMenu() {
    const wasAlreadyOpen = this.adminSubMenuIsOpen;
    this.closeSubMenus();
    this.adminSubMenuIsOpen = !wasAlreadyOpen;
  }

  @action openAdminSubMenu() {
    this.closeSubMenus();
    this.adminSubMenuIsOpen = true;
  }

  @action closeAdminSubMenu() {
    this.adminSubMenuIsOpen = false;
  }

  @action externalTabOpen() {
    this.updateViewportDimensions();
    if (this.viewportWidth <= 991) {
      this.toggleMainMenu();
    }
    this.closeSubMenus();
  }

  @action updateViewportDimensions() {
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
  }

  @observable viewportWidth = window.innerWidth;
  @observable viewportHeight = window.innerHeight;

  @observable mainMenuIsOpen = false;
  @observable profileSubMenuIsOpen = false;
  @observable adminSubMenuIsOpen = false;
  @observable helpSubMenuIsOpen = false;
  @observable footerSitemapExpanded = false;
}

export const headerStore = new HeaderStore();
