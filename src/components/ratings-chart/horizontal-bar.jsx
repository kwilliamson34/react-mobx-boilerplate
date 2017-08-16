import React from 'react';
import PropTypes from 'prop-types';

export default class HorizontalBar extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  static defaultProps = {
    data: {}
  }

  render() {
    const max = Math.max.apply(Math, this.props.data);
    return (
      <div className={'horizontal-bar-chart'}>
        {this.props.data.map((item, itemIndex) => {
          let size = 1;
          if (item > 0)
            size = item / max * 100;
          let style = {
            width: size + '%'
          }
          return (
            <div className="bar-wrapper" key={itemIndex + 'bar'}>
              <label className="ratings-container">
                <span className="ratings-number" aria-hidden="true">{(5 - itemIndex)}</span>
                <i aria-hidden="true" className="ratings-star icon-star"></i>
              </label>
              <div className="bar" style={style}>
                <div className="bar-value">
                  {item}
                  <span className="sr-only">&nbsp;of reviews gave {(5 - itemIndex)} stars</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
