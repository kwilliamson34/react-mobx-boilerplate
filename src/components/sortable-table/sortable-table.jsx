import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import {TableRow} from './table-row';

@observer
export class SortableTable extends React.Component {

  static propTypes = {
    keyToUseAsId: PropTypes.string.isRequired,
    children: PropTypes.node,
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
  }

  componentWillMount() {
    //columns and other header elements come in as props.children. parseChildren() separates the column containers (delineated by spans) from other elements;
    this.parseChildren();
  }

  renderRows = (rows, columns) => {
    return rows.map((row, i) => {
      //identify which property on the row object we want to use as the id/value;
      const targetedId = row[this.props.keyToUseAsId];
      //rowIndex is for use with aria-rowindex and sr-only row description, to tell screenreaders the position of the row in the table;
      const rowIndex = i + 1;
      const rowIsActive = this.props.activeRows.indexOf(targetedId.toString()) > -1;
      return (
        <TableRow
          id={targetedId}
          columns={columns}
          row={row}
          rowIsActive={rowIsActive}
          key={targetedId}
          rowIndex={rowIndex}
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
        <div ref={(ref) => this.headers = ref} className="table-head">
          <span className="sr-only" tabIndex="0">{`You are currently on a table. There are ${this.columns.length} columns and ${this.props.totalRowCount} rows.`}</span>
          {this.props.children}
        </div>
        <div ref={(ref) => this.rows = ref} role="rowgroup" className="table-body">
          {this.props.shouldRenderRows && this.renderRows(this.props.rows, this.columns)}
        </div>
      </div>
    )
  }
}
