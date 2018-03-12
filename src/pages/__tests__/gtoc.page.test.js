
jest.unmock('../../core/stores/master.store');
jest.unmock('../../core/stores/gtoc.store');
jest.unmock('../../components/forms/asForm');
jest.unmock('../gtoc.page');

import {observer, inject} from 'mobx-react';
import {gtocStore} from '../../core/stores/gtoc.store';
import GtocPage from '../gtoc.page';

describe('<GtocPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        gtocStore
      }
    }

    test('matches previous snapshot', () => {
      let component = renderer.create(<GtocPage {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
