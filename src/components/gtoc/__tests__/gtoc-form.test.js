jest.unmock('../../forms/asForm');
jest.unmock('../gtoc-form');

import GtocForm from '../gtoc-form';

describe('<GtocForm />', () => {
  let props = {
    store: {
      values: {
        gtocSelection: '',
        email: 'default@test.mail',
        femaList: []
      },
      clearAlert: jest.fn(),
      clearSuccess: jest.fn(),
      selectAll: jest.fn(),
      clearAll: jest.fn(),
      formFieldRefList: [],
      clearFormFieldRefList: jest.fn(),
      fetchDefaultValues: jest.fn()
    }
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component, tree;

      component = renderer.create(
        <GtocForm {...props} />
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
})
