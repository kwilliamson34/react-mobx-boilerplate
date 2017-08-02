import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import Truncate from '../truncate/truncate';

@observer
export class FaqEntry extends React.Component {

  static propTypes = {
    faq: PropTypes.shape({
			question: PropTypes.string.isRequired,
			answer: PropTypes.string.isRequired,
			maxStringLength: PropTypes.number
		}),
    num: PropTypes.number.isRequired
  }

  render() {
    return (
      <article className="faq-entry">
        <h3 id={'faq-' + this.props.num}>{this.props.faq.question}</h3>
        <Truncate className="faq-entry-content truncate-container" charLimit={this.props.faq.maxStringLength}>
          {this.props.faq.answer}
        </Truncate>
      </article>
    );
  }
}
