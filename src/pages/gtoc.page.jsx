import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import $ from 'jquery';

import {history} from '../core/services/history.service';
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

  componentWillMount() {
    this.gtocStore.enableSaveDialogs();
  }

  componentWillUnmount() {
    this.clearModals();
    this.gtocStore.disableSaveDialogs();
    if (!this.gtocStore.formIsValid && !this.gtocStore.formHasEntries || this.gtocStore.checklistHasEntries) {
      this.gtocStore.clearForm();
    }
  }

  toggleExitModal = (e) => {
    e.preventDefault();
    this.gtocStore.toggleExitModal()
  }

  toggleAlertBar = (e) => {
    e.preventDefault();
    this.gtocStore.toggleAlertBar();
  }

  discardFormChanges = (e) => {
    e.preventDefault();
    this.gtocStore.clearForm();
    history.replace(this.gtocStore.interceptedRoute);
  }

  showModal = (shouldShow, modalID) => {
    if (shouldShow) {
      $(modalID).modal({backdrop: 'static'});
    } else {
      $(modalID).modal('hide');
      $(modalID).data('bs.modal', null);
    }
  }

  clearModals = () => {
    $('.modal-backdrop, #network-alerts-exit-modal').remove();
    $('body').removeClass('modal-open');
  }

  renderExitModal = (showExitModal) => {
    this.showModal(showExitModal, '#network-alerts-exit-modal');
    return (
      <div id="network-alerts-exit-modal" role="dialog" tabIndex="-1" className="modal fade" aria-labelledby="network-alerts-modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.toggleExitModal}>
                <i aria-hidden="true" className="icon-close"></i>
                <span className="sr-only">close window</span>
              </button>
              <div className="row no-gutters" id="network-alerts-modal-title">
                <div className="col-xs-12">
                  <h1 className="as-h2">Unsaved changes</h1>
                  <p>Your form changes will not be saved if you navigate away from this page.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className="fn-primary" onClick={this.toggleExitModal}>Stay on Page</button>
                  <button className="fn-secondary" onClick={this.discardFormChanges}>Discard Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
        hasError: this.gtocStore.hasErrors.gtoc_femaList
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
                  selectAllButtonChecked={this.gtocStore.selectAllButtonChecked}
                  allCheckboxesChecked={this.gtocStore.allCheckboxesChecked}
                  checkboxListHasError={this.gtocStore.checkboxListHasError}
                  submitButtonDisabled={!this.gtocStore.requiredFieldsEntered}
                  submitButtonText='Subscribe'/>
              </section>
            </div>
          </div>
        </div>
        {this.renderExitModal(this.gtocStore.showExitModal)}
      </section>
    )
  }
}
