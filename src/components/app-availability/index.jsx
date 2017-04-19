import React from 'react';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class AppAvailability extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pageTitle: this.props.pageTitle
      }
    }

    render() {
        return (
          <div className="admin-component">
            <div className="ac-panel-heading">
              <h3>App Status</h3>
            </div>
            <ListGroup className="ac-panel-body">
              <ListGroupItem className="col-xs-6" header="New">0</ListGroupItem>
              <ListGroupItem className="col-xs-6">
                <Button href="/admin/manage-apps" className='fn-primary'>Manage Apps</Button>
              </ListGroupItem>
              <ListGroupItem className="col-xs-6" header="Not Blocked">14</ListGroupItem>
              <ListGroupItem className="col-xs-6" header="Blocked">0</ListGroupItem>
              <ListGroupItem className="col-xs-6" header="Not Recommended">14</ListGroupItem>
              <ListGroupItem className="col-xs-6" header="Recommended">0</ListGroupItem>
              <ListGroupItem className="col-xs-6" header="Not Pushed to MDM">0</ListGroupItem>
              <ListGroupItem className="col-xs-6" header="Pushed to MDM">14</ListGroupItem>
            </ListGroup>
          </div>
        )
    }
}

AppAvailability.propTypes = {
  pageTitle: PropTypes.string
};
