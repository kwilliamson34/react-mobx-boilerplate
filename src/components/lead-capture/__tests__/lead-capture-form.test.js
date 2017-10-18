jest.unmock('../../forms/asForm');
jest.unmock('../../../core/stores/lead-capture.store');

import {leadCaptureStore} from '../../../core/stores/lead-capture.store';
import LeadCaptureForm from '../lead-capture-form';

describe('<LeadCaptureForm />', () => {
  let props = {
    store: leadCaptureStore
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
