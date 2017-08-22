import React from 'react';
import {inject, observer} from 'mobx-react';
import {history} from '../core/services/history.service';

@inject('store')
@observer
export default class FeedbackPage extends React.Component {
  goHome = (e) => {
    e.preventDefault();
    history.replace('/');
  }

  render() {
    return (
      <section className="success-page">
        <div className="success-content">
          <h1>Thanks for your feedback!</h1>
          <p>We appreciate you taking the time to provide your thoughts about this site. Your comments will help us to improve our tools going forward.</p>
          <button className="fn-primary" onClick={this.goHome}>Return Home</button>
        </div>
      </section>
    )
  }
}
