jest.unmock('../lead-capture.store');
jest.unmock('../../services/utils.service');

import {observable, useStrict} from 'mobx';
import {leadCaptureStore} from '../lead-capture.store';
import {apiService} from '../../services/api.service';

describe("LeadCaptureStore", () => {
  apiService.submitLeadCaptureForm = jest.fn().mockReturnValue(Promise.resolve());

  beforeEach(() => {
    useStrict(false);
    return leadCaptureStore.clearForm();
  })

  describe('submission tests ', () => {
    test('submission calls appropriate API method', () => {
      leadCaptureStore.formHasError = false;
      leadCaptureStore.submitForm();
      expect(apiService.submitLeadCaptureForm).toHaveBeenCalled();
    });
  });
});
