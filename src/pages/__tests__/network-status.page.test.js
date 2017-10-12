
jest.unmock('../../core/stores/master.store');
jest.unmock('../network-status.page');

import {observer, inject} from 'mobx-react';
import {geolinkStore} from '../../core/stores/geolink.store';
import NetworkStatusPage from '../network-status.page';

describe('<NetworkStatusPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        geolinkStore
      }
    }

    test('matches previous snapshot', () => {
      let component = renderer.create(<NetworkStatusPage {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
