import React from 'react';
import { Link } from 'react-router-dom';

export default class PlansAndDevices extends React.Component {

    render() {
        return (
            <section className="placeholder mp-links">
                <div className="container max-container">
                    <h2>Shop Plans and Devices</h2>
                    <div className="row">

                        <div className="col-xs-12 col-sm-12 col-md-4 text-left device-row">
                            <div className="imagebox view-solutions">
                                <h3>Solutions</h3>
                                <p>Lorem ipsum dolor sit amet consectetuer adipiscing elit</p>
                                <Link to="view-solutions" className="pad-button btn btn-lg btn-default">View Solutions</Link>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-4 text-left device-row">
                            <div className="imagebox rate-plans">
                                <h3>Rate Plans</h3>
                                <p>Lorem ipsum dolor sit amet consectetuer adipiscing elit</p>
                                <Link to="view-solutions" className="pad-button btn btn-lg btn-default">Shop Plans</Link>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-4 text-left device-row">
                            <div className="imagebox shop-devices">
                                <h3>Devices & Accessories</h3>
                                <p>Lorem ipsum dolor sit amet consectetuer adipiscing elit</p>
                                <Link to="view-solutions" className="pad-button btn btn-lg btn-default">Shop Devices</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}