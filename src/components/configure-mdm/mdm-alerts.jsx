import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export class MDMAlerts extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    psk: PropTypes.string, //PSK is specified if the user is on the AppDetails page
    alertList: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired
  }

  focus() {
    if (this.refs.alert_focus) {
      this.refs.alert_focus.focus();
    }
  }

  onCloseButtonClick = (idx) => {
    this.props.store.removeAlert(this.props.alertList, idx);
    this.props.store.clearAppsReferencedByAlert();
  };

  render() {
    return (
      <div id="mdm-alerts" className="alerts-wrapper">
        {this.props.alertList.map((alert, idx) => {
          if(!this.props.psk || this.props.psk === alert.psk) {
            return (
              <div role="alert" ref="alert_focus" aria-live="assertive" className={`alert alert-${alert.type}`} tabIndex="0" key={idx}>
                <button type="button" className="close_btn icon-close" onClick={this.onCloseButtonClick.bind(this, idx)}>
                  <span className="sr-only">Close alert</span>
                </button>
                <p>
                  <strong>{alert.headline}</strong>{alert.message}
                </p>
              </div>
            )
          }
        })}
      </div>
    );
  }
}
