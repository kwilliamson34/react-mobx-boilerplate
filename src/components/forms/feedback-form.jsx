import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import asForm from './asForm.js'

@observer
class FeedbackForm extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)
    this.store = this.props.store;
  }

  render() {
    return (
      <div id="feedback-form">
        <label htmlFor="input1">Test Input 1</label>
        <input id="input1"></input>
        <label htmlFor="input2">Test Input 2</label>
        <input id="input2"></input>
      </div>
    );
  }
}

export default asForm(FeedbackForm, {submitButtonText: 'Submit Feedback'})
