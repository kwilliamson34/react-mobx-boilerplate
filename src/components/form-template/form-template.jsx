import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {history} from '../../core/services/history.service';
import $ from 'jquery';

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
    toggleAlertBar: PropTypes.func,
    clearForm: PropTypes.func,
    formHasEntries: PropTypes.bool
  }

  static defaultProps = {
    inputList: []
  }

  componentWillMount() {
    this.localRefList = [];
    this.alertJsx = null;
    this.interceptedRoute = '';

    //set up reroute blockade (returns unblocking function)
    this.unblock = history.block((location) => {
      if (this.props.formHasEntries && !this.interceptedRoute) {
        this.interceptedRoute = location.pathname;
        this.showExitModal();
        return false; //does not allow to proceed to new page
      }
    });
  }

  componentWillUnmount() {
    //undo the reroute blockade
    this.unblock();
  }

  //TODO onChange, updateProperty (then remove from stores)
  //TODO onClick, updateArray (then remove from stores)
  //TODO onBlur, if required, validateInput (then remove from stores)
  //TODO onSubmit, if formIsValid, submit it (then update funciton in stores)

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

  renderExitModal = () => {
    return (
      <div id="exit-modal" role="dialog" tabIndex="-1" className="modal fade" aria-labelledby="modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.hideExitModal}>
                <i aria-hidden="true" className="icon-close"></i>
                <span className="sr-only">Close window</span>
              </button>
              <div className="row no-gutters" id="fmodal-title">
                <div className="col-xs-12">
                  <h1 className="as-h2">Unsaved changes</h1>
                  <p>Your form changes will not be saved if you navigate away from this page.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className="fn-primary" onClick={this.stayOnPage}>Stay on Page</button>
                  <button className="fn-secondary" onClick={this.discardFormChanges}>Discard Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  showExitModal = () => {
    $('#exit-modal').modal({backdrop: 'static'});
    $('#exit-modal').modal('show');
  }

  hideExitModal = () => {
    $('#exit-modal').modal('hide');
    $('#exit-modal').data('bs.modal', null);
  }

  stayOnPage = (e) => {
    e.preventDefault();
    this.hideExitModal();
    this.interceptedRoute = '';
  }

  discardFormChanges = (e) => {
    e.preventDefault();
    this.hideExitModal();
    this.props.clearForm();
    history.replace(this.interceptedRoute);
  }

  render() {
    return (
      <section>
        <form id={this.props.id} className={this.props.className} onSubmit={this.props.onSubmit} onChange={this.props.onChange} onBlur={this.props.onBlur} noValidate>
          {this.renderErrorAlertBar()}
          {this.props.inputList.map(input => this.renderInput(input))}
          {this.renderSubmitButton()}
        </form>
        {this.renderExitModal()}
      </section>
    );
  }
}
