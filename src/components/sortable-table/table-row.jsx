import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {computed} from 'mobx';

import Checkbox from '../forms/checkbox';

@observer
export class TableRow extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    handleOnChange: PropTypes.func,
    hasCheckbox: PropTypes.bool,
    checkedRows: PropTypes.object
  }

  static defaultProps = {
    hasCheckbox: false,
    checked: false,
    checkedRows: []
  }

  @computed get rowIsChecked() {
    return this.props.checkedRows.indexOf(this.props.id.toString()) > -1;
  }

  render() {
    return (
      <tr className={`sortable-table-row ${this.rowIsChecked ? 'active' : ''}`} tabIndex="0">
        {
          this.props.hasCheckbox &&
          <td scope="row" className={`table-row-checkbox ${this.rowIsChecked ? 'active' : ''}`}>
            <Checkbox
              id={this.props.id.toString()}
              value={this.props.id.toString()}
              handleOnChange={this.props.handleOnChange}
              checked={this.rowIsChecked}
              label="Checkbox for row"
              labelIsSrOnly={true}/>
          </td>
        }
        {this.props.columns.map((column, i) => {
          return (
            <td key={`table-row-${i}`} className={column.className} tabIndex="0">
              <div className="row-contents-wrapper">
                <span>{this.props.row[column.key]}</span>
              </div>
              {
                column.inlineButtonJsx &&
                <div className="inline-button-wrapper" data-id={this.props.id} tabIndex="0">
                  {column.inlineButtonJsx}
                </div>
              }
            </td>
          )
        })}
      </tr>
    )
  }
}
