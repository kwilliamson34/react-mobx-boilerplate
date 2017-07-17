jest.unmock('axios');
jest.unmock('../user.store');

import { userStore } from '../user.store';

const store = userStore;

describe("UserStore", () => {
  const sum = (a,b) => {
    return a + b;
  }

  test("placeholder test to make a valid test suite", () => {
    expect( sum(2,4) ).toBe(6);
  });


});
