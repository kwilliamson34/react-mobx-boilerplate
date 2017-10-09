import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import _ from 'lodash';

import {SortableColumn} from './sortable-column';
import {TableRow} from './table-row';
import Checkbox from  '../forms/checkbox';

@observer
export class SortableTable extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    idKey: PropTypes.string.isRequired,
    caption: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    hasCheckboxRow: PropTypes.bool,
    tableId: PropTypes.string
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
    console.log('handleToggleSort', key);
    this.store.toggleSort(key);
  }

  handleOnChange = (target) => {
    console.log('handleOnChange', target);
    if (target.type === 'checkbox') {
      this.store.handleCheckboxChange(target.value);
    }
  }

  handleSelectAll = () => {
    this.store.checkedRows.length === this.props.rows.length
      ? this.store.clearAllCheckboxes()
      : this.store.selectAllCheckboxes();
  }

  renderRows = (rows, columns) => {
    //as rows are objects, enforce render selection and order by pulling the keys off the original columns array;
    const enforcedOrder = columns.map(col => col.key);
    return rows.map(row => {
      //identify which field we want to use as the id value;
      const targetedId = row[this.props.idKey];
      return (
        <TableRow
          id={targetedId}
          order={enforcedOrder}
          row={row}
          checkedRows={this.store.checkedRows.peek()}
          hasCheckbox={this.props.hasCheckboxRow}
          handleOnChange={this.handleOnChange}
          key={targetedId}/>
      )
    })
  }

  noResults = () => {
    return (
      <div className="no-results-block" ref="noResults">
        {this.props.noResultsJsx}
      </div>
    )
  }

  render() {
    return (
      <div className="">
        <span className="sr-only" aria-live="assertive" aria-atomic="true">{this.props.caption}
          is now sorted by {this.store.activeColumn}
          in {this.store.sortDirections[this.props.id] ? 'ascending' : 'descending'}</span>
        <table className="my-apps-table" id={this.props.tableId}>
          {this.props.caption && <caption>{this.props.caption}</caption>}
          <thead>
            <tr>
              {
                this.props.hasCheckboxRow &&
                  <th className="col-xs-1">
                    <Checkbox
                      label={''}
                      id={'select-all-checkbox'}
                      value={''}
                      handleOnChange={this.handleSelectAll}
                      checked={this.store.checkedRows.length === this.props.rows.length}/>
                  </th>
              }
              {
                this.props.columns.map((col, i) => {
                  const sortDirection = this.store.sortDirections[col.key];
                  const isActive = this.store.activeColumn === col.key;
                  return (
                    <SortableColumn
                      key={`sortable-column-${i}`}
                      toggleSort={this.handleToggleSort}
                      sortDirection={sortDirection}
                      isActive={isActive}
                      columnToSort={col.key}
                      className={col.className}>
                      {col.name}
                    </SortableColumn>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {this.renderRows(this.props.rows, this.props.columns)}
          </tbody>
        </table>
        {!this.store.isLoading && this.store.noResults && this.noResults()}
      </div>
    )
  }

}
