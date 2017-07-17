jest.unmock('../rating');
jest.unmock('axios');

import {Rating} from '../rating';

describe('<Rating /> ', () => {
  let props = {
    rating: 1,
    reviewCount: 1,
    showRatingNumber: true,
    showReviewCount: true,
    truncateStars: true
  }

  describe('render tests', () => {
    test('should match previous snapshot with default props', () => {
      const component = renderer.create(
        <Rating {...props}></Rating>
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('should match previous snapshot with alternative props', () => {
      
      props.rating = 1.5;
      props.reviewCount = 2;
      props.showRatingNumber = false;
      props.showReviewCount = false;
      props.truncateStars = false;

      const component = renderer.create(
        <Rating {...props}></Rating>
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
