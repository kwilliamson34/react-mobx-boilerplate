jest.unmock('../sortable-table');
jest.unmock('../table-column');
jest.unmock('../table-row');

import {SortableTable} from '../sortable-table';
import {TableColumn} from '../table-column';
import {TableRow} from '../table-row';

describe ('<SortableTable> snapshot tests:', () => {

  const renderEditButton = (
    <button className="as-link edit-location-button" onClick={() => jest.fn()}>
      <i className="icon-pencil" aria-hidden="true" />
      <span>Edit</span>
    </button>
  )

  const renderMapItButton = (
    <button className="as-link map-it-button" onClick={() => jest.fn()}>
      <i className="icon-map-marker" aria-hidden="true" />
      <span>Map It</span>
    </button>
  )

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
    shouldRenderRows: true,
    tableId: 'manage-locations-table',
    keyToUseAsId: 'locationFavoriteId'
  }

  describe('render tests:', () => {
    test('should render with props', () => {
      const component = renderer.create(
        <SortableTable {...props} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  })

})
