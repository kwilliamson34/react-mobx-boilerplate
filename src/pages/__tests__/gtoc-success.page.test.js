
jest.unmock('../gtoc-subscribe-success.page');

import {observer, inject} from 'mobx-react';
import GtocSuccessPage from '../gtoc-subscribe-success.page';
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
