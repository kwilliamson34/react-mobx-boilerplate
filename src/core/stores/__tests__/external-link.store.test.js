jest.unmock('../external-link.store');
jest.unmock('axios');

import { externalLinkStore } from '../external-link.store';
import {apiService} from '../../services/api.service';

const store = externalLinkStore;

describe("ExternalLinkStore", () => {

  const sum = (a,b) => {
    return a + b;
  }

  test("placeholder test to make a valid test suite", () => {
    expect( sum(2,4) ).toBe(6);
  });


});
