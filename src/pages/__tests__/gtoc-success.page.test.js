jest.unmock('axios');
jest.unmock('../gtoc-success.page');

import {observer, inject} from 'mobx-react';
import GtocSuccessPage from '../gtoc-success.page';
import {MemoryRouter} from 'react-router-dom';

describe('<GtocSuccessPage />', () => {
  describe('render', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<MemoryRouter><GtocSuccessPage /></MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
