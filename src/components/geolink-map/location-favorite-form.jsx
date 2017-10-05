import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';
import MapSearch from './map-search';

@observer
class LocationFavoriteForm extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.store = this.props.store;
    this.store.formFieldRefList = [];
  }

  render() {
    return (
      <div className="location-favorite-form">
        <MapSearch
          geolinkStore={this.store}
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="locationAddress"
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          labelText="Address"
          errorMessage="Please enter an address."
          required={true}/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          dataObject={this.store.values}
          id="locationName"
          type="input"
          labelText="Name"
          required={true}
          errorMessage="Please enter a name."/>
      </div>
    );
  }
}

export default asForm(LocationFavoriteForm, {submitButtonText: 'Save Favorite', discardButtonText: 'Discard & Go Back'})
