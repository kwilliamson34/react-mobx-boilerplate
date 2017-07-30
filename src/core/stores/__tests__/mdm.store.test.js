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

  test("getBrowserCloseAlert updates event properly", () => {
    let event = {};
    store.mdmProvider = '';
    store.getBrowserCloseAlert(event);
    expect(event.returnValue).toBe(undefined);

    store.mdmProvider = 'provider';
    store.formHasChanged = true;
    store.getBrowserCloseAlert(event);
    expect(event.returnValue).toBe(true);
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

  test("clearStoredCredentials works as expected", () => {
    //TODO
  });

  test("submitForm works as expected", () => {
    //TODO
  });

  test("can remove alert based on page id and index", () => {
    store.mdm_form_alerts = ['0','1','2'];
    store.removeAlert(store.mdm_form_alerts, 0);
    expect(store.mdm_form_alerts[0]).toBe('1');
    expect(store.mdm_form_alerts[1]).toBe('2');
    expect(store.mdm_form_alerts[2]).toBe(undefined);

    store.manage_apps_alerts = ['0','1','2'];
    store.removeAlert(store.manage_apps_alerts, 1);
    expect(store.manage_apps_alerts[0]).toBe('0');
    expect(store.manage_apps_alerts[1]).toBe('2');
    expect(store.manage_apps_alerts[2]).toBe(undefined);
  });

  test("clearAlerts encompasses all pages where alerts might be shown", () => {
    store.mdm_form_alerts = [{},{},{}];
    store.manage_apps_alerts = [{}];

    store.clearAlerts();

    expect(store.mdm_form_alerts.length).toBe(0);
    expect(store.manage_apps_alerts.length).toBe(0);
  });

  test("addPushErrorAlert pushes the right error onto the stack", () => {
    store.manage_apps_alerts = [];
    store.mdm_form_alerts = [];
    store.addPushErrorAlert();
    expect(store.manage_apps_alerts.length).toBe(1);
    expect(store.manage_apps_alerts[0].message).toBe(store.userMessages.pushFailMultiple);
  });

  test("addPushSuccessAlert pushes the right message onto the stack", () => {
    store.manage_apps_alerts = [];
    store.mdm_form_alerts = [];
    store.addPushSuccessAlert();
    expect(store.manage_apps_alerts.length).toBe(1);
    expect(store.manage_apps_alerts[0].message).toBe(store.userMessages.pushSuccessMultiple);
  });

  test("throwConnectError pushes the right error onto the stack", () => {
    store.manage_apps_alerts = [];
    store.mdm_form_alerts = [];
    store.throwConnectError({alertList: store.manage_apps_alerts});
    expect(store.manage_apps_alerts.length).toBe(1);
    expect(store.manage_apps_alerts[0].message).toBe(store.userMessages.connectFail);

    store.throwConnectError({alertList: store.mdm_form_alerts});
    expect(store.mdm_form_alerts.length).toBe(1);
    expect(store.mdm_form_alerts[0].message).toBe(store.userMessages.connectFail);
  });

  test("showErrorAlert works correctly", () => {
    store.manage_apps_alerts = [];
    store.mdm_form_alerts = [];

    store.showErrorAlert({alertList: store.manage_apps_alerts, message: ''});
    expect(store.manage_apps_alerts.length).toBe(1);
    expect(store.manage_apps_alerts[0].type).toBe('error');
    expect(store.manage_apps_alerts[0].message).toBe(store.userMessages.connectFail);

    store.showErrorAlert({alertList: store.manage_apps_alerts, message: 'message1'});
    expect(store.manage_apps_alerts.length).toBe(2);
    expect(store.manage_apps_alerts[1].type).toBe('error');
    expect(store.manage_apps_alerts[1].message).toBe('message1');

    store.showErrorAlert({alertList: store.mdm_form_alerts, message: 'message2'});
    expect(store.mdm_form_alerts.length).toBe(1);
    expect(store.mdm_form_alerts[0].type).toBe('error');
    expect(store.mdm_form_alerts[0].message).toBe('message2');
  });

  test("showSuccessAlert works correctly", () => {
    store.manage_apps_alerts = [];
    store.mdm_form_alerts = [];

    store.showSuccessAlert({alertList: store.manage_apps_alerts, message: ''});
    expect(store.manage_apps_alerts.length).toBe(0);

    store.showSuccessAlert({alertList: store.manage_apps_alerts, message: 'message1'});
    expect(store.manage_apps_alerts.length).toBe(1);
    expect(store.manage_apps_alerts[0].type).toBe('success');
    expect(store.manage_apps_alerts[0].message).toBe('message1');

    store.showSuccessAlert({alertList: store.manage_apps_alerts, message: 'message2'});
    expect(store.manage_apps_alerts.length).toBe(2);
    expect(store.manage_apps_alerts[1].type).toBe('success');
    expect(store.manage_apps_alerts[1].message).toBe('message2');

    store.showSuccessAlert({alertList: store.mdm_form_alerts, message: 'message3'});
    expect(store.mdm_form_alerts.length).toBe(1);
    expect(store.mdm_form_alerts[0].type).toBe('success');
    expect(store.mdm_form_alerts[0].message).toBe('message3');
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

  //TODO
  // test("enable/disable exit modal works correctly", () => {
  //   store.showExitModal = false;
  //   history.block = jest.fn()
  //   store.enableSaveDialogs();
  //   store.checkForChanges = true;
  //   TestUtils.Simulate.beforeUnload(window);
  //   expect(store.showExitModal).toBe(true);
  // });

  test("records the right mdmProvider", () => {
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
    store.mdm_form_alerts = [];
    apiService.getMDMConfiguration = jest.fn();
    apiService.getMDMConfiguration.mockReturnValue(Promise.reject());

    store.getMDMConfiguration().then(() => {
      expect(store.mdm_form_alerts.length).toBe(1);
      expect(store.mdm_form_alerts[0].message).toBe(store.userMessages.connectFail);
    });
  });

  test("setMDMConfiguration shows success message on success", () => {
    store.mdm_form_alerts = [];
    store.mdmProvider = 'airWatchForm';
    apiService.setMDMConfiguration = jest.fn();
    apiService.setMDMConfiguration.mockReturnValue(Promise.resolve({
      data: {
        message: 'success message'
      }
    }));

    store.setMDMConfiguration().then(() => {
      expect(store.mdm_form_alerts.length).toBe(1);
      expect(store.mdm_form_alerts[0].message).toBe('success message');
      expect(store.showExitModal).toBe(false);
      expect(store.formHasChanged).toBe(false);
      expect(store.hasBeenSubmitted).toBe(true);
    });
  });

  test("setMDMConfiguration clears out the form if fails based on credentials", () => {
    store.mdm_form_alerts = [];
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
    store.mdm_form_alerts = [];
    apiService.setMDMConfiguration = jest.fn();
    apiService.setMDMConfiguration.mockReturnValue(Promise.reject());

    store.setMDMConfiguration().then(() => {
      expect(store.mdm_form_alerts.length).toBe(1);
      expect(store.mdm_form_alerts[0].message).toBe(store.userMessages.connectFail);
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
    store.mdm_form_alerts = [];
    apiService.breakMDMConfiguration = jest.fn();
    apiService.breakMDMConfiguration.mockReturnValue(Promise.reject());

    store.breakMDMConnection().then(() => {
      expect(store.mdm_form_alerts.length).toBe(1);
      expect(store.mdm_form_alerts[0].message).toBe(store.userMessages.breakConnectionFail);
    });
  });

  test("getMDMStatusForAppCatalog sets all statuses on success", () => {
    apiService.getAdminApps = jest.fn();
    apiService.getAdminApps.mockReturnValue(Promise.resolve());
    store.processMDMStatusForAppCatalog = jest.fn();

    store.getMDMStatusForAppCatalog().then(() => {
      expect(store.processMDMStatusForAppCatalog).toHaveBeenCalled();
    });
  });

  test("getMDMStatusForAppCatalog pushes the right error onto the stack if fails", () => {
    store.mdm_form_alerts = [];
    apiService.getAdminApps = jest.fn();
    apiService.getAdminApps.mockReturnValue(Promise.reject());

    store.getMDMStatusForAppCatalog().then(() => {
      expect(store.manage_apps_alerts.length).toBe(1);
      expect(store.manage_apps_alerts[0].message).toBe(store.userMessages.connectFail);
    });
  });

  test("getSingleMDMStatus works as expected", () => {
    //TODO
  });

  //TODO
  // test("processMDMStatusForAppCatalog sets status for each app", () => {
  //   let apps = [
  //     {app_psk: '1', mdm_install_status: 'a'},
  //     {app_psk: '2', mdm_install_status: 'b'}
  //   ];
  //   store.processMDMStatusForAppCatalog(apps);
  //   expect(store.appCatalogMDMStatuses.get('1')).toBe('a');
  //   expect(store.appCatalogMDMStatuses.get('2')).toBe('b');
  // });
  //
  // test("processMDMStatusForAppCatalog shows alert on push failure", () => {
  //   store.throwPushError = jest.fn();
  //   let apps = [
  //     {app_psk: '1', mdm_install_status: 'FAILED'}
  //   ];
  //   store.processMDMStatusForAppCatalog(apps);
  //   expect(store.throwPushError).toHaveBeenCalled();
  // });
  //
  // test("processMDMStatusForAppCatalog shows alert on push success", () => {
  //   store.throwPushSuccess = jest.fn();
  //   store.mdmStatusIsUnresolved = jest.fn();
  //   store.mdmStatusIsUnresolved.mockReturnValue(true);
  //   let apps = [
  //     {app_psk: '2', mdm_install_status: 'INSTALLED'}
  //   ];
  //   store.processMDMStatusForAppCatalog(apps);
  //   expect(store.throwPushSuccess).toHaveBeenCalled();
  // });

  test("mdmStatusIsUnresolved returns expected value", () => {
    let psk = "123";
    store.appCatalogMDMStatuses.set(psk, 'PENDING');
    expect(store.mdmStatusIsUnresolved(psk)).toBe(true);

    store.appCatalogMDMStatuses.set(psk, 'IN_PROGRESS');
    expect(store.mdmStatusIsUnresolved(psk)).toBe(true);

    store.appCatalogMDMStatuses.set(psk, 'INSTALLEND');
    expect(store.mdmStatusIsUnresolved(psk)).toBe(false);

    store.appCatalogMDMStatuses.set(psk, 'NOT_INSTALLED');
    expect(store.mdmStatusIsUnresolved(psk)).toBe(false);

    store.appCatalogMDMStatuses.set(psk, 'FAILED');
    expect(store.mdmStatusIsUnresolved(psk)).toBe(false);
  });

  test("stopPolling works as expected", () => {
    let psk = "123";
    store.appCatalogMDMStatuses.set(psk, 'PENDING');
    store.throwConnectError = jest.fn();

    store.stopPolling(psk);

    expect(store.appCatalogMDMStatuses.get(psk)).toBe('DISABLED');
    expect(store.throwConnectError).toHaveBeenCalled();
  });

  test("pollUntilResolved works as expected", () => {
    //TODO
  });

  test("pushToMDM sets status to PENDING until resolved", () => {
    const psk = "123";
    store.appCatalogMDMStatuses.set(psk, 'NOT_INSTALLED');
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
    store.throwPushError = jest.fn();

    store.pushToMDM(psk).then(() => {
      expect(apiService.pushToMDM).rejects;
      expect(store.appCatalogMDMStatuses.get(psk)).toBe('FAILED');
      expect(store.throwPushError).toHaveBeenCalled();
    });
  });
});
