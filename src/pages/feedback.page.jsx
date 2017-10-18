import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import FeedbackForm from '../components/feedback/feedback-form';
import PageTitle from '../components/page-title/page-title';

@inject('store')
@observer
export default class FeedbackPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.feedbackStore = this.props.store.feedbackStore;
  }

  render = () => {
    return (
      <section id="customer-feedback-page" className="standalone-form-page">
        <div className="content-wrapper">
          <div className="container">
            <div className="row text-center">
              <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <PageTitle>Give Us Feedback</PageTitle>
              </div>
            </div>
            <div className="row">
              <section className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <FeedbackForm store={this.feedbackStore}/>
              </section>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
