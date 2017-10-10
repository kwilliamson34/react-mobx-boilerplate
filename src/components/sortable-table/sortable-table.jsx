import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import _ from 'lodash';
import $ from 'jquery';

import {SortableColumn} from './sortable-column';
import {TableRow} from './table-row';
import Checkbox from  '../forms/checkbox';

@observer
export class SortableTable extends React.Component {

  //checkedRows is from store. We should pass certain things in as props.

  static propTypes = {
    store: PropTypes.object.isRequired,
    idKey: PropTypes.string.isRequired,
    caption: PropTypes.string,
    columns: PropTypes.array,
    sortedRows: PropTypes.array,
    allRowsCount: PropTypes.number,
    hasCheckboxRow: PropTypes.bool,
    pagination: PropTypes.bool,
    tableId: PropTypes.string
  };

  static defaultProps = {
    columns: [],
    sortedRows: [],
    allRowsCount: 0,
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
    this.store.checkedRows.length === this.props.sortedRows.length
      ? this.store.clearAllCheckboxes()
      : this.store.selectAllCheckboxes();
  }

  advancePagination = () => {
    this.store.advancePagination();
  }

  handleDeleteAction = (e) => {
    e.preventDefault();
    //temp gating
    if (this.store.checkedRows.length > 0) {
      this.showDeleteModal();
    }
  }

  renderDeleteModal = () => {
    return (
      <div id="delete-modal" role="dialog" tabIndex="-1" className="modal fade" aria-labelledby="modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.hideDeleteModal}>
                <i aria-hidden="true" className="icon-close"></i>
                <span className="sr-only">Close window</span>
              </button>
              <div className="row no-gutters" id="fmodal-title">
                <div className="col-xs-12">
                  <h1 className="as-h2">{`Delete these ${this.store.checkedRows.length} favorites?`}</h1>
                  <p>This cannot be undone. New favorites can be added at any time.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className="fn-primary" onClick={this.keepFavorites}>Keep Favorites</button>
                  <button className="fn-secondary" onClick={this.deleteFavorites}>Delete Favorites</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  showDeleteModal = () => {
    $('#delete-modal').modal({backdrop: 'static'});
    $('#delete-modal').modal('show');
  }

  hideDeleteModal = () => {
    $('#delete-modal').modal('hide');
    $('#delete-modal').data('bs.modal', null);
  }

  keepFavorites = (e) => {
    e.preventDefault();
    this.hideDeleteModal();
  }

  deleteFavorites = (e) => {
    e.preventDefault();
    this.store.deleteFavorites();
    this.hideDeleteModal();
  }

  renderPaginationCountsAndDeleteButton = () => {
    //onClick here is temp. Need comps for button func.
    return (
      <div className="pagination-count-delete-wrapper">
        {
          this.props.pagination &&
          <div className="pagination-count" onClick={this.advancePagination}>
            {`Showing 1-${this.props.sortedRows.length} of ${this.props.allRowsCount}`}
          </div>
        }
        {
          this.store.checkedRows.length > 0 &&
          <div className="selection-count">
            {`${this.store.checkedRows.length} Selected`}
          </div>
        }
        {this.renderDeleteButton()}
      </div>
    )
  }

  renderDeleteButton = () => {
    const disableButton = this.store.checkedRows.length === 0;
    const oneItemSelected = this.store.checkedRows.length === 1;
    return (
      <div className="delete-selection-button">
        <button onClick={this.handleDeleteAction}>
          {(disableButton || oneItemSelected) && `Delete Favorite`}
          {(!disableButton && !oneItemSelected) && `Delete ${this.store.checkedRows.length} Favorites`}
        </button>
      </div>
    )
  }

  noResults = () => {
    return (
      <div className="no-results-block" ref="noResults">
        {this.props.noResultsJsx}
      </div>
    )
  }

  renderRows = (sortedRows, columns) => {
    return sortedRows.map(row => {
      //identify which field we want to use as the id/value;
      const targetedId = row[this.props.idKey];
      return (
        <TableRow
          id={targetedId}
          columns={columns}
          row={row}
          checkedRows={this.store.checkedRows.peek()}
          hasCheckbox={this.props.hasCheckboxRow}
          handleOnChange={this.handleOnChange}
          key={targetedId}/>
      )
    })
  }

  //don't forget to add noResults back in;
  // {!this.store.isLoading && this.store.noResults && this.noResults()}


  render() {
    return (
      <div className="">
        <span className="sr-only" aria-live="assertive" aria-atomic="true">{this.props.caption}
          is now sorted by {this.store.activeColumn}
          in {this.store.sortDirections[this.props.id] ? 'ascending' : 'descending'}
        </span>
        {!this.store.isLoading && this.renderPaginationCountsAndDeleteButton()}
        <table className="my-apps-table" id={this.props.tableId}>
          {this.props.caption && <caption>{this.props.caption}</caption>}
          <thead>
            <tr>
              {
                this.props.hasCheckboxRow &&
                  <th className="col-xs-1">
                    <Checkbox
                      id={'select-all-checkbox'}
                      label={''}
                      value={''}
                      handleOnChange={this.handleSelectAll}
                      checked={this.store.checkedRows.length === this.props.sortedRows.length}/>
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
            {this.renderRows(this.props.sortedRows, this.props.columns)}
          </tbody>
        </table>
        {!this.store.isLoading && this.renderPaginationCountsAndDeleteButton()}
        {this.renderDeleteModal()}
      </div>
    )
  }

}
