import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

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

  cutContactWebsite = (url) => {
    return url.includes('www.') ? url.split('www.')[1] : url.split('://')[1];
  }

  render() {
    return(
      <section className="purchasing-info">
        <h2>For Purchasing</h2>
        <div>
          <ul className="purchase-options-list">
            {this.props.contactInfo.contact_name !== '' &&
              <li>
                <strong>Contact:</strong>
                <span dangerouslySetInnerHTML={{__html: this.props.contactInfo.contact_name}} />
              </li>
            }
            {this.props.contactInfo.contact_phone !== '' &&
              <li>
                <strong aria-hidden="true">Phone:</strong>
                <a href={`tel:${this.props.contactInfo.contact_phone}`}>
                  <span className="sr-only">Phone:&nbsp;</span>
                  {this.props.contactInfo.contact_phone}
                </a>
              </li>
            }
            {this.props.contactInfo.contact_email !== '' &&
              <li>
                <strong aria-hidden="true">Email:</strong>
                <a href={`mailto:${this.props.contactInfo.contact_email}`}><span className="sr-only">Email:&nbsp;</span>{this.props.contactInfo.contact_email}</a>
              </li>
            }
            {this.props.contactInfo.contact_company !== '' &&
              <li>
                <strong>Company:</strong>
                <span dangerouslySetInnerHTML={{__html: this.props.contactInfo.contact_company}} />
              </li>
            }
            {this.props.contactInfo.contact_website !== '' &&
              <li>
                <strong aria-hidden="true">Website:</strong>
                <a href={this.props.contactInfo.contact_website}><span className="sr-only">Website:&nbsp;</span>{this.cutContactWebsite(this.props.contactInfo.contact_website)}</a>
              </li>
            }
          </ul>
        </div>
      </section>
    )
  }
}
