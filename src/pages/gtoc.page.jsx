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

  componentDidUpdate() {
    console.log(this.gtocStore.gtocObject);
  }

  getInputList = () => {
    return [
      {
        id: 'gtoc_email',
        label: 'Email',
        genericLabel: 'valid email address',
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
              <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <h1>Subscribe to Alerts</h1>
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
                  submitButtonDisabled={!this.gtocStore.requiredFieldsEntered}
                  submitButtonText='Submit Feedback'/>
              </section>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
