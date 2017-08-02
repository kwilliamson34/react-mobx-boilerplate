jest.unmock('axios');
jest.unmock('history/createBrowserHistory');
jest.unmock('../../stores/user.store');
jest.unmock('../utils.service');

import {userStore} from '../../stores/user.store';
import {utilsService} from '../utils.service';
import {history} from '../history.service';

describe('UtilsService', () => {
  describe('methods', () => {
    test('formatRating', () => {
      expect(utilsService.formatRating()).toBe('0.0');
      expect(utilsService.formatRating('')).toBe('0.0');
      expect(utilsService.formatRating(0)).toBe('0.0');

      expect(utilsService.formatRating(0.1)).toBe('0.1');
      expect(utilsService.formatRating(4)).toBe('4.0');
      expect(utilsService.formatRating(3.22)).toBe('3.22');
    });

    test('mapAppsToCards', () => {
      expect(utilsService.mapAppsToCards().length).toBe(0);
      expect(utilsService.mapAppsToCards([]).length).toBe(0);

      let appResponseObj = {
        app_name: 'name',
        custom_metadata: {
          author: 'author',
          app_type: 'ENDORSED',
          category: 'category',
          user_segment: 'segment'
        },
        icon_path: 'icon path',
        rating: 4,
        reviews_count: 5,
        id: 'id',
        app_psk: 'psk',
        isAvailable: true,
        isRecommended: false,
        mdm_install_status: 'INSTALLED',
        platform: 'ANDROID'
      }
      let appSimplifiedObj = {
        name: 'name',
        publisher: 'author',
        imageUrl: 'icon path',
        rating: 4,
        reviews_count: 5,
        id: 'id',
        app_psk: 'psk',
        isAvailable: true,
        isRecommended: false,
        mdm_install_status: 'INSTALLED',
        badge: true,
        platform: 'ANDROID',
        category: 'category',
        user_segment: 'segment',
        screenshots: {
          mobile: [],
          tablet: []
        }
      }

      expect(utilsService.mapAppsToCards([appResponseObj]).length).toBe(1);
      expect(utilsService.mapAppsToCards([appResponseObj])[0]).toEqual(appSimplifiedObj);

      expect(utilsService.mapAppsToCards([appResponseObj,appResponseObj,appResponseObj]).length).toBe(3);
    });

    test('getUrlParameter', () => {
      //mock the querystring
      Object.defineProperty(window.location, 'search', {
        writable: true,
        value: '?token=123456ABCDEF'
      });
      expect(utilsService.getUrlParameter('token')).toBe('123456ABCDEF');
      expect(utilsService.getUrlParameter('not_in_querystring')).toBe('');

      //getUrlParameter returns only string before & or # symbols
      Object.defineProperty(window.location, 'search', {
        writable: true,
        value: '?token=123456&THIS_PART_WONT_SHOW'
      });
      expect(utilsService.getUrlParameter('token')).toBe('123456');
    });

    test('scrollIntoViewIfNecessary', () => {
      //TODO
    });

    test('getDevicesAndSolutionsUrl', () => {
      //removes HTML entities, replaces spaces with + sign, converts to lowercase
      let stringToTransform = 'A Trademarked Device&reg;';
      expect(utilsService.getDevicesAndSolutionsUrl(stringToTransform)).toBe('a+trademarked+device');
      //removes special characters, retaining only letters and numbers, before adding + to spaces
      stringToTransform = '!h@e#l$l%o^ 1& 2* 3(';
      expect(utilsService.getDevicesAndSolutionsUrl(stringToTransform)).toBe('hello+1+2+3');
      //removes html entities before special symbols.
      stringToTransform = 'hello&&&trade;;!!!';
      expect(utilsService.getDevicesAndSolutionsUrl(stringToTransform)).not.toBe('hellotrade');
      //treats strings longer than 8 characters between & and ; as text, and not as an html entity.
      stringToTransform = '&thisisnotanhtmlentity;';
      expect(utilsService.getDevicesAndSolutionsUrl(stringToTransform)).toBe('thisisnotanhtmlentity');
    });

    test('isValidEmailAddress', () => {
      expect(utilsService.isValidEmailAddress('')).toBe(false);
      expect(utilsService.isValidEmailAddress('johnny')).toBe(false);
      expect(utilsService.isValidEmailAddress('johnny@')).toBe(false);
      expect(utilsService.isValidEmailAddress('@sapient.com')).toBe(false);
      expect(utilsService.isValidEmailAddress('johnnysapient.com')).toBe(false);
      expect(utilsService.isValidEmailAddress('johnny@@sapient.com')).toBe(false);

      expect(utilsService.isValidEmailAddress('johnny@sapient.com')).toBe(true);
      expect(utilsService.isValidEmailAddress('johnny@gmail.com')).toBe(true);
      expect(utilsService.isValidEmailAddress('123@sapient.com')).toBe(true);
      expect(utilsService.isValidEmailAddress('#@sapient.com')).toBe(true);
    });

    test('handleError', () => {
      let err = {
        response: {
          status: 200
        }
      }
      history.replace = jest.fn();
      userStore.revalidateUser = jest.fn();

      utilsService.handleError(err);
      expect(userStore.revalidateUser).not.toHaveBeenCalled();

      err.response.status = 401;
      utilsService.handleError(err);
      expect(userStore.revalidateUser).toHaveBeenCalled();

      err.response.status = 403;
      utilsService.handleError(err);
      expect(history.replace).toHaveBeenCalled();

      err.response.status = 410;
      utilsService.handleError(err);
      expect(history.replace).toHaveBeenCalled();

      err.response.status = 500;
      utilsService.handleError(err);
      expect(history.replace).toHaveBeenCalled();

      err.response.status = 999;
      utilsService.handleError(err);
      expect(history.replace).toHaveBeenCalled();
    });

    test('handlePendingAuthorizationsMapping', () => {
      history.replace = jest.fn();
      utilsService.handlePendingAuthorizationsMapping();
      expect(history.replace).toHaveBeenCalled();
    });

    test('properCaseOS', () => {
      expect(utilsService.properCaseOS('')).toBe('');
      expect(utilsService.properCaseOS('blah')).toBe('blah');
      expect(utilsService.properCaseOS('BlahBlah')).toBe('BlahBlah');

      expect(utilsService.properCaseOS('IOS')).toBe('iOS');
      expect(utilsService.properCaseOS('ANDROID')).toBe('Android');
    });
  });
});
