jest.unmock('../table-row');

import {TableRow} from '../table-row';

describe ('<TableRow> snapshot tests: ', () => {

  const props = {
    id: '12345',
    row: {
      favoriteName: 'Best Pineapple Pizza',
      locationFavoriteAddress: '100 Hawaiian Street',
      locationFavoriteId: '12345'
    },
    columns: [
      {
        props: {
          headerLabel: 'Name',
          className: 'center-container',
          children: {
            props: {
              columnDataKey: 'favoriteName',
              columnClassName: 'favorite-name-column'
            }
          }
        }
      }
    ],
    rowIsActive: false,
    rowIndex: 1,
    totalRowsDisplayed: 7
  }

  describe('render tests:', () => {
    test('should render with props', () => {
      const component = renderer.create(
        <TableRow {...props} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  })
})
