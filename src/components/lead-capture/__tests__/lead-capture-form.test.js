jest.unmock('../../forms/asForm');
jest.unmock('../lead-capture-form');
jest.unmock('../../../core/services/history.service');

import LeadCaptureForm from '../lead-capture-form';

describe('<LeadCaptureForm />', () => {
  let props = {
    store: {
      values: {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        contactAgreement: false
      },
      clearAlert: jest.fn(),
      clearSuccess: jest.fn(),
      formFieldRefList: [],
      checkFormForErrors: jest.fn(),
      clearFormFieldRefList: jest.fn(),
      fetchDefaultValues: jest.fn(),
      toggleContactAgreement: jest.fn()
    }
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component, tree;

      component = renderer.create(<LeadCaptureForm {...props} />);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
