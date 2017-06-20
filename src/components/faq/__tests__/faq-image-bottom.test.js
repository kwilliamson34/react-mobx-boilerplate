jest.unmock('../faq-image-bottom');

import { FaqImageBottom } from '../faq-image-bottom.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('<FaqImageBottom />', () => {

  describe('render testing', () => {
    test('matches snapshot', () => {
        const component = renderer.create(
            <MemoryRouter>
                <FaqImageBottom />
            </MemoryRouter>
        );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});