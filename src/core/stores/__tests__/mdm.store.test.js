jest.unmock('../mdm.store');

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

  test("formIsDirty returns true iff the user has entered info", () => {
    store.values.mdm_type = '';
    expect(store.formIsDirty).toBe(false);

    store.values.mdm_type = 'AIRWATCH';
    store.values.aw_password = 'password';
    expect(store.formIsDirty).toBe(true);
  });

  test("updateMDM sets the MDM and resets the form", () => {
    store.values.mdm_type = 'AIRWATCH';

    store.updateMDM('MAAS360');

    expect(store.values.mdm_type).toBe('MAAS360');
  });

  test("clearStoredCredentials works as expected", () => {
    //TODO
  });

  test("records the right mdm_type", () => {
    apiService.getMDMConfiguration = jest.fn();
    apiService.getMDMConfiguration.mockReturnValue(Promise.resolve({
      data: {
        mdm_type: 'AIRWATCH'
      }
    }));

    store.getMDMConfiguration().then(() => {
      expect(store.values.mdm_type).toBe('AIRWATCH');
    });

    apiService.getMDMConfiguration.mockReturnValue(Promise.resolve({
      data: {
        mdm_type: 'MAAS360'
      }
    }));

    store.getMDMConfiguration().then(() => {
      expect(store.values.mdm_type).toBe('MAAS360');
    });

    apiService.getMDMConfiguration.mockReturnValue(Promise.resolve({
      data: {
        mdm_type: 'MOBILE_IRON'
      }
    }));

    store.getMDMConfiguration().then(() => {
      expect(store.values.mdm_type).toBe('MOBILE_IRON');
    });
    
    apiService.getMDMConfiguration.mockReturnValue(Promise.resolve({
      data: {
        mdm_type: 'MOBILE_IRON_CORE'
      }
    }));

    store.getMDMConfiguration().then(() => {
      expect(store.values.mdm_type).toBe('MOBILE_IRON_CORE');
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
    store.stopPolling(psk);
    expect(store.appCatalogMDMStatuses.get(psk)).toBe('NOT_INSTALLED');
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
