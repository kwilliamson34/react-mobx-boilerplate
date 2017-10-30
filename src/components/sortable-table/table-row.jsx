import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class TableRow extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    rowIsActive: PropTypes.bool
  }

  static defaultProps = {
    rowIsActive: false
  }

  render() {
    return (
      <div className={`table-row ${this.props.rowIsActive ? 'active' : ''}`}>
        {this.props.columns.map((column, i) => {
          let renderString = '';
          if (column.type.name === 'RepeatingColumn') {
            renderString = column.props.repeatingJsx(this.props.id);
          } else {
            renderString = this.props.row[column.props.columnDataKey];
          }
          return (
            <div key={`table-row-${i}`} className={`table-cell ${column.props.columnClassName}`}>
              <div className="flex-wrapper">
                <div className="row-contents-wrapper">
                  <span>{renderString}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
