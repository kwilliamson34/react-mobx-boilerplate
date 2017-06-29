import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class FaqEntry extends React.Component {

	static propTypes = {
		faq: PropTypes.object.isRequired,
		num: PropTypes.number.isRequired
	}

	constructor(props) {
		super(props);
        let needsMoreButton = this.props.faq.answer.substring(0,this.props.faq.maxStringLength) !== this.props.faq.answer;
        this.state = { status: 'more', answer: this.createAnswer('more'), needsMoreButton: needsMoreButton};
        this.toggleText = this.toggleText.bind(this)
        this.answerWithEllipsis = this.answerWithEllipsis.bind(this);
	}

    createMarkup() {
        return {__html: this.createAnswer(this.state.status)};
    }

    toggleText(event)
    {
		event.preventDefault();
        let newStatus = (this.state.status === 'less'?'more':'less');
        this.setState({status: newStatus, answer: this.createAnswer(newStatus)});
    }

    answerWithEllipsis() {
        let faqTextAnswer = '';

        if (this.props.faq.answer.substring(0,this.props.faq.maxStringLength) === this.props.faq.answer) {
            faqTextAnswer = this.props.faq.answer;
        } else {
            faqTextAnswer = this.props.faq.answer.substring(0,this.props.faq.maxStringLength) + '...';
        }
        return faqTextAnswer;
    }

    createAnswer(status) {
        let fullAnswer = '';

        if (status==='less') {
            fullAnswer = this.props.faq.answer;
        } else {
            fullAnswer = this.answerWithEllipsis();
        }
        return fullAnswer;
    }

	render() {

		return (
            <article className="faq-entry">
                <h3>{this.props.faq.question}</h3>
                <div className="faq-entry-content">
                    <div key={this.state.status + this.props.num} dangerouslySetInnerHTML={this.createMarkup()}></div>
                    <div className={this.state.needsMoreButton?'faq-entry-content-button':'hidden'} >
                        <div className={'show-more-link ' + (this.state.status==='more' ? 'open' : 'closed')} aria-hidden="true">
                            <a href="#" role="button" onClick={this.toggleText.bind(this)} className="toggle-button">
                                {'Show ' + this.state.status}
                            </a>
                        </div>
                    </div>
                </div>
            </article>
		);
	}
}