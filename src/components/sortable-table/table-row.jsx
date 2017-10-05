import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class SortableTableRow extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    button: PropTypes.object,
    checked: PropTypes.bool
  }

  static defaultProps = {
    checked: false
  }

  handleFocus = (e) => {

  }

  render() {
    return (
      <tr className={`sortable-table-row ${this.props.checked ? 'active' : ''}`} tabIndex="0">
        <th scope="row">
        </th>
      </tr>
    )
  }
}
