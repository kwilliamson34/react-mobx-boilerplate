import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {utilsService} from '../../core/services/utils.service';

import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';
import CheckboxList from '../forms/checkbox-list';
import Checkbox from '../forms/checkbox';
import RadioGroup from '../forms/radio-group';

@observer
class GtocForm extends React.Component {

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

  @observable checkboxListRef = {
    handleCheckboxOnChange: () => {}
  }

  @observable radioGroupRef = {
    handleRadioOnChange: () => {}
  }

  saveCheckboxListRef = (ref) => {
    this.store.formFieldRefList.push(ref);
    this.checkboxListRef = ref;
  }

  saveRadioGroupRef = (ref) => {
    this.store.formFieldRefList.push(ref);
    this.radioGroupRef = ref;
  }

  renderCheckbox = (strongLabel, label) => {
    const fullLabel = strongLabel + ': ' + label;
    return (
      <div className="checkbox-wrapper">
        <Checkbox
          value={fullLabel}
          strongLabel={strongLabel}
          label={label}
          checked={this.store.values.femaList.indexOf(fullLabel) > -1}
          handleOnChange={this.checkboxListRef.handleCheckboxOnChange} />
        <hr className="checkbox-hr"/>
      </div>
    )
  }

  renderRadioInputs = (title, subTitle) => {
    return (
      <label className="radio-label">
        <input type="radio"
          name={title}
          value={title}
          checked={this.store.values.gtocSelection === title}
          onChange={this.radioGroupRef.handleRadioOnChange}/>
        {title}
        <span className="cr"></span>
        <span className="subtitle-wrapper">
          <div className="radio-subtitle">{subTitle}</div>
          {
            title === 'Subscribe to alerts' && this.store.values.gtocSelection === 'Subscribe to alerts' &&
            <span className="required-asterisks"> *</span>
          }
        </span>
      </label>
    )
  }

  render() {
    return (
      <div id="gtoc-form">
        <hr className="radio-group-hr" />
        <RadioGroup
          ref={this.saveRadioGroupRef}
          dataObject={this.store.values}
          required={true}
          id="gtocSelection"
          labelIsSrOnly={true}
          className="radiogroup-fieldset"
          {...this.props.formChildProps}>

            {this.renderRadioInputs('Subscribe to alerts', 'Select regions to subscribe to network alerts.')}
            <div className={this.store.values.gtocSelection === 'Subscribe to alerts' ? '' : 'hidden'}>
              <CheckboxList
                ref={this.saveCheckboxListRef}
                id="femaList"
                className="femalist-fieldset"
                labelText=""
                labelIsSrOnly={false}
                showRequiredAsterisk={false}
                required={this.store.values.gtocSelection === 'Subscribe to alerts'}
                selectAll={this.store.selectAll.bind(this.store)}
                clearAll={this.store.clearAll.bind(this.store)}
                {...this.props.formChildProps}>

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
            </div>

            <hr className="radio-group-hr" />
            {this.renderRadioInputs('Unsubscribe', 'Cancel all existing network alerts subscriptions.')}
            <hr className="radio-group-hr" />

        </RadioGroup>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          id="email"
          type="input"
          labelText="Email"
          required={true}
          getIsValid={utilsService.isValidEmailAddress}
          errorMessage="Please enter a valid email address."
          charLimit={256}
          {...this.props.formChildProps}/>
      </div>
    );
  }
}

export default asForm(GtocForm, {submitButtonText: 'Subscribe'})
