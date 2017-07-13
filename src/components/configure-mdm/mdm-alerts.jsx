import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export class MDMAlerts extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    page: PropTypes.string
  }

  componentDidUpdate() {
    if (this.refs.alert_focus) {
      this.refs.alert_focus.focus();
    }
  }

  onRemoveName = (idx) => {
    this.props.store.removeAlert(this.props.page,idx);
  };

  render() {
    let alert_msgs = null;

    switch (this.props.page) {
      case 'mdm_form':
          alert_msgs = this.props.store.form_alerts;
          break;
      case 'manage_apps':
          alert_msgs = this.props.store.app_alerts;
          break;
      default:
          alert_msgs = []
    }

    return (
      <div id="mdm-alerts" className="alerts-wrapper">
        {alert_msgs.map((alert, idx) => {
          return (
            <div role="alert" ref="alert_focus" aria-live="assertive" className={`alert alert-${alert.type}`} tabIndex="0" key={idx}>
              <button type="button" className="close_btn icon-close" onClick={this.onRemoveName.bind(this, idx)}>

                <span className="sr-only">Close alert</span>
              </button>
              <p><strong>{alert.headline}</strong>{alert.message}</p>
            </div>
          )
        })}
      </div>
    );
  }
}
