import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class FormTemplate extends React.Component {

  static propTypes = {
    inputList: PropTypes.array.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    refList: PropTypes.array,
    submitButtonDisabled: PropTypes.bool,
    allCheckboxesChecked: PropTypes.bool,
    checkboxListHasError: PropTypes.bool,
    submitButtonText: PropTypes.string,
    errorBody: PropTypes.string,
    toggleAlertBar: PropTypes.func
  }

  static defaultProps = {
    inputList: []
  }

  componentWillMount() {
    this.localRefList = [];
    this.alertJsx = null;
  }

  renderSubmitButton = () => {
    return (
      <div className="form-group text-center">
        <button type="submit" className={`fn-primary ${this.props.submitButtonDisabled ? 'disabled' : ''}`}>
          {this.props.submitButtonText}
        </button>
      </div>
    )
  }

  renderSelect = ({id, label, value, genericLabel, placeholder, disabled, optionsList, hasError, required}) => {
    let refList = this.props.refList || this.localRefList;
    return (
      <div className={`form-group has-feedback ${hasError ? 'has-error' : ''}`} key={id}>
        <label className="control-label" htmlFor={id}>{label}
          {required &&
            <span className="required-asterisks"> *</span>
          }
        </label>
        {hasError && <div className="msgBlock error error-list" role="alert" aria-live="assertive">
          <span>Please select a {genericLabel || label.toLowerCase()}.</span>
        </div>}
        <select id={id} ref={ref => refList[id] = ref} className="form-control form-control-lg" value={value} disabled={disabled}>
          <option value="">{placeholder}</option>
          {optionsList.map(option => <option value={option.value} key={option.value}>{option.title}</option> )}
        </select>
      </div>
    )
  }

  renderTextInput = ({id, label, value, genericLabel, type, disabled, hasError, required, charLimit}) => {
    let Tag = type === 'textarea' ? 'textarea' : 'input';
    let refList = this.props.refList || this.localRefList;
    return (
      <div className={`form-group has-feedback ${id + '-class'} ${hasError ? 'has-error' : ''}`} key={id}>
        <label className="control-label" htmlFor={id}>{label}
          {required &&
            <span className="required-asterisks"> *</span>
          }
        </label>
        {hasError && <div className="msgBlock error error-list" role="alert" aria-live="assertive">
          <span>Please enter a {genericLabel || label.toLowerCase()}.</span>
        </div>}
        <Tag id={id} ref={ref => refList[id] = ref} type="text" className="form-control" disabled={disabled} defaultValue={value} data-charlimit={charLimit}/>
      </div>
    )
  }

  renderTextBlock = ({body}) => {
    return (
      <div key={body}>
        <p dangerouslySetInnerHTML={{__html: body}}></p>
      </div>
    )
  }

  handleSelectAllCheckbox = (refList) => {
    for (let key in refList.elements) {
      if (refList.elements[key].localName === 'input' && refList.elements[key].checked === this.props.allCheckboxesChecked) {
        refList.elements[key].click();
      }
    }
  }

  handleClearAllButton = (refList) => {
    for (let key in refList.elements) {
      if (refList.elements[key].localName === 'input' && refList.elements[key].checked) {
        refList.elements[key].click();
      }
    }
  }

  renderCheckbox = ({id, label, genericLabel, hasError, required, checkboxList, showSelectionButtons}) => {
    let refList = this.props.refList || this.localRefList;
    return (
      <div className={`form-group has-feedback ${id + '-class'} ${this.props.checkboxListHasError ? 'has-error' : ''}`} key={id}>
      <label className="control-label" htmlFor={id}>{label}
        {required &&
          <span className="required-asterisks"> *</span>
        }
      </label>
      {this.props.checkboxListHasError && <div className="msgBlock error error-list" role="alert" aria-live="assertive">
        <span>Please select {genericLabel || label.toLowerCase()}.</span>
      </div>}
      {showSelectionButtons &&
        <div className="selection-buttons">
          <div className="checkbox">
            <label>
              <input type="checkbox" name="select-all-checkbox" checked={this.props.allCheckboxesChecked} value="" onClick={() => this.handleSelectAllCheckbox(refList[id])}/>
              <span className="cr"></span>
              <span className="select-all-description">Select All</span>
            </label>
          </div>
          <button type="button" className="clear-all-button" onClick={() => this.handleClearAllButton(refList[id])}>
            Clear All
          </button>
        </div>
      }
      <fieldset id={id} ref={ref => refList[id] = ref}>
        {checkboxList.map((checkbox, i) => {
          return (
            <div className="checkbox template-checkbox" key={`${id}-${i}`}>
              <label>
                <input type="checkbox" className="template-checkbox-input" value={checkbox.value}/>
                <span className="cr"></span>
                <span className="template-checkbox-description" dangerouslySetInnerHTML={{__html: checkbox.label || checkbox.value}}></span>
              </label>
            </div>
          )
        })}
      </fieldset>
    </div>
    )
  }

  renderInput = (inputData) => {
    let inputJsx = '';
    switch(inputData.type) {
      case 'textblock':
        inputJsx = this.renderTextBlock(inputData);
        break;
      case 'select' :
        inputJsx = this.renderSelect(inputData);
        break;
      case 'checkbox' :
        inputJsx = this.renderCheckbox(inputData);
        break;
      case 'textarea':
      case 'text':
      default:
        inputJsx = this.renderTextInput(inputData);
        break;
    }
    return inputJsx;
  }

  renderErrorAlertBar = () => {
    if(!this.props.errorBody) return '';
    return (
      <div className="alert alert-error">
        <button type="button" className="close_btn icon-close" onClick={this.props.toggleAlertBar}>
          <span className="sr-only">Close alert</span>
        </button>
        <p role="alert" aria-live="assertive">
          <strong>Error:&nbsp;</strong>{this.props.errorBody}
        </p>
      </div>
    )
  }

  render() {
    return (
      <form id={this.props.id} className={this.props.className} onSubmit={this.props.onSubmit} onChange={this.props.onChange} onBlur={this.props.onBlur} noValidate>
        {this.renderErrorAlertBar()}
        {this.props.inputList.map(input => this.renderInput(input))}
        {this.renderSubmitButton()}
      </form>
    );
  }
}
