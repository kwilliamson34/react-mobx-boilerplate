jest.unmock('../feedback.store');
jest.unmock('../user.store');
jest.unmock('../../services/utils.service');

import {observable, useStrict} from 'mobx';
import {feedbackStore} from '../feedback.store';
import {userStore} from '../user.store';
import {apiService} from '../../services/api.service';

describe("FeedbackStore", () => {
  userStore.conditionUserObj({
    email: 'testy@testface.com',
    authorizations: []
  });

  apiService.submitCustomerFeedbackForm = jest.fn().mockReturnValue(Promise.resolve());

  beforeEach(() => {
    useStrict(false);
    return feedbackStore.clearForm();
  })

  describe('submission tests ', () => {
    test('submission calls appropriate API method', () => {
      feedbackStore.formHasError = false;
      feedbackStore.submitForm();
      expect(apiService.submitCustomerFeedbackForm).toHaveBeenCalled();
    });
  });
});
