jest.unmock('../feedback.store');
jest.unmock('../user.store');
jest.unmock('axios');
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
      id: 'feedback_title',
      value: 'Hubble dubble this is a financial bubble'
    },
    {
      id: 'feedback_details',
      //value is 300 chars
      value: 'QXlnJV9jpeDEJ4NXVF8ipe2qv2bZJTfzGQpcEYrNyiYJo4hA5iUy8NeYtYzkMT1bHIo4U4vXG6nZk09A95KRWvzzP1fg9AV5rCJMxwyeCz1CpDmTGQ6KMylTDxqvjnmRJztk2vD1XtIaKUcqv8zlwuIHxZ6SoSPe90gUK0pGrhKx3JrExNC9rLSOeUKClSRrCQi2OLo9MsDloW37wZ5VQjot8Xt8bfRzHQ2qJqgLigeEXmk3mIouXXQ7qrKNRePc9usBTmPNC8JbrZWX86nzhyApVIr7zz2qsTsKhE89yNnJ'
    },
    {
      id: 'feedback_topic',
      value: 'ANY_OLD_TOPIC'
    },
    {
      id: 'feedback_email',
      value: 'submitty@submitface.com'
    }
  ];

  feedbackStore.parseForm = jest.fn().mockReturnValue(inputsArray);

  beforeEach(() => {
    useStrict(false);
    return feedbackStore.clearForm();
  })

  describe('email tests ', () => {
    let emailInput = {
      id: 'feedback_email',
      value: 'newemaily@newemailface.com'
    }
    let num = 10000;

    test('email should default to user email', () => {
      expect(feedbackStore.feedbackObject.feedback_email).toBe('testy@testface.com');
    });
    test('email should change on input', () => {
      feedbackStore.changeValue(emailInput, num)
      expect(feedbackStore.feedbackObject.feedback_email).toBe('newemaily@newemailface.com');
    });
    test('input email should validate without errors', () => {
      feedbackStore.validateInput(emailInput);
      expect(feedbackStore.hasErrors.feedback_email).toBe(false);
    });
    test('incorrectly formated email should produce an error', () => {
      emailInput.value = 'bademailfeelsbadman';
      feedbackStore.validateInput(emailInput);
      expect(feedbackStore.hasErrors.feedback_email).toBe(true);
    });
    test('setDefaultEmail should set email to the userStore.user.email value if value is blank', () => {
      feedbackStore.feedbackObject.feedback_email = '';
      feedbackStore.setDefaultEmail();
      expect(feedbackStore.feedbackObject.feedback_email).toBe('testy@testface.com');
    })
  });

  describe('text input tests ', () => {
    let titleInput = {
      id: 'feedback_title',
      value: 'Hippity Hoppity get off my property'
    }
    let detailsInput = {
      id: 'feedback_details',
      //value is 300 chars
      value: 'QXlnJV9jpeDEJ4NXVF8ipe2qv2bZJTfzGQpcEYrNyiYJo4hA5iUy8NeYtYzkMT1bHIo4U4vXG6nZk09A95KRWvzzP1fg9AV5rCJMxwyeCz1CpDmTGQ6KMylTDxqvjnmRJztk2vD1XtIaKUcqv8zlwuIHxZ6SoSPe90gUK0pGrhKx3JrExNC9rLSOeUKClSRrCQi2OLo9MsDloW37wZ5VQjot8Xt8bfRzHQ2qJqgLigeEXmk3mIouXXQ7qrKNRePc9usBTmPNC8JbrZWX86nzhyApVIr7zz2qsTsKhE89yNnJ'
    }
    let num = 10000;

    test('text fields should initially be blank', () => {
      expect(feedbackStore.feedbackObject.feedback_title).toBe('');
      expect(feedbackStore.feedbackObject.feedback_details).toBe('');
    });
    test('text fields should change on input', () => {
      feedbackStore.changeValue(titleInput, num);
      feedbackStore.changeValue(detailsInput, num);
      expect(feedbackStore.feedbackObject.feedback_title).toBe(titleInput.value);
      expect(feedbackStore.feedbackObject.feedback_details).toBe(detailsInput.value);
    });
    test('input should be limited to num length', () => {
      num = 250;
      feedbackStore.changeValue(detailsInput, num);
      expect(feedbackStore.feedbackObject.feedback_details).toBe(detailsInput.value.slice(0, num));
    });
    test('text fields should validate at any length greater than zero and produce no errors', () => {
      feedbackStore.changeValue(titleInput, num);
      feedbackStore.changeValue(detailsInput, num);
      feedbackStore.validateInput(titleInput);
      feedbackStore.validateInput(detailsInput);
      expect(feedbackStore.hasErrors.feedback_title).toBe(false);
      expect(feedbackStore.hasErrors.feedback_details).toBe(false);
    });
    test('text fields of length 0 should produce errors', () => {
      detailsInput.value = '';
      titleInput.value = '';
      feedbackStore.changeValue(titleInput, num);
      feedbackStore.changeValue(detailsInput, num);
      feedbackStore.validateInput(titleInput);
      feedbackStore.validateInput(detailsInput);
      expect(feedbackStore.hasErrors.feedback_title).toBe(true);
      expect(feedbackStore.hasErrors.feedback_details).toBe(true);
    });
  });

  describe('form validation tests ', () => {
    let titleInput = {
      id: 'feedback_title',
      value: 'Plibbity ploppity tadpoles are in prepuberty'
    }
    let detailsInput = {
      id: 'feedback_details',
      //value is 300 chars
      value: 'QXlnJV9jpeDEJ4NXVF8ipe2qv2bZJTfzGQpcEYrNyiYJo4hA5iUy8NeYtYzkMT1bHIo4U4vXG6nZk09A95KRWvzzP1fg9AV5rCJMxwyeCz1CpDmTGQ6KMylTDxqvjnmRJztk2vD1XtIaKUcqv8zlwuIHxZ6SoSPe90gUK0pGrhKx3JrExNC9rLSOeUKClSRrCQi2OLo9MsDloW37wZ5VQjot8Xt8bfRzHQ2qJqgLigeEXmk3mIouXXQ7qrKNRePc9usBTmPNC8JbrZWX86nzhyApVIr7zz2qsTsKhE89yNnJ'
    }
    let topicInput = {
      id: 'feedback_topic',
      value: 'ANY_OLD_TOPIC'
    }
    let num = 10000;

    test('requiredFieldsEntered should return true if title, topic and details have length greater than zero', () => {
      expect(feedbackStore.requiredFieldsEntered).toBe(false);
      feedbackStore.changeValue(titleInput, num);
      feedbackStore.changeValue(topicInput, num);
      expect(feedbackStore.requiredFieldsEntered).toBe(false);
      feedbackStore.changeValue(detailsInput, num);
      expect(feedbackStore.requiredFieldsEntered).toBe(true);
    });
    test('formHasEntries should return true if title and details have length greater than zero', () => {
      expect(feedbackStore.formHasEntries).toBe(false);
      feedbackStore.changeValue(titleInput, num);
      feedbackStore.changeValue(detailsInput, num);
      expect(feedbackStore.formHasEntries).toBe(true);
    });
  });

  describe('submission tests ', () => {
    test('on submission of data of any length above 0 in all required fields, should return a status of 200 and hasBeenSubmitted should be true', () => {
      feedbackStore.feedbackObject = {
        feedback_title: 'Hubble dubble this is a financial bubble',
        feedback_details: 'QXlnJV9jpeDEJ4NXVF8ipe2qv2bZJTfzGQpcEYrNyiYJo4hA5iUy8NeYtYzkMT1bHIo4U4vXG6nZk09A95KRWvzzP1fg9AV5rCJMxwyeCz1CpDmTGQ6KMylTDxqvjnmRJztk2vD1XtIaKUcqv8zlwuIHxZ6SoSPe90gUK0pGrhKx3JrExNC9rLSOeUKClSRrCQi2OLo9MsDloW37wZ5VQjot8Xt8bfRzHQ2qJqgLigeEXmk3mIouXXQ7qrKNRePc9usBTmPNC8JbrZWX86nzhyApVIr7zz2qsTsKhE89yNnJ',
        feedback_topic: 'ANY_OLD_TOPIC',
        feedback_email: 'submitty@submitface.com'
      }
      //parseForm response has been mocked
      feedbackStore.submitForm('formSubmission');
      expect(feedbackStore.formIsValid).toBe(true);
      //submitCustomerFeedbackForm response has been mocked
      expect(apiService.submitCustomerFeedbackForm).toHaveBeenCalled();
      apiService.submitCustomerFeedbackForm('formSubmission')
      .then(() => {
        expect(feedbackStore.hasBeenSubmitted).toBe(true);
      });
    });
    test('if any submissions are of length 0, formIsValid returns false and showAlertBar returns true', () => {
      inputsArray[0].value = '';
      feedbackStore.submitForm('formSubmission');
      expect(feedbackStore.formIsValid).toBe(false);
      expect(feedbackStore.showAlertBar).toBe(true);
    });
  });
});
