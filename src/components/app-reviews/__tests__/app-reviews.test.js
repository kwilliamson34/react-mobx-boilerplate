jest.unmock('../app-reviews');
jest.unmock('mobx');

jest.unmock('date-fns');
jest.unmock('../../truncate/truncate');
jest.unmock('../../rating/rating');

import AppReviews from '../app-reviews';

describe('<AppReviews />', () => {

  let props = {
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
  }

  describe('render tests', () => {
    test('renders one review and does not render Load More button', () => {
        const component = renderer.create(
          <AppReviews {...props} />
        )

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        let appReviewsComponent = TestUtils.renderIntoDocument(
          <AppReviews {...props} />
        )

        let loadMoreButton = TestUtils.scryRenderedDOMComponentsWithClass(
          appReviewsComponent, 'load-more-button'
        );

        expect(loadMoreButton.length).toBe(0);
    });

    test('renders three reviews and displays the Load More button', () => {

        props.reviews[1] = {
          appId: '12345',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          commentTitle: 'Another Bad Review is Coming',
          reviewDate: '2017-07-14 15:52:37.0',
          reviewId: '82',
          reviewStar: 1,
          userFirstName: 'Cletus Slackjaw the Elder',
          userLastName: 'of the House Yokel'
        }
        props.reviews[2] = {
          appId: '12345',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          commentTitle: 'A Good Review is Coming',
          reviewDate: '2017-07-14 16:52:37.0',
          reviewId: '83',
          reviewStar: 5,
          userFirstName: 'Cletus Slackjaw the Fat',
          userLastName: 'of the House Yokel'
        }
        props.reviews[3] = {
          appId: '12345',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          commentTitle: 'A Middling Review is Coming',
          reviewDate: '2017-07-14 17:52:37.0',
          reviewId: '84',
          reviewStar: 3,
          userFirstName: 'Cletus Slackjaw the Bald',
          userLastName: 'of the House Yokel'
        }

        const component = renderer.create(
          <AppReviews {...props} />
        )

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        let appReviewsComponent = TestUtils.renderIntoDocument(
          <AppReviews {...props} />
        )
        const loadMoreButton = TestUtils.scryRenderedDOMComponentsWithClass(
          appReviewsComponent, 'load-more-button'
        );
        expect(loadMoreButton.length).toBe(1);
    });
  });

  describe('user interaction tests', () => {
    test('renders four reviews and no Load More button following a simulated click on the Load More button', () => {
        props.reviews[1] = {
          appId: '12345',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          commentTitle: 'Another Bad Review is Coming',
          reviewDate: '2017-07-14 15:52:37.0',
          reviewId: '82',
          reviewStar: 1,
          userFirstName: 'Cletus Slackjaw the Elder',
          userLastName: 'of the House Yokel'
        }
        props.reviews[2] = {
          appId: '12345',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          commentTitle: 'A Good Review is Coming',
          reviewDate: '2017-07-14 16:52:37.0',
          reviewId: '83',
          reviewStar: 5,
          userFirstName: 'Cletus Slackjaw the Fat',
          userLastName: 'of the House Yokel'
        }
        props.reviews[3] = {
          appId: '12345',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          commentTitle: 'A Middling Review is Coming',
          reviewDate: '2017-07-14 17:52:37.0',
          reviewId: '84',
          reviewStar: 3,
          userFirstName: 'Cletus Slackjaw the Bald',
          userLastName: 'of the House Yokel'
        }

        let appReviewsComponent = TestUtils.renderIntoDocument(
          <AppReviews {...props} />
        )
        let loadMoreButton = TestUtils.scryRenderedDOMComponentsWithClass(
          appReviewsComponent, 'load-more-button'
        );
        expect(loadMoreButton.length).toBe(1);

        TestUtils.Simulate.click(loadMoreButton[0]);

        loadMoreButton = TestUtils.scryRenderedDOMComponentsWithClass(
          appReviewsComponent, 'load-more-button'
        );
        expect(loadMoreButton.length).toBe(0);
    });
  });
});
