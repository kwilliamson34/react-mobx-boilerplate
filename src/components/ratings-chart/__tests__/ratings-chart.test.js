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
        test('matches snapshot for ratings-chart when only one review is passed in', () => {
          let props = {
              value: 3.0,
              reviewsTotal: 1,
              data: [0, 0, 1, 0, 0]
          };

          const component = renderer.create(
              <MemoryRouter>
                  <RatingsChart {...props} />
              </MemoryRouter>
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });
        test('matches snapshot for ratings-chart when zeroes are passed in', () => {
          let props = {
              value: 0,
              reviewsTotal: 0,
              data: [0, 0, 0, 0, 0]
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
