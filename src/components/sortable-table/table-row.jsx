import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {computed} from 'mobx';

@observer
export class TableRow extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    rowIsActive: PropTypes.bool,
    rowIndex: PropTypes.number,
    totalRowsDisplayed: PropTypes.number
  }

  static defaultProps = {
    rowIsActive: false
  }

  @computed get srOnlyRowDescription() {
    let srOnlyCellInfo = '';
    this.props.columns.map((column) => {
      let columnChildren = [];
      //push individual children into an array so that we don't have to write out two render functions;
      Array.isArray(column.props.children)
        ? columnChildren = column.props.children
        : columnChildren.push(column.props.children);
      columnChildren.forEach(child => {
        if (child.props.headerLabel) {
          srOnlyCellInfo += `${child.props.headerLabel}: ${this.props.row[child.props.columnDataKey]} `;
        }
      })
    })
    return `You are on row ${this.props.rowIndex} of ${this.props.totalRowsDisplayed}. ` + srOnlyCellInfo;
  }

  renderCells = (cells) => {
    return cells.map((cell, i) => {
      let renderString = '';
      if (cell.props.rowActions) {
        renderString = cell.props.rowActions(this.props.id);
      } else {
        renderString = this.props.row[cell.props.columnDataKey];
      }
      return (
        <div role="cell" key={`table-row-${i}`} className={`table-cell ${cell.props.columnClassName}`}>
          <div className="row-contents-wrapper">
            <span>{renderString}</span>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div role="row" aria-rowindex={this.props.rowIndex} className={`table-row ${this.props.rowIsActive ? 'active' : ''}`}>
        <span className="sr-only" tabIndex="0">{this.srOnlyRowDescription}</span>
        {this.props.columns.map((column, i) => {
          let columnChildren = [];
          //push individual children into an array so that we don't have to write out two render functions;
          Array.isArray(column.props.children)
            ? columnChildren = column.props.children
            : columnChildren.push(column.props.children);
          return (
            <span className={column.props.className} key={`table-column-${i}`}>
              {this.renderCells(columnChildren)}
            </span>
          )
        })}
      </div>
    )
  }
}
