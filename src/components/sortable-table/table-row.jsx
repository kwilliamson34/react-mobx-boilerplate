import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

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

  renderRow = (columns) => {
    let srOnlyRowDescription = `You are on row ${this.props.rowIndex} of ${this.props.totalRowsDisplayed}. `;
    let childrenArray = columns.map((column) => {
      let columnChildren = [];
      //push individual children into an array so that we don't have to write out two render functions;
      Array.isArray(column.props.children)
        ? columnChildren = column.props.children
        : columnChildren.push(column.props.children);
      //build the srOnly text by finding columns with headerLabels;
      columnChildren.forEach(child => {
        if (child.props.headerLabel) {
          srOnlyRowDescription += `${child.props.headerLabel}: ${this.props.row[child.props.columnDataKey]}. `;
        }
      })
      return {
        className: column.props.className,
        columnChildren: columnChildren
      };
    });

    let returnArray = childrenArray.map((children, i) => {
      return (
        <span className={children.className} key={`table-column-${i}`}>
          {this.renderCells(children.columnChildren, srOnlyRowDescription)}
        </span>
      )
    })
    return returnArray;
  }

  renderCells = (cells, srOnlyRowDescription) => {
    return cells.map((cell, i) => {
      let renderString = '';
      if (cell.props.rowActions) {
        renderString = cell.props.rowActions(this.props.id, srOnlyRowDescription);
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

  // <span className="sr-only" tabIndex="0">{this.srOnlyRowDescription}</span>

  render() {
    return (
      <div role="row" aria-rowindex={this.props.rowIndex} className={`table-row ${this.props.rowIsActive ? 'active' : ''}`}>
        {this.renderRow(this.props.columns)}
      </div>
    )
  }
}
