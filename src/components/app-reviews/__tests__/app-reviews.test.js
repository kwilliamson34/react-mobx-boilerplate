jest.unmock('../app-reviews');
jest.unmock('../../truncate-comment/truncate-comment');
jest.unmock('../../rating/rating');

import AppReviews from '../app-reviews';

describe('<AppReviews />', () => {
  let props = {
    reviews: [{
      subject: 'Review Subject',
      author: 'Review Author',
      rating: 5,
      date: 'December 23rd, 2012',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }]
  };

  describe('It should render', () => {
    test('matches previous snapshot', () => {
      const component = renderer.create(
        <AppReviews {...props} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
