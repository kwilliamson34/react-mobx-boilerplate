import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import BreadcrumbNav from '../components/nav/breadcrumb-nav';
import FeedbackForm from '../components/feedback/feedback-form';

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
    const links = [
      {
        pageHref: '',
        pageTitle: 'Home'
      },
      {
        pageHref: '/feedback',
        pageTitle: 'Submit Feedback'
      }
    ]
    return (
      <article id="feedback-page" className="standalone-form-page">
        <BreadcrumbNav links={links}></BreadcrumbNav>
        <div className="container">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
              <h1>Submit Feedback</h1>
              <FeedbackForm store={this.feedbackStore}/>
            </div>
          </div>
        </div>
      </article>
    )
  }
}
