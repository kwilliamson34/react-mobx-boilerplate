import React from 'react';
import {observer, inject} from 'mobx-react';
import {PropTypes} from 'prop-types';

import {faqs} from '../content/faq-data.json';
import {FAQ} from 'fn-common-ui';
import PageTitle from '../components/page-title/page-title';

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
          <div className="faq-header">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1">
                  <PageTitle>Frequently Asked&nbsp;Questions</PageTitle>
                </div>
              </div>
            </div>
          </div>
          <FAQ faqData={faqs} userRolesArray={this.props.store.userStore.user.roles}/>
        </section>
      </article>
    );
  }
}
