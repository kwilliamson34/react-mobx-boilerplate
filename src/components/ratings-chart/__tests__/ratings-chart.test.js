jest.unmock('axios');
jest.unmock('../ratings-chart');
jest.unmock('../doughnut');
jest.unmock('../horizontal-bar');
jest.unmock('../../rating/rating.jsx');

import RatingsChart from '../ratings-chart';
import DoughnutChart from '../doughnut';
import HorizontalBar from '../horizontal-bar';
import {Rating} from '../../rating/rating.jsx';
import {MemoryRouter} from 'react-router-dom';

describe('<RatingsChart />', () => {
  let props = {
      value: 3,
      reviewsTotal: 3,
      reviews: [
        {
          appId: '12345',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          commentTitle: 'A Bad Review is Coming',
          reviewDate: '2017-07-14 14:52:37.0',
          reviewId: '81',
          reviewStar: 1,
          userFirstName: 'Cletus Slackjaw',
          userLastName: 'of the House Yokel'
        },
        {
          appId: '12345',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          commentTitle: 'A Middle Review is Coming',
          reviewDate: '2017-07-14 15:52:37.0',
          reviewId: '82',
          reviewStar: 3,
          userFirstName: 'Cletus Slackjaw the Elder',
          userLastName: 'of the House Yokel'
        },
        {
          appId: '12345',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          commentTitle: 'A Good Review is Coming',
          reviewDate: '2017-07-14 16:52:37.0',
          reviewId: '83',
          reviewStar: 5,
          userFirstName: 'Cletus Slackjaw the Fat',
          userLastName: 'of the House Yokel'
        }
      ]
  };

    describe('renders', () => {
        test('matches snapshot for ratings-chart', () => {
          const component = renderer.create(
              <MemoryRouter>
                  <RatingsChart {...props} />
              </MemoryRouter>
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });

        test('matches snapshot for ratings-chart when only one review is passed in', () => {

          props = {
              value: 1.0,
              reviewsTotal: 1,
              reviews: [
                {
                  appId: '12345',
                  comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                  commentTitle: 'A Bad Review is Coming',
                  reviewDate: '2017-07-14 14:52:37.0',
                  reviewId: '81',
                  reviewStar: 1,
                  userFirstName: 'Cletus Slackjaw',
                  userLastName: 'of the House Yokel'
                }
              ]
            };

          const component = renderer.create(
              <MemoryRouter>
                  <RatingsChart {...props} />
              </MemoryRouter>
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });
        test('matches snapshot for ratings-chart when zero reviews are passed in', () => {

          props = {
              value: 0,
              reviewsTotal: 0,
              reviews: []
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
