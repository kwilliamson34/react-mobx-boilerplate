import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {NewTabLink} from 'fn-common-ui';

@observer
export default class PurchasingInfo extends React.Component {

  static propTypes = {
    contactInfo: PropTypes.shape({
      contact_name: PropTypes.string,
      contact_phone: PropTypes.string,
      contact_email: PropTypes.string,
      contact_company: PropTypes.string,
      contact_website: PropTypes.string
    })
  }

  constructor(props) {
    super(props);
    this.testInfo = {
      contact_name: 'Falseto Divine',
      contact_phone: '555-555-5555',
      contact_email: 'divine-voice@falseto.com',
      contact_company: 'High Pitched Screeching Ltd.',
      contact_website: 'https://www.google.com/search?q=very+long+url&oq=very+long+url&aqs=chrome..69i57j0l2.2774j0j1&sourceid=chrome&ie=UTF-8'
    }
  }



  cutContactWebsite = (url) => {
    return url.includes('www.') ? url.split('www.')[1] : url.split('://')[1];
  }

  render() {
    return(
      <section className="purchasing-info">
        <h2>For Purchasing</h2>
        <hr />
        <div>
          <ul className="purchase-options-list">
            {this.testInfo.contact_name !== '' &&
              <li>
                <strong>Contact:</strong>
                <span dangerouslySetInnerHTML={{__html: this.testInfo.contact_name}} />
              </li>
            }
            {this.testInfo.contact_phone !== '' &&
              <li>
                <strong aria-hidden="true">Phone:</strong>
                <a href={`tel:${this.testInfo.contact_phone}`}>
                  <span className="sr-only">Phone:&nbsp;</span>
                  {this.testInfo.contact_phone}
                </a>
              </li>
            }
            {this.testInfo.contact_email !== '' &&
              <li>
                <strong aria-hidden="true">Email:</strong>
                <a href={`mailto:${this.testInfo.contact_email}`}><span className="sr-only">Email:&nbsp;</span>{this.testInfo.contact_email}</a>
              </li>
            }
            {this.testInfo.contact_company !== '' &&
              <li>
                <strong>Company:</strong>
                <span dangerouslySetInnerHTML={{__html: this.testInfo.contact_company}} />
              </li>
            }
            {this.testInfo.contact_website !== '' &&
              <li>
                <strong aria-hidden="true">Website:</strong>
                <span className="sr-only">Website:&nbsp;</span>
                <NewTabLink to={this.testInfo.contact_website}>
                  {this.cutContactWebsite(this.testInfo.contact_website)}
                </NewTabLink>
              </li>
            }
          </ul>
        </div>
      </section>
    )
  }
}
