import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import Checkbox from '../forms/checkbox';

@observer
export class TableRow extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    handleOnChange: PropTypes.func,
    hasCheckbox: PropTypes.bool,
    checked: PropTypes.bool,
    checkedRows: PropTypes.object
  }

  static defaultProps = {
    hasCheckbox: false,
    checked: false,
    checkedRows: []
  }

  render() {
    return (
      <tr className={`sortable-table-row ${this.props.checked ? 'active' : ''}`} tabIndex="0">
        {
          this.props.hasCheckbox &&
          <th scope="row" className="table-row-checkbox">
            <Checkbox
              id={this.props.id.toString()}
              value={this.props.id.toString()}
              handleOnChange={this.props.handleOnChange}
              checked={this.props.checkedRows.indexOf(this.props.id.toString()) > -1}
              label={`Checkbox for row`}
              srOnlyLabel={true}/>
          </th>
        }
        {this.props.columns.map((column, i) => {
          return (
            <td key={`table-row-${i}`} className={column.className} tabIndex="0">
              <div className="row-contents-wrapper">
                {this.props.row[column.key]}
              </div>
              {
                column.inlineButtonJsx &&
                <div className="inline-button-wrapper" data-id={this.props.id} tabIndex="0">
                  {column.inlineButtonJsx}
                </div>
              }
            </td>
          )
        })}
      </tr>
    )
  }
}
