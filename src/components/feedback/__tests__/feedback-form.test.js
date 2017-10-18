jest.unmock('../../forms/asForm');
jest.unmock('../feedback-form');
jest.unmock('../../../core/services/history.service');

import FeedbackForm from '../feedback-form';

describe('<FeedbackForm />', () => {
  let props = {
    store: {
      values: {
        topic: '',
        subject: '',
        details: '',
        operatingSystem: '',
        email: '',
        phone: '',
        likely: ''
      },
      emailIsRequired: true,
      formFieldRefList: [],
      clearFormFieldRefList: jest.fn(),
      fetchDefaultValues: jest.fn(),
      toggleContactAgreement: jest.fn()
    }
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      let component, tree;

      component = renderer.create(
        <FeedbackForm {...props} />
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
