import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class TableRow extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    rowIsActive: PropTypes.bool
  }

  static defaultProps = {
    rowIsActive: false
  }

  renderCells = (cells) => {
    return cells.map((cell, i) => {
      let renderString = '';
      if (cell.type.name === 'RepeatingColumn') {
        renderString = cell.props.repeatingJsx(this.props.id);
      } else {
        renderString = this.props.row[cell.props.columnDataKey];
      }
      return (
        <div key={`table-row-${i}`} className={`table-cell ${cell.props.columnClassName}`}>
          <div className="flex-wrapper">
            <div className="row-contents-wrapper">
              <span>{renderString}</span>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className={`table-row ${this.props.rowIsActive ? 'active' : ''}`}>
        {this.props.columns.map((column, i) => {
          let columnChildren = [];
          //push individual children into an array so that we don't have to write out two render functions;
          Array.isArray(column.props.children)
            ? columnChildren = column.props.children
            : columnChildren.push(column.props.children)
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
