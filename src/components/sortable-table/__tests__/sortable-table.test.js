jest.unmock('../sortable-table');
jest.unmock('../sortable-column');
jest.unmock('../table-row');

import {SortableTable} from '../sortable-table';
import {SortableColumn} from '../sortable-column';
import {TableRow} from '../table-row';

describe ('<SortableTable> snapshot tests:', () => {

  const renderEditButton = (
    <button className="as-link edit-location-button" tabIndex="-1">
      <i className="icon-pencil" aria-hidden="true" />
      <span>Edit</span>
    </button>
  )

  const renderMapItButton = (
    <button className="as-link map-it-button" tabIndex="-1">
      <i className="icon-map-marker" aria-hidden="true" />
      <span>Map It</span>
    </button>
  )

  const props = {
    store: {
      checkedRows: [],
      toggleSort: jest.fn(),
      handleCheckboxChange: jest.fn(),
      clearAllCheckboxes: jest.fn(),
      selectAllCheckboxes: jest.fn(),
      checkSelectAllCheckbox: false
    },
    columns: [
      {
        name: 'Name',
        key: 'favoriteName',
        inlineButtonJsx: renderEditButton,
        className: 'favorite-name-column col50'
      }, {
        name: 'Location/Address',
        key: 'locationFavoriteAddress',
        inlineButtonJsx: renderMapItButton,
        className: 'location-address-column col45'
      }
    ],
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
    sortDirections: {
      favoriteName: true,
      locationFavoriteAddress: true,
      locationFavoriteId: false
    },
    shouldRenderRows: true,
    tableId: 'manage-locations-table',
    idKey: 'locationFavoriteId',
    hasCheckboxRow: true,
    activeColumn: 'favoriteName'
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
