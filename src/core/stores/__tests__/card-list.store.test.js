jest.unmock('axios');
jest.unmock('../card-list.store');

import {cardListStore} from '../card-list.store';
import {apiService} from '../../services/api.service';

const store = cardListStore;

describe("CardList", () => {

  const sum = (a,b) => {
    return a + b;
  }

  test("placeholder test to make a valid test suite", () => {
    expect( sum(2,4) ).toBe(6);
  });
  
});
