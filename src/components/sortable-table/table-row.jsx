import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class SortableTableRow extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    button: PropTypes.object,
    checked: PropTypes.bool
  }

  static defaultProps = {
    checked: false
  }

  handleOnChange = (e) => {

  }

  render() {
    return (
      <tr className={`sortable-table-row ${this.props.checked ? 'active' : ''}`} tabIndex="0">
        <th scope="row">
          <input
            role="checkbox"
            checked={this.props.checked}
            value={this.props.data.id}
            onChange={this.onChange}/>
        </th>
      </tr>
    )
  }
}
