jest.unmock('../table-column');

import {TableColumn} from '../table-column';

describe ('<TableColumn> snapshot tests: ', () => {

  const props = {
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
        <TableColumn {...props} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  })
})
