jest.unmock('../header.store');

import { headerStore } from '../header.store';

const store = headerStore;

describe("HeaderStore", () => {

  const sum = (a,b) => {
    return a + b;
  }

  test("placeholder test to make a valid test suite", () => {
    expect( sum(2,4) ).toBe(6);
  });


});
