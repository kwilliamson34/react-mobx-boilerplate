import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import {TableRow} from './table-row';

@observer
export class SortableTable extends React.Component {

  static propTypes = {
    children: PropTypes.array,
    tableId: PropTypes.string,
    keyToUseAsId: PropTypes.string.isRequired,
    caption: PropTypes.string,
    rows: PropTypes.array,
    activeRows: PropTypes.object,
    shouldRenderRows: PropTypes.bool,
    activeColumn: PropTypes.string
  };

  static defaultProps = {
    rows: [],
    activeRows: []
  }

  constructor(props) {
    super(props);
    this.columns = [];
    this.cellContainers = {};
  }

  componentWillMount() {
    this.parseChildren();
  }

  renderRows = (rows, columns) => {
    return rows.map(row => {
      //identify which field we want to use as the id/value;
      const targetedId = row[this.props.keyToUseAsId];
      const rowIsActive = this.props.activeRows.indexOf(targetedId.toString()) > -1;
      return (
        <TableRow
          id={targetedId}
          columns={columns}
          row={row}
          rowIsActive={rowIsActive}
          key={targetedId} />
      )
    })
  }

  parseChildren = () => {
    console.log('children', this.props.children);
    this.props.children.map(child => {
      console.log('child children', child.props.children);
    })
  }

  render() {
    return (
      <div id={this.props.tableId} className={`sortable-table ${this.props.tableId}-class`}>
        {this.props.caption && <caption>{this.props.caption}</caption>}
        <div className="table-head">
          {this.props.children}
        </div>
        <div className="table-body">
          {this.props.shouldRenderRows && this.renderRows(this.props.rows, this.props.children)}
        </div>
      </div>
    )
  }
}
