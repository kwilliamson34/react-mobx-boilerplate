import React from 'react';
import PropTypes from 'prop-types';


export default class HorizontalBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const max = Math.max.apply(Math, this.props.data);


		return (
			<div className={'horizontal-bar-chart'}>
        {
          this.props.data.map(function (item, itemIndex) {
						let size = 1;
						if (item > 0) size = item/max * 100;
            let style = {width:size + '%'}
            return (
              <div className="bar-wrapper" key={itemIndex+'bar'}>
                <label className="ratings-container">
									<i aria-hidden="true" className="ratings-star icon-star"></i>
                  <span className="ratings-number" aria-hidden="true">{(5-itemIndex)}</span>
                </label>
                <div className="bar" style={style}>
                  <div className="bar-value">{item} <span className="sr-only">{(5-itemIndex)} star reviews submitted</span></div>
                </div>
              </div>
            );
          })
        }
        </div>
		);
	}
}

HorizontalBar.propTypes = {
	data: PropTypes.array // value the chart should show
};

HorizontalBar.defaultProps = {
	data: [0]
};
