jest.unmock('../faq-image-top');

import { FaqImageTop } from '../faq-image-top.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('<FaqImageTop />', () => {

  describe('render testing', () => {
    test('matches snapshot', () => {
        const component = renderer.create(
            <MemoryRouter>
                <FaqImageTop />
            </MemoryRouter>
        );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});