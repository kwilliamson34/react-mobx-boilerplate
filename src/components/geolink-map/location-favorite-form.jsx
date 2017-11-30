import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';

@observer
class LocationFavoriteForm extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    formChildProps: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.store = this.props.store;
  }

  componentWillMount() {
    this.store.clearFormFieldRefList();
  }

  componentDidMount() {
    this.firstInput.input.focus();
  }

  componentWillUnmount() {
    this.store.setPageTitle('Network Status');
  }

  render() {
    return (
      <div className="location-favorite-form">
        <TextInput
          ref={ref => {
            this.firstInput = ref;
            this.store.formFieldRefList.push(ref);
          }}
          id="locationAddress"
          type="search"
          labelText="Address"
          required={true}
          charLimit={1000}
          errorMessage="Please enter an address."
          className="col-xs-12 col-sm-7 search-form"
          showClearButton={true}
          handleSubmit={this.store.searchMap.bind(this.store)}
          disableAutoComplete={true}
          {...this.props.formChildProps}/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          id="locationName"
          type="input"
          labelText="Name"
          charLimit={100}
          required={true}
          errorMessage="Please enter a name."
          className="col-xs-12 col-sm-5"
          {...this.props.formChildProps}/>
      </div>
    );
  }
}

export default asForm(LocationFavoriteForm, {
  secondaryButtonText: 'Discard & Go Back',
  formColClass: 'col-xs-12',
  includeDivider: true
})