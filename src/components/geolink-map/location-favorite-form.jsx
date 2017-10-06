import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';

@observer
class LocationFavoriteForm extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.store = this.props.store;
  }

  componentWillMount() {
    this.store.formFieldRefList = [];
  }

  render() {
    return (
      <div className="location-favorite-form">
        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          dataObject={this.store.values}
          id="locationAddress"
          type="search"
          labelText="Address"
          helperText="Favorites will display with a star next time you search."
          required={true}
          errorMessage="Please enter an address."
          className="col-xs-12 col-sm-6 search-form"
          showClearButton={true}
          handleSubmit={this.store.searchMap.bind(this.geoStore)}
          submitIcon="icon-search"/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          dataObject={this.store.values}
          id="locationName"
          type="input"
          labelText="Name"
          required={true}
          errorMessage="Please enter a name."
          className="col-xs-12 col-sm-6"/>
      </div>
    );
  }
}

export default asForm(LocationFavoriteForm, {
  submitButtonText: 'Save Favorite',
  discardButtonText: 'Discard & Go Back',
  formColClass: 'col-xs-12',
  includeDivider: true
})
