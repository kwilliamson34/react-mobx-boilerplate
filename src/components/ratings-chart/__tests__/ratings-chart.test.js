jest.unmock('../ratings-chart');

import RatingsChart from '../ratings-chart';
import { MemoryRouter } from 'react-router-dom';

describe('<RatingsChart />', () => {
    describe('renders', () => {
        test('matches snapshot for ratings-chart', () => {
          let props = {
              value: 4.1,
              reviewsTotal: 44,
              data: [14, 22, 8, 5, 2]
          };

          const component = renderer.create(
              <MemoryRouter>
                  <RatingsChart {...props} />
              </MemoryRouter>
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });
    });
});