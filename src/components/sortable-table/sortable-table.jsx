import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {computed} from 'mobx';
import _ from 'lodash';
import $ from 'jquery';

import {SortableColumn} from './sortable-column';
import {TableRow} from './table-row';
import Checkbox from  '../forms/checkbox';

@observer
export class SortableTable extends React.Component {

  //TODO: checkedRows is from store. We should pass certain things in as props.
  //TODO: don't forget to disable the freaking delete button broseph.

  static propTypes = {
    store: PropTypes.object.isRequired,
    idKey: PropTypes.string.isRequired,
    caption: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    allRowsCount: PropTypes.number,
    hasCheckboxRow: PropTypes.bool,
    pagination: PropTypes.bool,
    tableId: PropTypes.string
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

  handleToggleSort = (key) => {
    console.log('handleToggleSort', key);
    this.store.toggleSort(key);
  }

  handleOnChange = (target) => {
    console.log('handleOnChange', target);
    if (target.type === 'checkbox') {
      console.log('ding', target.value);
      this.store.handleCheckboxChange(target.value);
    }
  }

  handleSelectAll = () => {
    this.store.checkedRows.length === this.props.rows.length
      ? this.store.clearAllCheckboxes()
      : this.store.selectAllCheckboxes();
  }

  handleDeleteAction = (e) => {
    e.preventDefault();
    //TODO: temp gating
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
    return (
      <div className="pagination-count-delete-wrapper">
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
        {this.props.hasCheckboxRow && this.renderDeleteButton()}
      </div>
    )
  }

  renderDeleteButton = () => {
    const disableButton = this.store.checkedRows.length === 0;
    const oneItemSelected = this.store.checkedRows.length === 1;
    return (
      <div className="delete-selection-button">
        <button className={`as-link ${disableButton ? 'disabled' : ''}`} onClick={this.handleDeleteAction}>
          <i className="icon-trash" aria-hidden="true" />
          {(disableButton || oneItemSelected) && `Delete Favorite`}
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

  advancePagination = () => {
    this.store.advancePagination();
  }

  @computed get showLoadMoreButton() {
    return this.props.pagination && this.props.allRowsCount > this.props.rows.length;
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
          handleOnChange={this.handleOnChange}
          key={targetedId}/>
      )
    })
  }

  @computed get rowsCanRender() {
    return this.props.rows.length > 0;
  }

  renderNoResults = () => {
    return this.props.noResultsJsx;
  }

  renderLoading = () => {
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
      <th className="select-all-checkbox">
        <Checkbox
          id={'select-all-checkbox'}
          label={''}
          value={''}
          handleOnChange={this.handleSelectAll}
          checked={this.store.checkedRows.length === this.props.rows.length}/>
      </th>
    )
  }

  renderColumns = () => {
    return this.props.columns.map((col, i) => {
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

  render() {
    return (
      <div>
        <span className="sr-only" aria-live="assertive" aria-atomic="true">
          {this.props.caption || 'The table'}
          is now sorted by {this.store.activeColumn}
          in {this.store.sortDirections[this.props.id] ? 'ascending' : 'descending'}
          order.
        </span>
        {!this.store.isLoading && this.rowsCanRender && this.renderPaginationCountsAndDeleteButton()}
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
        {this.store.isLoading && this.renderLoading()}
        {!this.store.isLoading && !this.rowsCanRender && this.renderNoResults()}
        {!this.store.isLoading && this.rowsCanRender && this.renderPaginationCountsAndDeleteButton()}
        {this.showLoadMoreButton && this.rowsCanRender && this.renderLoadMoreButton()}
        {this.renderDeleteModal()}
      </div>
    )
  }

}
