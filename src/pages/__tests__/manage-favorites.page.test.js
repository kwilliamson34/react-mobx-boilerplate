jest.unmock('../../core/stores/manage-favorites.store');
jest.unmock('../manage-favorites.page');
jest.unmock('../../components/sortable-table/sortable-table');

import {observer, inject} from 'mobx-react';
import {manageFavoritesStore} from '../../core/stores/manage-favorites.store';
import ManageFavoritesPage from '../manage-favorites.page';

describe('<ManageFavoritesPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        manageFavoritesStore: {
          rows: [],
          sortedRows: [],
          sortByAscending: {
            'favoriteName': true,
            'locationFavoriteAddress': true,
            'locationFavoriteId': true
          },
          checkedRows: [],
          successToDisplay: 'Success message',
          pageIsLoading: jest.fn(),
          fetchRows: jest.fn(),
          searchLocations: jest.fn(),
          setTableRef: jest.fn()
        }
      }
    }

    test('matches previous snapshot', () => {
      let component = renderer.create(<ManageFavoritesPage {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
