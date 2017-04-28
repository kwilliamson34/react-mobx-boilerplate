import { action, observable } from 'mobx';
import { apiService } from '../services/api.service';

class AppStore {

  @action getAppAvailability() {

        const success = (res) => {
          let data = res.data;

          this.newApps = data.new_apps;
          this.notBlockedApps = data.un_blocked_apps;
          this.blockedApps = data.blocked_apps;
          this.notRecApps = data.un_recommended_apps;
          this.recApps = data.recommended_apps;
          this.notPushedApps = data.un_pushed_mdm_apps;
          this.pushedApps = data.pushed_mdm_apps;
        }
        const fail = (err) => {
            console.warn(err);
        }
        apiService.getAppAvailability().then(success, fail)
  }

  @action getAppDetails(appPSK) {
    const success = (res) => {
      console.log('AppDetailResponse:\n' + res);
    }
    const fail = (err) => {
        console.warn(err);
    }
    apiService.getAppDetails(appPSK).then(success, fail);
  }

	// OBSERVABLES
  @observable newApps = '0';
  @observable notBlockedApps = '0';
  @observable blockedApps = '0';
  @observable notRecApps = '0';
  @observable recApps = '0';
  @observable notPushedApps = '0';
  @observable pushedApps = '0';
}

export const appStore = new AppStore();
