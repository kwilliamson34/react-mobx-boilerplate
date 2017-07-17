jest.unmock('../geolink.store');
jest.unmock('axios');

import { geolinkStore } from '../geolink.store';

const store = geolinkStore;

describe("GeolinkStore", () => {

  const sum = (a,b) => {
    return a + b;
  }

  test("placeholder test to make a valid test suite", () => {
    expect( sum(2,4) ).toBe(6);
  });


});
