import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


import Toggle from '../toggle/toggle.jsx';

@observer
export class AppManagementBlock extends React.Component {

    static propTypes = {
        // TODO - potentially will need store, depending on interaction with changing the toggle
        // store: PropTypes.object.isRequired,
        app: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.handleAvailableClick = this.handleAvailableClick.bind(this)
        this.handleRecommendedClick = this.handleRecommendedClick.bind(this)
    }

    handleAvailableClick(){
        // TODO - Will move to a store or service once interaction has been determined
        this.props.app.available = !this.props.app.available;
    }

    handleRecommendedClick(){
        // TODO - Will move to a store or service once interaction has been determined
        this.props.app.recommended = !this.props.app.recommended;
    }

    render() {
        return (
            <div>
                <div className="app-management">
                    <Toggle label="Available" value={this.props.app.available} id={'Avail' + this.props.app.id} defaultOn={this.props.app.available} onClick={this.handleToggleClick} />
                    <Toggle label="Recommended" value={this.props.app.recommended} id={'Recom' + this.props.app.id} defaultOn={this.props.app.recommended} onClick={this.handleToggleClick} />
                    <Link to="/mdm">
                        <Button className="fn-primary">Push to MDM</Button>
                    </Link>
                </div>
            </div>
        );
    }
}
