jest.unmock('../faq-header-top');

import { FaqHeaderTop } from '../faq-header-top.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('<FaqHeaderTop />', () => {

  describe('render testing', () => {
    test('matches snapshot', () => {
        const component = renderer.create(
            <MemoryRouter>
                <FaqHeaderTop />
            </MemoryRouter>
        );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});