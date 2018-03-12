
jest.unmock('../../core/stores/master.store');
jest.unmock('../network.page');

import {observer, inject} from 'mobx-react';
import {networkStore} from '../../core/stores/network.store';
import NetworkPage from '../network.page';

describe('<NetworkPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        networkStore
      }
    }

    test('matches previous snapshot', () => {
      let component = renderer.create(<NetworkPage {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
