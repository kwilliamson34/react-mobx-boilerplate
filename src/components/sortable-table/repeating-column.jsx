import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class RepeatingColumn extends React.Component {

  static propTypes = {
    columnDataKey: PropTypes.string,
    columnClassName: PropTypes.string,
    headerContainsJsx: PropTypes.object
  }

  //TODO: determine best sr-only text

  render() {
    return (
      <div className={`table-head-column ${this.props.columnClassName}`}>
        <span>
          {
            this.props.headerContainsJsx
          }
        </span>
      </div>
    )
  }
}
