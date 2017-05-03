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
            let size = item/max * 100;
            let style = {width:size + '%'}
            return (
              <div className="bar-wrapper">
                <label>
                  <img className="ratings-star" src="/images/star-outline.png" alt="Rating Star"/>
                  <span>{(itemIndex - 5)*-1}</span>
                </label>
                <div className={'bar'} style={style} key={itemIndex+'bar'}>
                  <b>{item}</b>
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
    data: PropTypes.array    // value the chart should show
};

HorizontalBar.defaultProps = {
    data: [190,330,52,290,700]
};