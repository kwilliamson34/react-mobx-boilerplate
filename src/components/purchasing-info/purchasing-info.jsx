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

  cutContactWebsite = (url) => {
    return url.includes('www.') ? url.split('www.')[1] : url.split('://')[1];
  }

  render() {
    return(
      <section className="purchasing-info">
        <h2 className="purchasing-info-headline">For Purchasing</h2>
        <hr className="purchasing-info-hr" />
        <div>
          <ul className="purchase-options-list">
            {this.props.contactInfo.contact_name !== '' &&
              <li className="purchasing-options-list-item">
                <strong className="purchasing-options-strong">Contact:</strong>
                <span className="purchasing-options-non-link" dangerouslySetInnerHTML={{__html: this.props.contactInfo.contact_name}} />
              </li>
            }
            {this.props.contactInfo.contact_phone !== '' &&
              <li className="purchasing-options-list-item">
                <strong className="purchasing-options-strong" aria-hidden="true">Phone:</strong>
                <a className="purchasing-options-link" href={`tel:${this.props.contactInfo.contact_phone}`}>
                  <span className="sr-only">Phone:&nbsp;</span>
                  {this.props.contactInfo.contact_phone}
                </a>
              </li>
            }
            {this.props.contactInfo.contact_email !== '' &&
              <li className="purchasing-options-list-item">
                <strong className="purchasing-options-strong" aria-hidden="true">Email:</strong>
                <a className="purchasing-options-link" href={`mailto:${this.props.contactInfo.contact_email}`}><span className="sr-only">Email:&nbsp;</span>{this.props.contactInfo.contact_email}</a>
              </li>
            }
            {this.props.contactInfo.contact_company !== '' &&
              <li className="purchasing-options-list-item">
                <strong className="purchasing-options-strong">Company:</strong>
                <span dangerouslySetInnerHTML={{__html: this.props.contactInfo.contact_company}} />
              </li>
            }
            {this.props.contactInfo.contact_website !== '' &&
              <li className="purchasing-options-list-item">
                <strong className="purchasing-options-strong" aria-hidden="true">Website:</strong>
                <span className="sr-only">Website:&nbsp;</span>
                <NewTabLink className="purchasing-options-link" to={this.props.contactInfo.contact_website}>
                  {this.cutContactWebsite(this.props.contactInfo.contact_website)}
                </NewTabLink>
              </li>
            }
          </ul>
        </div>
      </section>
    )
  }
}
