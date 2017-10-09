import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class TableRow extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    buttonJsx: PropTypes.object,
    hasCheckbox: PropTypes.bool,
    checked: PropTypes.bool
  }

  static defaultProps = {
    hasCheckbox: false,
    checked: false
  }

  render() {
    return (
      <tr className={`sortable-table-row ${this.props.checked ? 'active' : ''}`} tabIndex="0">
        {
          this.props.hasCheckbox &&
          <th scope="row" className="col-xs-1">
            <input
              type="checkbox"
              checked={this.props.checked}
              value={this.props.id}
              id={this.props.id}
              onChange={this.props.onChange}/>
          </th>
        }
        {this.props.order.map((column, i) => {
          return (
            <td key={`table-row-${i}`}>
              <p>
                {this.props.row[column]}
              </p>
            </td>
          )
        })}
      </tr>
    )
  }
}
