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
    className: PropTypes.string,
    labelText: PropTypes.string,
    labelTextIsSrOnly: PropTypes.bool,
    labelErrorIsSrOnly: PropTypes.bool,
    showRequiredAsterisk: PropTypes.bool,
    getIsValid: PropTypes.func,
    errorMessage: PropTypes.string,
    selectAll: PropTypes.func,
    clearAll: PropTypes.func,
    children: PropTypes.array,
    announceError: PropTypes.bool
  }

  static defaultProps = {
    className: '',
    labelText: '',
    labelTextIsSrOnly: false,
    labelErrorIsSrOnly: false,
    showRequiredAsterisk: true,
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
      <div className={`form-group ${this.hasVisibleError ? 'has-error' : ''}`}>
        <fieldset id={this.props.id} className={this.props.className} onBlur={this.onBlur}>
          <FormLabel
            hasError={this.hasVisibleError}
            fieldIsRequired={this.props.required}
            labelText={this.props.labelText}
            labelTextIsSrOnly={this.props.labelTextIsSrOnly}
            labelErrorIsSrOnly={this.props.labelErrorIsSrOnly}
            showRequiredAsterisk={this.props.showRequiredAsterisk}
            errorMessage={this.props.errorMessage}
            announceError={this.props.announceError}/>

          <div className="selection-buttons">
            <div className="checkbox select-all-checkbox">
              <label className="select-all-checkbox-label">
                <input type="checkbox" name="select-all-checkbox" checked={this.allCheckboxesChecked} value="" onClick={this.selectAll}/>
                <span className="cr"></span>
                <span className="select-all-description">Select All</span>
              </label>
            </div>
            <button type="button" className="btn as-link clear-all-button" onClick={this.clearAll}>
              Clear All
            </button>
          </div>
          <hr className="gtoc-checklist-hr"/>
          {this.props.children}
        </fieldset>
      </div>
    )
  }
}
