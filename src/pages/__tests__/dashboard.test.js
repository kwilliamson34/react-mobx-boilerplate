jest.unmock('../dashboard.page');

import {observer, inject} from 'mobx-react';
import Dashboard from '../dashboard.page';
import {MemoryRouter} from 'react-router-dom';

describe('<Dashboard />', () => {
  let props = {
    store: {
      userStore: {}
    }
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component = renderer.create(<MemoryRouter>
          <Dashboard {...props} />
      </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
