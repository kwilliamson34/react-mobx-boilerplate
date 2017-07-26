jest.unmock('../mdm.store');
jest.unmock('axios');
jest.unmock('../../services/history.service');
jest.unmock('mobx');

import {history} from '../../services/history.service';
import {mdmStore} from '../mdm.store';
import {apiService} from '../../services/api.service';
import {observable} from 'mobx';

let store = mdmStore;

describe("MDMStore", () => {

  beforeAll(() => {
    store = mdmStore;
  });

  test("checkForChanges returns true iff the user has entered info", () => {
    store.mdmProvider = '';
    expect(store.checkForChanges()).toBe(false);

    store.mdmProvider = 'airwatch';
    store.formHasChanged = false;
    expect(store.checkForChanges()).toBe(false);

    store.formHasChanged = true;
    expect(store.checkForChanges()).toBe(true);
  });

  test("updateMDM sets the MDM and resets the form", () => {
    store.mdmProvider = 'airwatch';
    store.formIsValid = true;
    store.currentMDMForm = {
      keys: jest.fn()
    }
    store.currentMDMForm.keys.mockReturnValue([]);

    store.updateMDM('maas360');

    expect(store.mdmProvider).toBe('maas360');
    expect(store.formIsValid).toBe(false);
    expect(store.beingSubmitted).toBe(false);
    expect(store.formHasChanged).toBe(false);
    expect(store.showExitModal).toBe(false);
    expect(store.showbreakMDMConnection).toBe(false);
  });

  test("updateForm properly updates store based on a valid input", () => {
    store.currentMDMForm = observable.map({});
    store.formHasChanged = false;
    let input = {
      id: 'text-input',
      value: 'value string'
    }
    let form = {
      querySelectorAll: () => [input]
    }

    store.updateForm(input, form);

    expect(store.formHasChanged).toBe(true);
    expect(store.currentMDMForm.get('text-input')).toBe('value string');
    expect(store.formIsValid).toBe(true);
  });

  test("updateForm properly updates store based on an invalid input", () => {
    store.currentMDMForm = observable.map({});
    store.formHasChanged = false;
    let input = {
      id: 'text-input',
      value: ''
    }

    let form = {
      querySelectorAll: () => [input]
    }
    store.updateForm(input, form);
    expect(store.formHasChanged).toBe(true);
    expect(store.currentMDMForm.get('text-input')).toBe('');
    expect(store.formIsValid).toBe(false);
  });

  //TODO submitForm

  test("can remove alert based on page id and index", () => {
    store.form_alerts = ['0','1','2'];
    store.removeAlert('mdm_form', 0);
    expect(store.form_alerts[0]).toBe('1');
    expect(store.form_alerts[1]).toBe('2');
    expect(store.form_alerts[2]).toBe(undefined);

    store.app_alerts = ['0','1','2'];
    store.removeAlert('manage_apps', 1);
    expect(store.app_alerts[0]).toBe('0');
    expect(store.app_alerts[1]).toBe('2');
    expect(store.app_alerts[2]).toBe(undefined);
  });

  test("clearAlerts encompasses all pages where alerts might be shown", () => {
    store.form_alerts = [{},{},{}];
    store.app_alerts = [{}];

    store.clearAlerts();

    expect(store.form_alerts.length).toBe(0);
    expect(store.app_alerts.length).toBe(0);
  });

  test("modal toggles work correctly", () => {
    store.showExitModal = false;
    store.showbreakMDMConnection = false;

    store.toggleExitModal();
    expect(store.showExitModal).toBe(true);
    store.toggleExitModal();
    expect(store.showExitModal).toBe(false);

    store.togglebreakMDMConnection();
    expect(store.showbreakMDMConnection).toBe(true);
    store.togglebreakMDMConnection();
    expect(store.showbreakMDMConnection).toBe(false);
  });

  // test("enable/disable exit modal works correctly", () => {
  //   store.showExitModal = false;
  //   history.block = jest.fn()
  //   store.enableSaveDialogs();
  //   store.checkForChanges = true;
  //   TestUtils.Simulate.beforeUnload(window);
  //   expect(store.showExitModal).toBe(true);
  // });

  test("AIRWATCH records the right mdmProvider", () => {
    apiService.getMDMConfiguration = jest.fn();
    apiService.getMDMConfiguration.mockReturnValue(Promise.resolve({
      data: {
        mdm_type: 'AIRWATCH'
      }
    }));

    store.getMDMConfiguration().then(() => {
      expect(store.mdmProvider).toBe('airWatchForm');
    });

    apiService.getMDMConfiguration.mockReturnValue(Promise.resolve({
      data: {
        mdm_type: 'MAAS360'
      }
    }));

    store.getMDMConfiguration().then(() => {
      expect(store.mdmProvider).toBe('ibmForm');
    });

    apiService.getMDMConfiguration.mockReturnValue(Promise.resolve({
      data: {
        mdm_type: 'MOBILE_IRON'
      }
    }));

    store.getMDMConfiguration().then(() => {
      expect(store.mdmProvider).toBe('mobileIronForm');
    });
  });

  test("getMDMConfiguration pushes the right error onto the stack if fails", () => {
    store.form_alerts = [];
    apiService.getMDMConfiguration = jest.fn();
    apiService.getMDMConfiguration.mockReturnValue(Promise.reject());

    store.getMDMConfiguration().then(() => {
      expect(store.form_alerts.length).toBe(1);
      expect(store.form_alerts[0].message).toBe(store.userMessages.connectFail);
    });
  });

  test("setMDMConfiguration shows success message on success", () => {
    store.form_alerts = [];
    store.mdmProvider = 'airWatchForm';
    apiService.setMDMConfiguration = jest.fn();
    apiService.setMDMConfiguration.mockReturnValue(Promise.resolve({
      data: {
        message: 'success message'
      }
    }));

    store.setMDMConfiguration().then(() => {
      expect(store.form_alerts.length).toBe(1);
      expect(store.form_alerts[0].message).toBe('success message');
      expect(store.showExitModal).toBe(false);
      expect(store.formHasChanged).toBe(false);
      expect(store.hasBeenSubmitted).toBe(true);
    });
  });

  test("setMDMConfiguration clears out the form if fails based on credentials", () => {
    store.form_alerts = [];
    apiService.setMDMConfiguration = jest.fn();
    apiService.setMDMConfiguration.mockReturnValue(Promise.resolve({
      data: {
        error: 'this is an error about credentials'
      }
    }));

    store.mdmProvider = 'airWatchForm';
    store.currentMDMForm.aw_password = 'password';
    store.currentMDMForm.aw_userName = 'username';
    store.setMDMConfiguration().then(() => {
      expect(store.currentMDMForm.aw_password).toBe('');
      expect(store.currentMDMForm.aw_userName).toBe('');
    });

    store.mdmProvider = 'ibmForm';
    store.currentMDMForm.ibm_password = 'password';
    store.currentMDMForm.ibm_userName = 'username';
    store.setMDMConfiguration().then(() => {
      expect(store.currentMDMForm.ibm_password).toBe('');
      expect(store.currentMDMForm.ibm_userName).toBe('');
    });

    store.mdmProvider = 'mobileIronForm';
    store.currentMDMForm.mi_password = 'password';
    store.currentMDMForm.mi_userName = 'username';
    store.setMDMConfiguration().then(() => {
      expect(store.currentMDMForm.mi_password).toBe('');
      expect(store.currentMDMForm.mi_userName).toBe('');
    });
  });

  test("setMDMConfiguration pushes the right error onto the stack if fails", () => {
    store.form_alerts = [];
    apiService.setMDMConfiguration = jest.fn();
    apiService.setMDMConfiguration.mockReturnValue(Promise.reject());

    store.setMDMConfiguration().then(() => {
      expect(store.form_alerts.length).toBe(1);
      expect(store.form_alerts[0].message).toBe(store.userMessages.connectFail);
    });
  });

  test("breakMDMConnection resets form on success", () => {
    const psk = "123";
    apiService.breakMDMConfiguration = jest.fn();
    apiService.breakMDMConfiguration.mockReturnValue(Promise.resolve());
    store.resetMDMForm = jest.fn();

    store.breakMDMConnection(psk).then(() => {
      expect(store.resetMDMForm).toHaveBeenCalled();
    });
  });

  test("breakMDMConnection pushes the right error onto the stack if fails", () => {
    const psk = "123";
    store.form_alerts = [];
    apiService.breakMDMConfiguration = jest.fn();
    apiService.breakMDMConfiguration.mockReturnValue(Promise.reject());

    store.breakMDMConnection().then(() => {
      expect(store.form_alerts.length).toBe(1);
      expect(store.form_alerts[0].message).toBe(store.userMessages.breakConnectionFail);
    });
  });

  test("getMDMStatus sets all statuses on success", () => {
    apiService.getAdminApps = jest.fn();
    apiService.getAdminApps.mockReturnValue(Promise.resolve());
    store.setMDMStatus = jest.fn();

    store.getMDMStatus().then(() => {
      expect(store.setMDMStatus).toHaveBeenCalled();
    });
  });

  test("getMDMStatus pushes the right error onto the stack if fails", () => {
    store.form_alerts = [];
    apiService.getAdminApps = jest.fn();
    apiService.getAdminApps.mockReturnValue(Promise.reject());

    store.getMDMStatus().then(() => {
      expect(store.app_alerts.length).toBe(1);
      expect(store.app_alerts[0].message).toBe(store.userMessages.connectFail);
    });
  });

  //TODO setMDMStatus
  // test("setMDMStatus pushes success message onto the stack if succeeds", () => {
  //   store.app_alerts = [];
  //   store.appCatalogMDMStatuses['123'] = 'PENDING';
  //   let apps = [
  //     {
  //       app_psk: '123',
  //       mdm_install_status: 'INSTALLED'
  //     }
  //   ];
  //
  //   store.setMDMStatus(apps);
  //
  //   expect(store.app_alerts.length).toBe(1);
  //   expect(store.app_alerts[0].message).toBe(store.userMessages.pushSuccess);
  // });

  // test("setMDMStatus pushes the right error onto the stack if fails", () => {
  //   store.app_alerts = [];
  //   store.throwMDMError = jest.fn();
  //   let apps = [
  //     {
  //       mdm_install_status: 'FAILED'
  //     }
  //   ];
  //
  //   store.setMDMStatus(apps);
  //
  //   expect(store.throwMDMError).toBeCalled();
  // });

  test("throwMDMError pushes the right error onto the stack", () => {
    store.app_alerts = [];
    store.form_alerts = [];
    store.throwMDMError();
    expect(store.app_alerts.length).toBe(1);
    expect(store.app_alerts[0].message).toBe(store.userMessages.pushFail);
  });

  test("pushToMDM sets status to PENDING until resolved", () => {
    const psk = "123";
    apiService.pushToMDM = jest.fn();
    apiService.pushToMDM.mockReturnValue(Promise.resolve());
    expect(store.appCatalogMDMStatuses.get(psk)).not.toBe('PENDING');

    store.pushToMDM(psk);
    expect(store.appCatalogMDMStatuses.get(psk)).toBe('PENDING');
  });

  test("pushToMDM throws error and updates MDM status if failed", () => {
    const psk = "123";
    apiService.pushToMDM = jest.fn();
    apiService.pushToMDM.mockReturnValue(Promise.reject());
    store.throwMDMError = jest.fn();

    store.pushToMDM(psk).then(() => {
      expect(apiService.pushToMDM).rejects;
      expect(store.appCatalogMDMStatuses.get(psk)).toBe('FAILED');
      expect(store.throwMDMError).toHaveBeenCalled();
    });
  });
});
