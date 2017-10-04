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

  describe('email tests ', () => {
    let emailInput = {
      id: 'email',
      value: 'newemaily@newemailface.com'
    }
    let num = 10000;

    test('email should default to user email', () => {
      expect(feedbackStore.feedbackObject.email).toBe('testy@testface.com');
    });
    test('email should change on input', () => {
      feedbackStore.changeValue(emailInput, num)
      expect(feedbackStore.feedbackObject.email).toBe('newemaily@newemailface.com');
    });
    test('input email should validate without errors', () => {
      feedbackStore.validateInput(emailInput);
      expect(feedbackStore.hasErrors.email).toBe(false);
    });
    test('incorrectly formated email should produce an error', () => {
      emailInput.value = 'bademailfeelsbadman';
      feedbackStore.validateInput(emailInput);
      expect(feedbackStore.hasErrors.email).toBe(true);
    });
  });

  describe('text input tests ', () => {
    let titleInput = {
      id: 'title',
      value: 'Hippity Hoppity get off my property'
    }
    let detailsInput = {
      id: 'details',
      //value is 300 chars
      value: 'QXlnJV9jpeDEJ4NXVF8ipe2qv2bZJTfzGQpcEYrNyiYJo4hA5iUy8NeYtYzkMT1bHIo4U4vXG6nZk09A95KRWvzzP1fg9AV5rCJMxwyeCz1CpDmTGQ6KMylTDxqvjnmRJztk2vD1XtIaKUcqv8zlwuIHxZ6SoSPe90gUK0pGrhKx3JrExNC9rLSOeUKClSRrCQi2OLo9MsDloW37wZ5VQjot8Xt8bfRzHQ2qJqgLigeEXmk3mIouXXQ7qrKNRePc9usBTmPNC8JbrZWX86nzhyApVIr7zz2qsTsKhE89yNnJ'
    }
    let num = 10000;

    test('text fields should initially be blank', () => {
      expect(feedbackStore.feedbackObject.title).toBe('');
      expect(feedbackStore.feedbackObject.details).toBe('');
    });
    test('text fields should change on input', () => {
      feedbackStore.changeValue(titleInput, num);
      feedbackStore.changeValue(detailsInput, num);
      expect(feedbackStore.feedbackObject.title).toBe(titleInput.value);
      expect(feedbackStore.feedbackObject.details).toBe(detailsInput.value);
    });
    test('input should be limited to num length', () => {
      num = 250;
      feedbackStore.changeValue(detailsInput, num);
      expect(feedbackStore.feedbackObject.details).toBe(detailsInput.value.slice(0, num));
    });
    test('text fields should validate at any length greater than zero and produce no errors', () => {
      feedbackStore.changeValue(titleInput, num);
      feedbackStore.changeValue(detailsInput, num);
      feedbackStore.validateInput(titleInput);
      feedbackStore.validateInput(detailsInput);
      expect(feedbackStore.hasErrors.title).toBe(false);
      expect(feedbackStore.hasErrors.details).toBe(false);
    });
    test('text fields of length 0 should produce errors', () => {
      detailsInput.value = '';
      titleInput.value = '';
      feedbackStore.changeValue(titleInput, num);
      feedbackStore.changeValue(detailsInput, num);
      feedbackStore.validateInput(titleInput);
      feedbackStore.validateInput(detailsInput);
      expect(feedbackStore.hasErrors.title).toBe(true);
      expect(feedbackStore.hasErrors.details).toBe(true);
    });
  });

  describe('form validation tests ', () => {
    let titleInput = {
      id: 'title',
      value: 'Plibbity ploppity tadpoles are in prepuberty'
    }
    let detailsInput = {
      id: 'details',
      //value is 300 chars
      value: 'QXlnJV9jpeDEJ4NXVF8ipe2qv2bZJTfzGQpcEYrNyiYJo4hA5iUy8NeYtYzkMT1bHIo4U4vXG6nZk09A95KRWvzzP1fg9AV5rCJMxwyeCz1CpDmTGQ6KMylTDxqvjnmRJztk2vD1XtIaKUcqv8zlwuIHxZ6SoSPe90gUK0pGrhKx3JrExNC9rLSOeUKClSRrCQi2OLo9MsDloW37wZ5VQjot8Xt8bfRzHQ2qJqgLigeEXmk3mIouXXQ7qrKNRePc9usBTmPNC8JbrZWX86nzhyApVIr7zz2qsTsKhE89yNnJ'
    }
    let topicInput = {
      id: 'topic',
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
        title: 'Hubble dubble this is a financial bubble',
        details: 'QXlnJV9jpeDEJ4NXVF8ipe2qv2bZJTfzGQpcEYrNyiYJo4hA5iUy8NeYtYzkMT1bHIo4U4vXG6nZk09A95KRWvzzP1fg9AV5rCJMxwyeCz1CpDmTGQ6KMylTDxqvjnmRJztk2vD1XtIaKUcqv8zlwuIHxZ6SoSPe90gUK0pGrhKx3JrExNC9rLSOeUKClSRrCQi2OLo9MsDloW37wZ5VQjot8Xt8bfRzHQ2qJqgLigeEXmk3mIouXXQ7qrKNRePc9usBTmPNC8JbrZWX86nzhyApVIr7zz2qsTsKhE89yNnJ',
        topic: 'ANY_OLD_TOPIC',
        email: 'submitty@submitface.com'
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
