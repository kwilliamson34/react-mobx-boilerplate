jest.unmock('../master.store');
jest.unmock('axios');

import { pseMasterStore } from '../master.store';

const store = pseMasterStore;

describe("MasterStore", () => {

  const sum = (a,b) => {
    return a + b;
  }

  test("placeholder test to make a valid test suite", () => {
    expect( sum(2,4) ).toBe(6);
  });


});
