
jest.unmock('../../core/stores/master.store');
jest.unmock('../../core/stores/feedback.store');
jest.unmock('../../components/forms/asForm');
jest.unmock('../feedback.page');

import {observer, inject} from 'mobx-react';
import {feedbackStore} from '../../core/stores/feedback.store';
import FeedbackPage from '../feedback.page';

describe('<FeedbackPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        feedbackStore
      }
    }

    test('matches previous snapshot', () => {
      let component = renderer.create(<FeedbackPage {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
