import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import _ from 'lodash';

import {SortableColumn} from './sortable-column';
import {TableRow} from './table-row';

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

  handleRowSelection = (e, app) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.store.rowSelected(app);
    }
  };

  handleToggleSort = (key) => {
    console.log('handleToggleSort', key);
    this.store.toggleSort(key);
  }

  handleOnChange = (e) => {
    console.log('handleOnChange', e.target);
    if (e.target.type === 'checkbox') {
      console.log('DING');
      this.store.handleCheckboxChange(e.target.value);
    }
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
          checked={this.store.rowIsChecked}
          onChange={this.handleOnChange}
          key={targetedId}
          hasCheckbox={this.props.hasCheckboxRow}/>
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
          in {this.props.store.sortDirections[this.props.list] ? 'ascending' : 'descending'}</span>
        <table className="my-apps-table" id={this.props.tableId}>
          {this.props.caption && <caption>{this.props.caption}</caption>}
          <thead>
            <tr>
              {
                this.props.hasCheckboxRow &&
                  <th className="col-xs-1">
                    <input type="checkbox"/>
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
                      columnWidth={col.columnWidth}>
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
