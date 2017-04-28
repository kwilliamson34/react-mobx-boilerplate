import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


import Toggle from '../toggle/toggle.jsx';

@observer 
export class AppManagementBlock extends React.Component {

    static propTypes = {

    }
    
    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.handleAvailableClick = this.handleAvailableClick.bind(this)
        this.handleRecommendedClick = this.handleRecommendedClick.bind(this)
    }

    handleAvailableClick(event){
        this.props.app.available = !this.props.app.available;
    }

    handleRecommendedClick(event){
        this.props.app.recommended = !this.props.app.recommended;
    }

    render() {
        return (
            <div>
                <div className="app-management">
                    <Toggle label="Available" value={this.props.app.available} defaultOn={true} onClick={this.handleToggleClick} />
                    <Toggle label="Recommended" value={this.props.app.recommended} onClick={this.handleToggleClick} />
                    <Link to="/mdm">
                        <Button className="fn-primary">Push to MDM</Button>
                    </Link>
                </div>
            </div>
        );
    }
}