import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export class MDMAlerts extends React.Component {
  static propTypes = {
    store: PropTypes.object
  }

  onRemoveName = (idx) => {
    this.props.store.removeAlert(idx);
  };

  render() {
    return (
      <div className="alerts-wrapper">
        {this.props.store.alert_msgs.map((alert, idx) => {
          return (
            <div role="alert" aria-live="assertive" className={`alert alert-${alert.type}`} key={idx}>
              <button type="button" className="close_btn" onClick={this.onRemoveName.bind(this, idx)}>
                <span aria-hidden="true">×</span>
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
