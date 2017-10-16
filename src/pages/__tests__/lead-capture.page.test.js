jest.unmock('../../core/stores/lead-capture.store');
jest.unmock('../lead-capture.page');
jest.unmock('../../components/forms/asForm');

import {observer, inject} from 'mobx-react';
import {leadCaptureStore} from '../../core/stores/lead-capture.store';
import LeadCapturePage from '../lead-capture.page';
import {MemoryRouter} from 'react-router-dom';

describe('<LeadCapturePage />', () => {
  let props = {
    store: {
      leadCaptureStore
    },
    match: {
      url: '/category/detail/request-info',
      params: {
        solutionCategory: 'category',
        solutionDetail: 'detail'
      }
    }
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component, tree;

      component = renderer.create(<MemoryRouter>
          <LeadCapturePage {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
