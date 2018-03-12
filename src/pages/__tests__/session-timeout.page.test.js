
jest.unmock('../session-timeout.page');

import {observer, inject} from 'mobx-react';
import SessionTimeoutPage from '../session-timeout.page';
import {MemoryRouter} from 'react-router-dom';

describe('<SessionTimeoutPage />', () => {
  describe('render', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<MemoryRouter><SessionTimeoutPage /></MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
