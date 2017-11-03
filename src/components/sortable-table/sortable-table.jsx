import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import {TableRow} from './table-row';

@observer
export class SortableTable extends React.Component {

  static propTypes = {
    keyToUseAsId: PropTypes.string.isRequired,
    children: PropTypes.array,
    tableId: PropTypes.string,
    caption: PropTypes.string,
    rows: PropTypes.array,
    activeRows: PropTypes.object,
    totalRowCount: PropTypes.number,
    shouldRenderRows: PropTypes.bool,
    activeColumn: PropTypes.string
  };

  static defaultProps = {
    rows: [],
    activeRows: []
  }

  constructor(props) {
    super(props);
    this.columns = [];
    this.notColumns = [];
  }

  componentWillMount() {
    this.parseChildren();
  }

  renderRows = (rows, columns) => {
    return rows.map((row, i) => {
      //identify which field we want to use as the id/value;
      const targetedId = row[this.props.keyToUseAsId];
      const rowIsActive = this.props.activeRows.indexOf(targetedId.toString()) > -1;
      return (
        <TableRow
          id={targetedId}
          columns={columns}
          row={row}
          rowIsActive={rowIsActive}
          key={targetedId}
          rowIndex={(i + 1)}
          totalRowsDisplayed={this.props.rows.length} />
      )
    })
  }

  parseChildren = () => {
    this.columns = this.props.children.filter(child => {
      return child.props.data === 'column';
    })
  }

  render() {
    return (
      <div aria-rowcount={this.props.totalRowCount} id={this.props.tableId} className={`sortable-table ${this.props.tableId}-class`}>
        {this.props.caption && <caption>{this.props.caption}</caption>}
        <div className="table-head">
          <span className="sr-only" tabIndex="0">{`You are currently on a table. There are ${this.columns.length} columns and ${this.props.totalRowCount} rows.`}</span>
          {this.props.children}
        </div>
        <div role="rowgroup" className="table-body">
          {this.props.shouldRenderRows && this.renderRows(this.props.rows, this.columns)}
        </div>
      </div>
    )
  }
}
