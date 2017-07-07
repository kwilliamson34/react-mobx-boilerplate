import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {utilsService} from '../../core/services/utils.service';

@observer
export class Rating extends React.Component {

  static propTypes = {
    rating: PropTypes.number,
    reviewCount: PropTypes.number.isRequired,
    showRatingNumber: PropTypes.bool,
    showReviewCount: PropTypes.bool,
    truncateStars: PropTypes.bool
  }

  static defaultProps = {
    rating: 0,
    reviewCount: 0,
    showRatingNumber: false,
    showReviewCount: false,
    truncateStars: false
  }

  starTemplate(starImage, i) {
    return (
      <span key={i} aria-hidden="true" className={starImage}></span>
    )
  }

  convertRatingToStars(rating) {
    const stars = [];
    let remaining = rating;

    for (let i = 5; i > 0; i--) {
      if (remaining >= 1) {
        stars.push(this.starTemplate('ratings-star icon-star', stars.length));
        remaining--;
      } else if (remaining > 0) {
        stars.push(this.starTemplate('ratings-star icon-star-half-o', stars.length));
        remaining--;
      } else {
        stars.push(this.starTemplate('ratings-star icon-star-o', stars.length));
      }
    }
    return stars;
  }

  render() {
    return (
      <div className="ratings-container">
        {this.props.reviewCount > 0
          ? <span>
              {this.props.showRatingNumber &&
                <span className="ratings-number">
                  <span className="sr-only">Rating of&nbsp;</span>
                  {utilsService.formatRating(this.props.rating)}&nbsp;
                </span>
              }
              <span className="ratings-stars">
                {this.props.truncateStars
                  ? <span className="ratings-star icon-star" aria-hidden></span>
                  : this.convertRatingToStars(this.props.rating)}
              </span>
              {this.props.showReviewCount &&
                <span className="app-reviews-count hidden-xs">
                  <span className="sr-only">Reviewed by</span>
                  &nbsp;({this.props.reviewCount})
                  <span className="sr-only">&nbsp;people</span>
                </span>
              }
            </span>
          : <span>No Reviews</span>
        }
      </div>
    );
  }
}
