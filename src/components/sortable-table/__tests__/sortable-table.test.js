jest.unmock('../sortable-table');
jest.unmock('../table-column');
jest.unmock('../table-row');

import {SortableTable} from '../sortable-table';
import {TableColumn} from '../table-column';

describe ('<SortableTable> snapshot tests:', () => {

  const props = {
    rows: [
      {
        favoriteName: 'Best Pineapple Pizza',
        locationFavoriteAddress: '100 Hawaiian Street',
        locationFavoriteId: '12345'
      },
      {
        favoriteName: 'Best Coconut Slushies',
        locationFavoriteAddress: '1414 Cocostuff Plaza',
        locationFavoriteId: '54321'
      }
    ],
    activeRows: [
      '12345'
    ],
    totalRowCount: 2,
    activeColumn: 'favoriteName',
    shouldRenderRows: true,
    tableId: 'manage-locations-table',
    keyToUseAsId: 'locationFavoriteId'
  }

const columnProps = {
  toggleSort: jest.fn(),
  sortByAscending: true,
  isActive: true,
  columnDataKey: 'favoriteName',
  columnClassName: 'favorite-name-column',
  headerLabel: 'Name'
}

  describe('render tests:', () => {
    test('should render with props', () => {
      const component = renderer.create(
        <SortableTable {...props}>
          <span>
            <TableColumn {...columnProps} />
          </span>
          <span>
            <TableColumn {...columnProps} />
          </span>
        </SortableTable>
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  })

})
