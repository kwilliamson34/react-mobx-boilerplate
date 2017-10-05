import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx';

import FormLabel from '../forms/form-label';

@observer
export default class MapSearch extends React.Component {
  static propTypes = {
    geolinkStore: PropTypes.object.isRequired,
    dataObject: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    labelText: PropTypes.string,
    checkFormForErrors: PropTypes.func,
    errorMessage: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    required: false,
    disabled: false,
    errorMessage: 'Please enter an address to search.',
    className: ''
  }

  constructor(props) {
    super(props);
    this.geoStore = this.props.geolinkStore;
  }

  @observable hasVisibleError = false;
  @computed get valueInStore() {
    return this.props.dataObject[this.props.id];
  }
  @computed get hasFunctionalError() {
    let hasError = false;

    //empty check
    if(this.props.required && this.valueInStore === '') {
      hasError = true;
    }

    return hasError;
  }

  handleOnChange = (e) => {
    this.props.dataObject[this.props.id] = e.target.value;
    this.hasVisibleError = this.hasFunctionalError;
    if(this.props.checkFormForErrors) {
      this.props.checkFormForErrors();
    }
  }

  handleSearchSubmit = () => {
    this.geoStore.searchMap();
    this.refs.input.blur(); //close native keyboard on mobile, to show search result
  }

  handleOnKeyPress = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      this.handleSearchSubmit();
    }
  }

  handleClearClick = () => {
    this.props.dataObject[this.props.id] = '';
    this.refs.btnSubmit.focus();
  }

  render() {
    return (
      <div className={`search-form form-group ${this.props.className}`}>
        <div className="search-input input-group">
          <FormLabel
            id={this.props.id}
            hasError={this.hasVisibleError}
            fieldIsRequired={this.props.required}
            labelText={this.props.labelText || 'Location'}
            errorMessage={this.props.errorMessage}
            srOnly={!this.props.labelText}/>
          <div className="search-bar">
            <input
              id={this.props.id}
              type="search"
              ref="input"
              disabled={this.props.disabled}
              className="form-control"
              value={this.valueInStore}
              onChange={this.handleOnChange}
              onKeyPress={this.handleOnKeyPress}/>
            {(this.valueInStore !== '') &&
              <button className="btn clear-btn" type="button" ref="btnClear" onClick={this.handleClearClick}>
                <span className="sr-only">Clear</span>
                <span aria-hidden="true" className="icon-close"/>
              </button>
            }
            <button className="btn submit-btn" type="button" ref="btnSubmit" onClick={this.handleSearchSubmit} disabled={this.props.disabled}>
              <span className="sr-only">Search</span>
              <span aria-hidden="true" className="icon-search"/>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
