import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import {TableRow} from './table-row';

@observer
export class SortableTable extends React.Component {

  static propTypes = {
    keyToUseAsId: PropTypes.string.isRequired,
    refList: PropTypes.object,
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
    //for srOnly purposes. "relevant" defined as any column containing info or actions in its header that affect or describe the contents of its rows.
    this.relevantColumnsCount = 0;
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
    });

    this.columns.map(column => {
      return Array.isArray(column.props.children)
        ? column.props.children.forEach(tableColumn => {
          this.parseTableColumn(tableColumn);
        })
        : this.parseTableColumn(column.props.children);
    });
  }

  parseTableColumn = (tableColumn) => {
    this.relevantColumnsCount += Boolean(tableColumn.props.additionalHeaderActions || tableColumn.props.headerLabel);
  }

  render() {
    return (
      <div aria-rowcount={this.props.totalRowCount} id={this.props.tableId} className={`sortable-table ${this.props.tableId}-class`}>
        {this.props.caption && <caption>{this.props.caption}</caption>}
        <div ref={(ref) => this.headers = ref} className="table-head">
          {this.props.children}
        </div>
        <div ref={(ref) => this.rows = ref} role="rowgroup" className="table-body">
          {this.props.shouldRenderRows && this.renderRows(this.props.rows, this.columns)}
        </div>
      </div>
    )
  }
}
