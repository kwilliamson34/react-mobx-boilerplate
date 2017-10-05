import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {utilsService} from '../../core/services/utils.service';

import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';
import CheckboxList from '../forms/checkbox-list';
import Checkbox from '../forms/checkbox';

@observer
class GtocForm extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.store = this.props.store;
    this.store.formFieldRefList = [];
  }

  @observable checkboxListRef = {
    handleCheckboxOnChange: () => {}
  }

  saveCheckboxListRef = (ref) => {
    this.store.formFieldRefList.push(ref);
    this.checkboxListRef = ref;
  }

  renderCheckbox = (strongLabel, label) => {
    const fullLabel = strongLabel + ': ' + label;
    return <Checkbox
      value={fullLabel}
      strongLabel={strongLabel}
      label={label}
      checked={this.store.values.femaList.indexOf(fullLabel) > -1}
      handleOnChange={this.checkboxListRef.handleCheckboxOnChange} />
  }

  render() {
    return (
      <div id="gtoc-form">
        <CheckboxList
          ref={this.saveCheckboxListRef}
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          dataObject={this.store.values}
          id="femaList"
          labelText="Select Network Regions"
          required={true}
          selectAll={this.store.selectAll.bind(this.store)}
          clearAll={this.store.clearAll.bind(this.store)}>

          {this.renderCheckbox('Region I', 'Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont')}
          {this.renderCheckbox('Region II', 'New Jersey, New York, Puerto Rico, Virgin Islands')}
          {this.renderCheckbox('Region III', 'District of Columbia, Delaware, Maryland, Pennsylvania, Virginia, West Virginia')}
          {this.renderCheckbox('Region IV', 'Alabama, Florida, Georgia, Kentucky, Mississippi, North Carolina, South Carolina, Tennessee')}
          {this.renderCheckbox('Region V', 'Illinois, Indiana, Michigan, Minnesota, Ohio, Wisconsin')}
          {this.renderCheckbox('Region VI', 'Arkansas, Louisiana, New Mexico, Oklahoma, Texas')}
          {this.renderCheckbox('Region VII', 'Iowa, Kansas, Missouri, Nebraska')}
          {this.renderCheckbox('Region VIII', 'Colorado, Montana, North Dakota, South Dakota, Utah, Wyoming')}
          {this.renderCheckbox('Region IX', 'Arizona, California, Hawaii, Nevada, Pacific Islands')}
          {this.renderCheckbox('Region X', 'Alaska, Idaho, Oregon, Washington')}
        </CheckboxList>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          dataObject={this.store.values}
          id="email"
          type="input"
          labelText="Email"
          required={true}
          getIsValid={utilsService.isValidEmailAddress}
          errorMessage="Please enter a valid email address."/>
      </div>
    );
  }
}

export default asForm(GtocForm, {submitButtonText: 'Subscribe'})
