jest.unmock('../mdm.store');
jest.unmock('axios');

import { mdmStore } from '../mdm.store';
import {apiService} from '../../services/api.service';

const store = mdmStore;

describe("MDMStore", () => {

  const sum = (a,b) => {
    return a + b;
  }

  test("placeholder test to make a valid test suite", () => {
    expect( sum(2,4) ).toBe(6);
  });


});
