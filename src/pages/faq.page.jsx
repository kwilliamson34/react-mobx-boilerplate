import React from 'react';
import {observer, inject} from 'mobx-react';
import {PropTypes} from 'prop-types';

import {faqs} from '../content/faq-data.json';
import {Faq} from '../components/faq/faq.jsx';

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
          <Faq faqData={faqs} userRolesArray={this.props.store.userStore.user.roles}/>
        </section>
      </article>
    );
  }
}
