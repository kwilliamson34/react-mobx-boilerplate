import React from 'react';
import {observer, inject} from 'mobx-react';
import {PropTypes} from 'prop-types';

import {FaqMain} from '../components/faq/faq-main.jsx';

@inject('store')
@observer
export default class FAQPage extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    return (
      <article className="faq-article">
        <section className="faq-page">
          <FaqMain store={this.props.store.contentStore}/>
        </section>
      </article>
    );
  }
}
