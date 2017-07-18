jest.unmock('../feedback.store');
jest.unmock('axios');

import { feedbackStore } from '../feedback.store';
import {apiService} from '../../services/api.service';

const store = feedbackStore;

describe("FeedbackStore", () => {

  const sum = (a,b) => {
    return a + b;
  }

  test("placeholder test to make a valid test suite", () => {
    expect( sum(2,4) ).toBe(6);
  });


});
