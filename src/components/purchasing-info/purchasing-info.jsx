import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class PurchasingInfo extends React.Component {

  static PropTypes = {
    contactInfo: PropTypes.object
  }

  cutContactWebsite = (url) => {
    return url.includes('www.') ? url.split('www.')[1] : url.split('://')[1];
  }

  render() {
    console.log('this.props.contactInfo   ', this.props.contactInfo);
    return(
      <div className="row">
        <div
          className="
          col-xs-10 col-xs-offset-1
          col-sm-offset-1 col-sm-10
          col-md-6 col-md-offset-5
          col-lg-7 col-lg-offset-4">
          <h2 className="as-h3">For Purchasing</h2>
          <div>
            <ul className="purchase-options-list">
              {this.props.contactInfo.contact_name !== '' &&
                <li>
                  <strong>Contact:</strong>
                  <span>{this.props.contactInfo.contact_name}</span>
                </li>
              }
              {this.props.contactInfo.contact_phone !== '' &&
                <li>
                  <strong>Phone:</strong>
                  <a href={`tel:${this.props.contactInfo.contact_phone}`}>{this.props.contactInfo.contact_phone}</a>
                </li>
              }
              {this.props.contactInfo.contact_email !== '' &&
                <li>
                  <strong>Email:</strong>
                  <a href={`mailto:${this.props.contactInfo.contact_email}`}>{this.props.contactInfo.contact_email}</a>
                </li>
              }
              {this.props.contactInfo.contact_company !== '' &&
                <li>
                  <strong>Company:</strong>
                  <span>{this.props.contactInfo.contact_company}</span>
                </li>
              }
              {this.props.contactInfo.contact_website !== '' &&
                <li>
                  <strong>Website:</strong>
                  <a href={this.props.contactInfo.contact_website}>{this.cutContactWebsite(this.props.contactInfo.contact_website)}</a>
                </li>
              }
            </ul>
          </div>

        </div>
      </div>
    )
  }
}
