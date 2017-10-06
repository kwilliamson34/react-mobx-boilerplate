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
    caption: PropTypes.string.isRequired,
    columns: PropTypes.array,
    rows: PropTypes.object,
    tableId: PropTypes.string
  };

  static defaultProps = {
    columns: [],
    rows: []
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
    this.store.toggleSort(key);
  }

  handleCheckboxChange = (e) => {
    console.log('handleCheckboxChange', e.target);
  }

  renderRows = (rows) => {
    //we'll just make sure this is formatted right in the computed
    //for now I just want it rendering;
    return rows.map((row, i) => {
      return <TableRow id={row.locationFavoriteId} row={row} checked={row.checked} onChange={this.handleCheckboxChange} key={`${this.props.caption}-table-${i}`}/>
    })
  }

  noResults = () => {
    return (
      <div className="my-apps-not-found" ref="noResults">
        <div className="as-h2">Sorry, no results were found.</div>
        <div className="as-h3">Adjust the filters to view your apps.</div>
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
          <caption>{this.props.caption}</caption>
          <thead>
            <tr>
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
            {this.renderRows(this.props.rows)}
          </tbody>
        </table>
        {!this.store.isLoading && this.noResults()}
      </div>
    )
  }

}
