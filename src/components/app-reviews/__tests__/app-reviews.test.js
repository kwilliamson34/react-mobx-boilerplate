jest.unmock('../app-reviews');

jest.unmock('../../truncate-comment/truncate-comment');
jest.unmock('../../rating/rating');

import AppReviews from '../app-reviews';

describe('Test test', () => {
  it('should add two and two to equal four for god sake', () => {
    expect(2 + 2).toBe(4);
  });
});

describe('<AppReviews />', () => {
  let props = {
    reviews: [{
        commentTitle: 'Comment Title',
        userFirstName: 'Firstname',
        userLastName: 'Lastname',
        reviewStar: 5,
        reviewId: '12345',
        reviewDate: '2017-05-16T15:59:55.025Z',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      }]
    };

  describe('renders', () => {
    test('matches previous snapshot', () => {
        const component = renderer.create(
          <AppReviews {...props} />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
  });
});
