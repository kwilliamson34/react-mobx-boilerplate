import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {computed} from 'mobx';

import Checkbox from '../forms/checkbox';

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

  // @computed get rowIsChecked() {
  //   return this.props.checkedRows.indexOf(this.props.id.toString()) > -1;
  // }
  //
  // handleInlineButtonClick = (callback, id) => {
  //   callback(id);
  // }

  render() {
    return (
      <div className={`sortable-table-row ${this.props.rowIsActive ? 'active' : ''}`} tabIndex="0">
        {this.props.columns.map((column, i) => {
          // console.log('column', column);
          let renderString = '';
          if (column.type.name === 'RepeatingColumn') {
            renderString = column.props.repeatingJsx(this.props.id);
          } else {
            renderString = this.props.row[column.props.columnDataKey];
          }
          // console.log('renderString', renderString);
          return (
            <div key={`table-row-${i}`} className={`table-row ${column.props.className}`}>
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
