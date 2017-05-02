import React from 'react';
import PropTypes from 'prop-types';


export default class HorizontalBar extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const max = Math.max.apply(Math, this.props.data);
      return (
        <div className={'Charts horizontal'}>
          {
            this.props.data.map(function (item, itemIndex) {
              let size = item/max * 100;
              let style = {width:size + '%'}
              return (
                <div className={ 'Charts--item '} style={ style } key={ itemIndex }>
                  <label>{(itemIndex - 5)*-1}</label>
                  <b>{ item }</b>
                </div>
              );
            })
          }

        </div>
        );
    }
  }

HorizontalBar.propTypes = {
    data: PropTypes.number    // value the chart should show
};

HorizontalBar.defaultProps = {
    data: [190,330,52,290,700]
};