import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import { observer } from 'mobx-react';
import { appStore } from '../../core/stores/apps.store';

@observer export default class AppAvailability extends Component {

  componentDidMount(){
    appStore.getAppAvailability();
  }

  render() {
      return (
        <div className="admin-component">
          <div className="ac-panel-heading">
            <h4>App Status</h4>
          </div>
          <ListGroup className="ac-panel-body">
            <ListGroupItem className="col-xs-6">
              <h4 className="list-group-item-heading"><i className="mdi mdi-new-box"></i>New</h4>
              <p className="list-group-item-text">{appStore.newApps}</p>
            </ListGroupItem>
            <ListGroupItem className="col-xs-6">
              <Button href="/admin/manage-apps" className='fn-primary'>Manage Apps</Button>
            </ListGroupItem>
            <ListGroupItem className="col-xs-6">
              <h4 className="list-group-item-heading"><i className="mdi mdi-check-circle-outline"></i>Not Blocked</h4>
              <p className="list-group-item-text">{appStore.notBlockedApps}</p>
              </ListGroupItem>
            <ListGroupItem className="col-xs-6">
              <h4 className="list-group-item-heading"><i className="mdi mdi-block-helper"></i>Blocked</h4>
              <p className="list-group-item-text">{appStore.blockedApps}</p>
              </ListGroupItem>
            <ListGroupItem className="col-xs-6">
              <h4 className="list-group-item-heading"><i className="mdi mdi-star-off"></i> Not Recommended</h4>
              <p className="list-group-item-text">{appStore.notRecApps}</p>
              </ListGroupItem>
            <ListGroupItem className="col-xs-6">
              <h4 className="list-group-item-heading"><i className="mdi mdi-star"></i>Recommended</h4>
              <p className="list-group-item-text">{appStore.recApps}</p>
              </ListGroupItem>
            <ListGroupItem className="col-xs-6">
              <h4 className="list-group-item-heading"><i className="mdi mdi-wifi-off"></i>Not Pushed to MDM</h4>
              <p className="list-group-item-text">{appStore.notPushedApps}</p>
              </ListGroupItem>
            <ListGroupItem className="col-xs-6">
              <h4 className="list-group-item-heading"><i className="mdi mdi-wifi"></i>Pushed to MDM</h4>
              <p className="list-group-item-text">{appStore.pushedApps}</p>
              </ListGroupItem>
          </ListGroup>
        </div>
      )
  }
}