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
    inlineButtonJsx: PropTypes.object,
    hasCheckbox: PropTypes.bool,
    checkedRows: PropTypes.array
  }

  static defaultProps = {
    hasCheckbox: false,
    checkedRows: []
  }

  // <input
  //   type="checkbox"
  //   checked={this.props.checked}
  //   value={this.props.id}
  //   id={this.props.id}
  //   onChange={this.props.onChange}/>

  render() {
    return (
      <tr className={`sortable-table-row ${this.props.checked ? 'active' : ''}`} tabIndex="0">
        {
          this.props.hasCheckbox &&
          <th scope="row" className="col-xs-1">
            <Checkbox
              id={this.props.id.toString()}
              value={this.props.id.toString()}
              handleOnChange={this.props.handleOnChange}
              checked={this.props.checkedRows.indexOf(this.props.id.toString()) > -1}
              label={''}/>
          </th>
        }
        {this.props.columns.map((column, i) => {
          return (
            <td key={`table-row-${i}`}>
              <p>
                {this.props.row[column.key]}
              </p>
              {column.inlineButtonJsx}
            </td>
          )
        })}
      </tr>
    )
  }
}
