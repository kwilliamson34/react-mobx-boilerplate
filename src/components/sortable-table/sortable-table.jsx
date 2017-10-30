import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import {TableRow} from './table-row';

@observer
export class SortableTable extends React.Component {

  static propTypes = {
    children: PropTypes.array,
    tableId: PropTypes.string,
    keyToUseAsId: PropTypes.string.isRequired,
    caption: PropTypes.string,
    rows: PropTypes.array,
    activeRows: PropTypes.object,
    shouldRenderRows: PropTypes.bool,
    activeColumn: PropTypes.string
  };

  static defaultProps = {
    rows: [],
    activeRows: []
  }

  renderRows = (rows, columns) => {
    return rows.map(row => {
      //identify which field we want to use as the id/value;
      const targetedId = row[this.props.keyToUseAsId];
      const rowIsActive = this.props.activeRows.indexOf(targetedId.toString()) > -1;
      return (
        <TableRow
          id={targetedId}
          columns={columns}
          row={row}
          rowIsActive={rowIsActive}
          key={targetedId} />
      )
    })
  }

  render() {
    return (
      <div id={this.props.tableId} className={`sortable-table ${this.props.tableId}-class`}>
        {this.props.caption && <caption>{this.props.caption}</caption>}
        <div className="table-head">
          {this.props.children}
        </div>
        <div className="table-body">
          {this.props.shouldRenderRows && this.renderRows(this.props.rows, this.props.children)}
        </div>
      </div>
    )
  }
}
