jest.unmock('axios');
jest.unmock('../feedback-success.page');

import {observer, inject} from 'mobx-react';
import FeedbackSuccessPage from '../feedback-success.page';
import {MemoryRouter} from 'react-router-dom';

describe('<FeedbackSuccessPage />', () => {
  describe('render', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<MemoryRouter><FeedbackSuccessPage /></MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
