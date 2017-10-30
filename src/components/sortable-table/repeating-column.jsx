import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {computed} from 'mobx';

@observer
export class RepeatingColumn extends React.Component {

  static propTypes = {
    columnDataKey: PropTypes.string,
    className: PropTypes.string,
    headerContainsJsx: PropTypes.object,
    bindDataToEach: PropTypes.string,
    children: PropTypes.node
  }

  //TODO: determine best sr-only text
  // <span className="sr-only" aria-live="assertive" aria-relevant="text" aria-atomic="true">
  //   The table is now sorted by {this.props.columnName || this.props.columnToSort}
  //   {this.props.sortByAscending ? 'in ascending' : 'in descending'}
  //   order.
  // </span>

  render() {
    return (
      <div className={`table-header-column ${this.props.className}`}>
        <span>
          {
            this.props.headerContainsJsx
          }
        </span>
      </div>
    )
  }
}
