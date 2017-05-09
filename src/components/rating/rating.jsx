import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

@observer
export class Rating extends React.Component {

    constructor(props) {
        super(props);
    }

    starTemplate(starImage, i) {
        return  (
            <span key={i} aria-hidden="true" ><img className="ratings-star" src={starImage} alt="Rating Star"/></span>
        )
    }

    convertRatingToStars(rating) {
        const stars = [];
        let remaining = rating;
        for( let i = 5 ; i > 0 ; i-- ){
            if (remaining >= 1){
                stars.push(this.starTemplate('/images/star.png', stars.length));
                remaining--;
            } else if (remaining > 0 ){
                stars.push(this.starTemplate('/images/star-half.png', stars.length));
                remaining--;
            } else {
                stars.push(this.starTemplate('/images/star-outline.png', stars.length));
            }
        }
        return stars;
    }

    render() {
        let stars = this.convertRatingToStars(this.props.rating)
        return (
            <div className="ratings-container">
                <span className="ratings-number">
                    <span className="sr-only">Rating of</span>
                    {this.props.rating}
                </span>
                <span className="ratings-stars">
                    {stars.map((star) => {
                        return star;
                    })}
                </span>
            </div>
        );
    }
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired
};

Rating.defaultProps = {
    rating: 0
}
