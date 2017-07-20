jest.unmock('../app-catalog.store');
jest.unmock('axios');

import { appCatalogStore } from '../app-catalog.store';
import {apiService} from '../../services/api.service';

const store = appCatalogStore;

describe("AppCatalogStore", () => {

  const sum = (a,b) => {
    return a + b;
  }

  test("placeholder test to make a valid test suite", () => {
    expect( sum(2,4) ).toBe(6);
  });

});
