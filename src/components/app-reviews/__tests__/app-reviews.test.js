jest.unmock('../app-reviews');
jest.unmock('axios');
jest.unmock('moment');
jest.unmock('../../truncate/truncate');
jest.unmock('../../rating/rating');

import AppReviews from '../app-reviews';
import Truncate from '../../truncate/truncate';
import {Rating} from '../../rating/rating';

describe('<AppReviews />', () => {

  const props = {
    reviews: [
      {
        appId: '12345',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        commentTitle: 'A Bad Review is Coming',
        reviewDate: '2017-05-16T15:59:55.025Z',
        reviewId: '12345',
        reviewStar: 1,
        userFirstName: 'Cletus Slackjaw',
        userLastName: 'of the House Yokel'
      }
    ]
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
        const component = renderer.create(
          <AppReviews {...props}></AppReviews>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
  });
});
