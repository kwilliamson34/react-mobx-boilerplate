import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {FormTemplate} from '../components/form-template/form-template';

@inject('store')
@observer
export default class SubscribeToGTOC extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.gtocStore = this.props.store.gtocStore;
  }

  toggleAlertBar = (e) => {
    e.preventDefault();
    this.gtocStore.toggleAlertBar();
  }

  getInputList = () => {
    const checkboxList = [
      {
        value: 'Region I: Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont',
        label: '<strong>Region I:&nbsp;</strong><span>Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont</span>'
      },
      {
        value: 'Region II: New Jersey, New York, Puerto Rico, Virgin Islands',
        label: '<strong>Region II:&nbsp;</strong><span>New Jersey, New York, Puerto Rico, Virgin Islands</span>'
      },
      {
        value: 'Region III: District of Columbia, Delaware, Maryland, Pennsylvania, Virginia, West Virginia',
        label: '<strong>Region III:&nbsp;</strong><span>District of Columbia, Delaware, Maryland, Pennsylvania, Virginia, West Virginia</span>'
      },
      {
        value: 'Region IV: Alabama, Florida, Georgia, Kentucky, Mississippi, North Carolina, South Carolina, Tennessee',
        label: '<strong>Region IV:&nbsp;</strong><span>Alabama, Florida, Georgia, Kentucky, Mississippi, North Carolina, South Carolina, Tennessee</span>'
      },
      {
        value: 'Region V: Illinois, Indiana, Michigan, Minnesota, Ohio, Wisconsin',
        label: '<strong>Region V:&nbsp;</strong><span>Illinois, Indiana, Michigan, Minnesota, Ohio, Wisconsin</span>'
      },
      {
        value: 'Region VI: Arkansas, Louisiana, New Mexico, Oklahoma, Texas',
        label: '<strong>Region VI:&nbsp;</strong><span>Arkansas, Louisiana, New Mexico, Oklahoma, Texas</span>'
      },
      {
        value: 'Region VII: Iowa, Kansas, Missouri, Nebraska',
        label: '<strong>Region VII:&nbsp;</strong><span>Iowa, Kansas, Missouri, Nebraska</span>'
      },
      {
        value: 'Region VIII: Colorado, Montana, North Dakota, South Dakota, Utah, Wyoming',
        label: '<strong>Region VIII:&nbsp;</strong><span>Colorado, Montana, North Dakota, South Dakota, Utah, Wyoming</span>'
      },
      {
        value: 'Region IX: Arizona, California, Hawaii, Nevada, Pacific Islands',
        label: '<strong>Region IX:&nbsp;</strong><span>Arizona, California, Hawaii, Nevada, Pacific Islands</span>'
      },
      {
        value: 'Region X: Alaska, Idaho, Oregon, Washington',
        label: '<strong>Region X:&nbsp;</strong><span>Alaska, Idaho, Oregon, Washington</span>'
      }
    ]

    return [
      {
        id: 'gtoc_femaList',
        type: 'checkbox',
        label: 'Select Network Regions',
        genericLabel: 'at least one option',
        required: true,
        checkboxList: checkboxList,
        checkedByDefault: false,
        showSelectionButtons: true,
        hasError: this.gtocStore.checkboxListHasError
      },
      {
        id: 'gtoc_email',
        type: 'text',
        label: 'Email',
        genericLabel: 'valid email address',
        required: true,
        value: this.gtocStore.gtocObject.gtoc_email,
        hasError: this.gtocStore.hasErrors.gtoc_email,
        charLimit: 10000
      }
    ]
  }

  render = () => {
    return (
      <section id="subscribe-to-gtoc-page">
        <div className="content-wrapper">
          <div className="container">
            <div className="row text-center">
              <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8">
                <h1>Subscribe to Network Alerts</h1>
              </div>
              <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <figure>
                  <figcaption>FEMA Regions Map</figcaption>
                  <img className="img-responsive" src="/images/fema-regions-map.png" alt=""/>
                </figure>
              </div>
            </div>
            <div className="row">
              <section className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <FormTemplate id="gtoc-form"
                  ref={ref => this.form = ref}
                  inputList={this.getInputList() || []}
                  onSubmit={this.gtocStore.handleSubmit.bind(this.gtocStore)}
                  onChange={this.gtocStore.handleChange.bind(this.gtocStore)}
                  onBlur={this.gtocStore.handleBlur.bind(this.gtocStore)}
                  errorBody={this.gtocStore.showAlertBar ? 'Please correct the errors below.' : ''}
                  toggleAlertBar={this.gtocStore.toggleAlertBar.bind(this.gtocStore)}
                  clearForm={this.gtocStore.clearForm.bind(this.gtocStore)}
                  formHasEntries={this.gtocStore.formHasEntries}
                  selectAllButtonChecked={this.gtocStore.selectAllButtonChecked}
                  allCheckboxesChecked={this.gtocStore.allCheckboxesChecked}
                  submitButtonDisabled={!this.gtocStore.requiredFieldsEntered}
                  submitButtonText='Subscribe'/>
              </section>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
