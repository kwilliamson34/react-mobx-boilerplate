import { action, observable } from 'mobx';
import { apiService } from '../services/api.service';

class AppStore {

  @action getAppAvailability() {

    const query = {};
    apiService.getAppAvailability(query)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.warn(error);

      });
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