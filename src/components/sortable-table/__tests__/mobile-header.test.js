jest.unmock('../mobile-header');
jest.unmock('../../forms/checkbox');

import {MobileHeader} from '../mobile-header';

describe ('<MobileHeader> snapshot tests: ', () => {

  const props = {
    toggleSort: jest.fn(),
    sortByAscending: true,
    handleSelectAllCheckbox: jest.fn(),
    checkSelectAllCheckbox: false,
    sortData: 'favoriteName',
    sortName: 'Name',
    className: 'mobile-header'
  }

  describe('render tests:', () => {
    test('should render with props', () => {
      const component = renderer.create(
        <MobileHeader {...props} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  })
})
