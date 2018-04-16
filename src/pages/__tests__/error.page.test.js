
jest.unmock('../../core/stores/master.store');
jest.unmock('../error.page');
jest.unmock('../../core/services/history.service');
jest.unmock('history/createBrowserHistory');
jest.unmock('../../core/services/history.service');

import {history} from '../../core/services/history.service';
import {observer, inject} from 'mobx-react';
import {userStore} from '../../core/stores/user.store';
import ErrorPage from '../error.page';
import {MemoryRouter} from 'react-router-dom';

describe('<ErrorPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        userStore
      }
    }
    let component, tree;

    test('matches previous snapshot', () => {
      component = renderer.create(<ErrorPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });    
});
