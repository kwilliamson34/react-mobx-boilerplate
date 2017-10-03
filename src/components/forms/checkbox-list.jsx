import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx';

import FormLabel from './form-label';

@observer
export default class CheckboxList extends React.Component {

  static propTypes = {
    dataObject: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    charLimit: PropTypes.number,
    disabled: PropTypes.bool,
    labelText: PropTypes.string,
    getIsValid: PropTypes.func,
    checkFormForErrors: PropTypes.func,
    errorMessage: PropTypes.string,
    selectAll: PropTypes.func,
    clearAll: PropTypes.func,
    children: PropTypes.array.isRequired
  }

  static defaultProps = {
    labelText: '',
    required: false,
    disabled: false,
    errorMessage: 'This entry is not valid.'
  }

  @observable hasVisibleError = false;
  @computed get valueInStore() {
    return this.props.dataObject[this.props.id];
  }
  @computed get hasFunctionalError() {
    let hasError = false;

    //empty check
    if(this.props.required && this.valueInStore.length <= 0) {
      hasError = true;
    }

    return hasError;
  }
  @computed get allCheckboxesChecked() {
    return this.valueInStore.length === this.props.children.length;
  }

  render() {
    return (
      <div className={`form-group ${this.props.id + '-class'} ${this.hasVisibleError ? 'has-error' : ''}`}>
        <FormLabel
          id={this.props.id}
          hasError={this.hasVisibleError}
          fieldIsRequired={this.props.required}
          labelText={this.props.labelText}
          errorMessage={this.props.errorMessage}/>

        <div className="selection-buttons">
          <div className="checkbox">
            <label>
              <input type="checkbox" name="select-all-checkbox" checked={this.allCheckboxesChecked} value="" onClick={this.props.selectAll}/>
              <span className="cr"></span>
              <span className="select-all-description">Select All</span>
            </label>
          </div>
          <button type="button" className="clear-all-button" onClick={this.props.clearAll}>
            Clear All
          </button>
        </div>

        <fieldset id={this.props.id}>
          {this.props.children}
        </fieldset>
      </div>
    )
  }
}
