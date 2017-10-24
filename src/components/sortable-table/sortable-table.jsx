import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import {SortableColumn} from './sortable-column';
import {TableRow} from './table-row';
import Checkbox from  '../forms/checkbox';

@observer
export class SortableTable extends React.Component {

  static propTypes = {
    store: PropTypes.shape({
      checkedRows: PropTypes.object,
      toggleSort: PropTypes.func,
      handleCheckboxChange: PropTypes.func,
      clearAllCheckboxes: PropTypes.func,
      selectAllCheckboxes: PropTypes.func,
      checkSelectAllCheckbox: PropTypes.bool
    }),
    tableId: PropTypes.string,
    idKey: PropTypes.string.isRequired,
    caption: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    shouldRenderRows: PropTypes.bool,
    activeColumn: PropTypes.string,
    sortDirections: PropTypes.object,
    hasCheckboxRow: PropTypes.bool
  };

  static defaultProps = {
    columns: [],
    rows: [],
    hasCheckboxRow: false
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  handleToggleSort = (key) => {
    this.store.toggleSort(key);
  }

  handleRowCheckboxOnChange = (target) => {
    if (target.type === 'checkbox') {
      this.store.handleCheckboxChange(target.value);
    }
  }

  handleSelectAll = () => {
    this.store.checkedRows.length === this.props.rows.length
      ? this.store.clearAllCheckboxes()
      : this.store.selectAllCheckboxes();
  }

  renderSelectAllCheckbox = () => {
    return (
      <th className="select-all-checkbox col4">
        <Checkbox
          id="select-all-checkbox"
          label="Select or Deselect All Checkboxes"
          value="Select or Deselect All Checkboxes"
          labelIsSrOnly={true}
          handleOnChange={this.handleSelectAll}
          checked={this.store.checkSelectAllCheckbox}/>
      </th>
    )
  }

  renderColumns = () => {
    return this.props.columns.map((col, i) => {
      const sortByAscending = this.props.sortDirections[col.key];
      const isActive = this.props.activeColumn === col.key;
      return (
        <SortableColumn
          key={`sortable-column-${i}`}
          toggleSort={this.handleToggleSort}
          sortByAscending={sortByAscending}
          isActive={isActive}
          columnName={col.name}
          columnToSort={col.key}
          className={col.className}>
          {col.name}
        </SortableColumn>
      )
    })
  }

  renderRows = (rows, columns) => {
    return rows.map(row => {
      //identify which field we want to use as the id/value;
      const targetedId = row[this.props.idKey];
      return (
        <TableRow
          id={targetedId}
          columns={columns}
          row={row}
          checkedRows={this.store.checkedRows}
          hasCheckbox={this.props.hasCheckboxRow}
          handleOnChange={this.handleRowCheckboxOnChange}
          key={targetedId}/>
      )
    })
  }

  render() {
    return (
      <div>
        <table id={this.props.tableId} className={`${this.props.tableId}-class table-responsive sortable-table`}>
          {this.props.caption && <caption>{this.props.caption}</caption>}
          <thead>
            <tr>
              {this.props.hasCheckboxRow && this.renderSelectAllCheckbox()}
              {this.renderColumns()}
            </tr>
          </thead>
          <tbody>
            {this.props.shouldRenderRows && this.renderRows(this.props.rows, this.props.columns)}
          </tbody>
        </table>
      </div>
    )
  }
}
