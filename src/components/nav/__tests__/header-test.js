jest.unmock('../header');

import {observer, inject} from 'mobx-react';
import Header from '../header';
import {MemoryRouter} from 'react-router-dom';
import {headerStore} from '../../../core/stores/header.store';
import {userStore} from '../../../core/stores/user.store';

describe('<Header />', () => {
  let props = {
    store: {
      headerStore,
      userStore
    }
  };

  describe('render', () => {
    test('matches previous snapshot', () => {
      const component = renderer.create(<MemoryRouter>
        <Header {...props}/>
      </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
