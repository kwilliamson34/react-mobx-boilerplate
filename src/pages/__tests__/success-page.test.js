jest.unmock('../success.page');
jest.unmock('history/createBrowserHistory');
jest.unmock('../../core/services/history.service');

import {history} from '../../core/services/history.service';
import SuccessPage from '../success.page';
import {MemoryRouter} from 'react-router-dom';

describe('<SuccessPage />', () => {
  describe('render', () => {

    test('matches previous snapshot', () => {
      history.location = {
        state: {
          pageTitle: 'Successful Page Interaction',
          message: 'Your page interaction succeeded. This page assures you it is true.',
          contactUs: true,
          returnToUrl: '/',
          returnToButtonText: 'Go to Home Page'
        }
      }
      let component = renderer.create(<MemoryRouter>
          <SuccessPage />
        </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
