import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class Form extends React.Component {

  static propTypes = {
    inputList: PropTypes.array.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    alertBarJsx: PropTypes.string,
    refList: PropTypes.array,
    submitButtonDisabled: PropTypes.bool,
    submitButtonText: PropTypes.string
  }

  static defaultProps = {
    inputList: []
  }

  componentWillMount() {
    this.localRefList = [];
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

  renderSelect = ({id, label, value, genericLabel, placeholder, disabled, optionsList, hasError}) => {
    let refList = this.props.refList || this.localRefList;
    return (
      <div className={`form-group has-feedback ${hasError ? 'has-error' : ''}`} key={id}>
        <label className="control-label" htmlFor={id}>{label}<span className="required-asterisks"> *</span></label>
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

  renderTextInput = ({id, label, value, genericLabel, type, disabled, hasError, charLimit}) => {
    let Tag = type === 'textarea' ? 'textarea' : 'input';
    let refList = this.props.refList || this.localRefList;
    return (
      <div className={`form-group has-feedback ${hasError ? 'has-error' : ''}`} key={id}>
        <label className="control-label" htmlFor={id}>{label}<span className="required-asterisks"> *</span></label>
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

  renderInput = (inputData) => {
    let inputJsx = '';
    switch(inputData.type) {
      case 'textblock':
        inputJsx = this.renderTextBlock(inputData);
        break;
      case 'select' :
        inputJsx = this.renderSelect(inputData);
        break;
      case 'textarea':
      case 'text':
      default:
        inputJsx = this.renderTextInput(inputData);
        break;
    }
    return inputJsx;
  }

  render() {
    return (
      <form id={this.props.id} className={this.props.className} onSubmit={this.props.onSubmit} onChange={this.props.onChange} onBlur={this.props.onBlur} noValidate>
        {this.props.alertBarJsx || ''}
        {this.props.inputList.map(input => this.renderInput(input))}
        {this.renderSubmitButton()}
      </form>
    );
  }
}
