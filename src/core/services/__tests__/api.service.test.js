jest.unmock('axios');
jest.unmock('../api.service');
jest.unmock('../utils.service');

import {apiService} from '../api.service';
import {utilsService} from '../utils.service';
import axios from 'axios';

describe('ApiService', () => {
  describe('methode', () => {
    test('GETs', () => {
      axios.get = jest.fn();
      axios.get.mockReturnValue({then: jest.fn()});
      expect(axios.get.mock.calls.length).toBe(0);

      apiService.validateUserData();
      apiService.logoutUser();
      apiService.getSearchResults();
      apiService.getAdminApps();
      apiService.getAppDetails();
      apiService.getCategoriesAndSegments();
      apiService.getMarketingPortalDevices();
      apiService.getMarketingPortalSolutionDetails();
      apiService.getMarketingPortalSolutionCategories();
      apiService.getMDMConfiguration();
      apiService.getSingleMDMStatus();

      expect(axios.get.mock.calls.length).toBe(11);
    });

    test('POSTs', () => {
      expect(apiService.addAppToGroup('123', 'group1')).resolves;
      expect(apiService.setMDMConfiguration({})).resolves;
      expect(apiService.pushToMDM('123')).resolves;
      expect(apiService.submitCustomerFeedbackForm({})).resolves;
    });

    test('DELETEs', () => {
      axios.delete = jest.fn();
      expect(axios.delete.mock.calls.length).toBe(0);

      apiService.breakMDMConfiguration();

      expect(axios.delete.mock.calls.length).toBe(1);
    });

    test('Custom', () => {
      expect(apiService.removeAppFromGroup('123', 'group1')).resolves;
    });

    test('Marketing Portal functions return inner data', () => {
      axios.get = jest.fn().mockReturnValue( Promise.resolve({data: 'hello'}) );

      apiService.getMarketingPortalDevices().then(res => {
        expect(res).toEqual('hello');
      });
      apiService.getMarketingPortalSolutionDetails().then(res => {
        expect(res).toEqual('hello');
      });
      apiService.getMarketingPortalSolutionCategories().then(res => {
        expect(res).toEqual('hello');
      });
      apiService.getSingleMDMStatus().then(res => {
        expect(res).toEqual('hello');
      });
    });
  });
});
