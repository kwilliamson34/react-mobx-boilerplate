jest.unmock('../feedback.store');

import {useStrict} from 'mobx';
import {feedbackStore} from '../feedback.store';
import {apiService} from '../../services/api.service';

describe("FeedbackStore", () => {
  apiService.submitFeedbackForm = jest.fn().mockReturnValue(Promise.resolve());

  beforeEach(() => {
    useStrict(false);
    return feedbackStore.clearForm();
  })

  describe('submission tests ', () => {
    test('submission calls appropriate API method', () => {
      feedbackStore.formHasError = false;
      feedbackStore.submitForm();
      expect(apiService.submitFeedbackForm).toHaveBeenCalled();
    });
  });
});
