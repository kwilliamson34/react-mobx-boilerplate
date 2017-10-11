jest.unmock('../feedback.store');
jest.unmock('../user.store');

jest.unmock('../../services/utils.service');

import {observable, useStrict} from 'mobx';
import {feedbackStore} from '../feedback.store';
import {userStore} from '../user.store';
import {apiService} from '../../services/api.service';

const store = feedbackStore;

describe("FeedbackStore", () => {
  userStore.conditionUserObj({
    email: 'testy@testface.com',
    authorizations: []
  });

  apiService.submitCustomerFeedbackForm = jest.fn().mockReturnValue(Promise.resolve());
  let inputsArray = [
    {
      id: 'title',
      value: 'Hubble dubble this is a financial bubble'
    },
    {
      id: 'details',
      //value is 300 chars
      value: 'QXlnJV9jpeDEJ4NXVF8ipe2qv2bZJTfzGQpcEYrNyiYJo4hA5iUy8NeYtYzkMT1bHIo4U4vXG6nZk09A95KRWvzzP1fg9AV5rCJMxwyeCz1CpDmTGQ6KMylTDxqvjnmRJztk2vD1XtIaKUcqv8zlwuIHxZ6SoSPe90gUK0pGrhKx3JrExNC9rLSOeUKClSRrCQi2OLo9MsDloW37wZ5VQjot8Xt8bfRzHQ2qJqgLigeEXmk3mIouXXQ7qrKNRePc9usBTmPNC8JbrZWX86nzhyApVIr7zz2qsTsKhE89yNnJ'
    },
    {
      id: 'topic',
      value: 'ANY_OLD_TOPIC'
    },
    {
      id: 'email',
      value: 'submitty@submitface.com'
    }
  ];

  feedbackStore.parseForm = jest.fn().mockReturnValue(inputsArray);

  beforeEach(() => {
    useStrict(false);
    return feedbackStore.clearForm();
  })

  describe('submission tests ', () => {
    test('submission calls appropriate API method', () => {
      feedbackStore.submitForm();
      expect(apiService.submitCustomerFeedbackForm).toHaveBeenCalled();
    });

    test('if form is not valid, error is noted for the alert bar', () => {
      inputsArray[0].value = '';
      feedbackStore.submitForm();
      expect(feedbackStore.formHasError).toBe(true);
    });
  });
});
