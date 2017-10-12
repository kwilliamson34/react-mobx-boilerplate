import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {computed} from 'mobx';

import {SortableColumn} from './sortable-column';
import {TableRow} from './table-row';
import Checkbox from  '../forms/checkbox';

@observer
export class SortableTable extends React.Component {

  static propTypes = {
    store: PropTypes.shape({
      checkedRows: PropTypes.object,
      showSearchResults: PropTypes.bool,
      isLoading: PropTypes.bool,
      showDeleteModal: PropTypes.func,
      toggleSort: PropTypes.func,
      handleCheckboxChange: PropTypes.func,
      clearAllCheckboxes: PropTypes.func,
      selectAllCheckboxes: PropTypes.func,
      advancePagination: PropTypes.func
    }),
    tableId: PropTypes.string,
    idKey: PropTypes.string.isRequired,
    caption: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    activeColumn: PropTypes.string,
    sortDirections: PropTypes.object,
    noFetchResultsJsx: PropTypes.object,
    noSearchResultsJsx: PropTypes.object,
    allRowsCount: PropTypes.number,
    hasCheckboxRow: PropTypes.bool,
    pagination: PropTypes.bool
  };

  static defaultProps = {
    columns: [],
    rows: [],
    allRowsCount: 0,
    hasCheckboxRow: false
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  @computed get selectAllCheckboxIsChecked() {
    return !this.store.isLoading && this.store.checkedRows.length === this.props.rows.length && (this.store.showSearchResults && this.store.checkedRows.length > 0);
  }

  @computed get showLoadMoreButton() {
    return this.props.pagination && this.props.allRowsCount > this.props.rows.length;
  }

  @computed get rowsCanRender() {
    return this.props.rows.length > 0;
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

  advancePagination = () => {
    this.store.advancePagination();
  }

  handleDeleteAction = (e) => {
    e.preventDefault();
    this.store.showDeleteModal();
  }

  renderTopAndBottomFeatures = (position) => {
    return (
      <div className="pagination-count-delete-wrapper">
        {
          this.store.showSearchResults && (position === 'top')
            ? this.renderSearchCounts()
            : this.renderStatCounts()
        }
        {this.props.hasCheckboxRow && this.renderDeleteButton()}
      </div>
    )
  }

  renderSearchCounts = () => {
    let length = this.props.rows.length;
    return (
      <div className="search-counts">
        {`${length} Result${length !== 1 ? 's' : ''}`}
      </div>
    )
  }

  renderStatCounts = () => {
    return (
      <div className="counts-wrapper">
        {
          this.props.pagination &&
          <div className="pagination-count">
            {`Showing 1-${this.props.rows.length} of ${this.props.allRowsCount}`}
          </div>
        }
        {
          this.props.hasCheckboxRow && this.store.checkedRows.length > 0 &&
          <div className="selection-count">
            {`${this.store.checkedRows.length} Selected`}
          </div>
        }
      </div>
    )
  }

  renderDeleteButton = () => {
    const disableButton = this.store.checkedRows.length === 0;
    const oneItemSelected = this.store.checkedRows.length === 1;
    return (
      <div className="manage-favorites-delete-button">
        <button className={`as-link ${disableButton ? 'disabled' : ''}`} onClick={this.handleDeleteAction}>
          <i className="icon-trash" aria-hidden="true" />
          {(disableButton || oneItemSelected) && 'Delete Favorite'}
          {(!disableButton && !oneItemSelected) && `Delete ${this.store.checkedRows.length} Favorites`}
        </button>
      </div>
    )
  }

  renderLoadMoreButton = () => {
    return (
      <div className="load-more-button">
        <button className="fn-secondary" onClick={this.advancePagination}>
          Load More
        </button>
      </div>
    )
  }

  renderNoResults = () => {
    return (
      <div className="no-results-wrapper">
        {
          this.store.showSearchResults
            ? this.props.noSearchResultsJsx
            : this.props.noFetchResultsJsx
        }
      </div>
    )
  }

  renderIsLoading = () => {
    return (
      <div className="loading-block">
        <p className="as-h2" aria-live="polite">
          <i className="as-h2 icon-reload" aria-hidden="true"></i>
          Loading favorites&hellip;
        </p>
      </div>
    )
  }

  renderSelectAllCheckbox = () => {
    return (
      <th className="select-all-checkbox col5">
        <Checkbox
          id={'select-all-checkbox'}
          label={''}
          value={''}
          handleOnChange={this.handleSelectAll}
          checked={this.selectAllCheckboxIsChecked}/>
      </th>
    )
  }

  renderColumns = () => {
    return this.props.columns.map((col, i) => {
      const sortDirection = this.props.sortDirections[col.key];
      const isActive = this.props.activeColumn === col.key;
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
        <span className="sr-only" aria-live="assertive" aria-atomic="true">
          {this.props.caption || 'The table'}
          is now sorted by {this.props.activeColumn}
          in {this.props.sortDirections[this.props.activeColumn] ? 'ascending' : 'descending'}
          order.
        </span>
        {!this.store.isLoading && (this.rowsCanRender || this.store.showSearchResults) && this.renderTopAndBottomFeatures('top')}
        <table id={this.props.tableId} className={`${this.props.tableId}-class sortable-table`}>
          {this.props.caption && <caption>{this.props.caption}</caption>}
          <thead>
            <tr>
              {this.props.hasCheckboxRow && this.renderSelectAllCheckbox()}
              {this.renderColumns()}
            </tr>
          </thead>
          <tbody>
            {!this.store.isLoading && this.rowsCanRender && this.renderRows(this.props.rows, this.props.columns)}
          </tbody>
        </table>
        {this.store.isLoading && this.renderIsLoading()}
        {!this.store.isLoading && !this.rowsCanRender && this.renderNoResults()}
        {!this.store.isLoading && (this.rowsCanRender || this.store.showSearchResults) && this.renderTopAndBottomFeatures('bottom')}
        {this.showLoadMoreButton && this.rowsCanRender && this.renderLoadMoreButton()}
      </div>
    )
  }
}
