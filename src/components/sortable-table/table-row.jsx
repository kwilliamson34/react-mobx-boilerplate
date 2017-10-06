import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class TableRow extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    row: PropTypes.object,
    onChange: PropTypes.func,
    buttonJsx: PropTypes.object,
    checked: PropTypes.bool
  }

  static defaultProps = {
    checked: false
  }

  handleOnChange = (e) => {
    console.log('handleOnChange', e.target);
  }

  render() {
    return (
      <tr className={`sortable-table-row ${this.props.checked ? 'active' : ''}`} tabIndex="0">
        <th scope="row">
          <input
            role="checkbox"
            checked={this.props.checked}
            value={this.props.data.id}
            onChange={this.handleOnChange}/>
        </th>
        {Object.keys(this.props.row).map(col => {
          return (
            <td>
              <p>
                {this.props.row[col]}
              </p>
            </td>
          )
        })}
      </tr>
    )
  }
}
