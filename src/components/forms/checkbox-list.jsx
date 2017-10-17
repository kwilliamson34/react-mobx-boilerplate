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
    errorMessage: PropTypes.string,
    selectAll: PropTypes.func,
    clearAll: PropTypes.func,
    children: PropTypes.array
  }

  static defaultProps = {
    labelText: '',
    required: false,
    disabled: false,
    errorMessage: 'Please select at least one option.',
    children: []
  }

  @observable hasVisibleError = false;
  @computed get valueInStore() {
    return this.props.dataObject[this.props.id] || '';
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

  //this handler should be passed to all checkbox children in the list.
  handleCheckboxOnChange = (input) => {
    const newValue = input.value;
    this.props.dataObject[this.props.id].indexOf(newValue) > -1
      ? this.props.dataObject[this.props.id].remove(newValue)
      : this.props.dataObject[this.props.id].push(newValue);
    this.displayErrors();
  }

  selectAll = () => {
    if(this.allCheckboxesChecked) {
      this.clearAll();
    } else {
      this.props.selectAll();
    }
    this.displayErrors();
  }

  clearAll = () => {
    this.props.clearAll();
    this.displayErrors();
  }

  displayErrors = () => {
    this.hasVisibleError = this.hasFunctionalError;
  }

  onBlur = () => {
    this.displayErrors();
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
              <input type="checkbox" name="select-all-checkbox" checked={this.allCheckboxesChecked} value="" onClick={this.selectAll}/>
              <span className="cr"></span>
              <span className="select-all-description">Select All</span>
            </label>
          </div>
          <button type="button" className="as-link" onClick={this.clearAll}>
            Clear All
          </button>
        </div>

        <fieldset id={this.props.id} onBlur={this.onBlur}>
          {this.props.children}
        </fieldset>
      </div>
    )
  }
}
