import React from 'react';
import { Link } from 'react-router-dom';

export default class PlansAndDevices extends React.Component {

    render() {
        return (
            <section className="placeholder mp-links">
                <div className="container max-container">
                    <h2>Shop Plans and Devices</h2>
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 text-left">
                            <div className="imagebox-plans-and-devices type-view-solutions" aria-hidden="true">
                                <h3 className="text-left plans-and-devices-title plans-and-devices-spacing">Solutions</h3>
                                <p className="text-left plans-and-devices-p plans-and-devices-spacing">Lorem ipsum dolor sit amet consectetuer adipiscing elit</p>
                                <Link to="view-solutions" className="plans-and-devices-button btn btn-lg btn-default">View Solutions</Link>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-4 text-left">
                            <div className="imagebox-plans-and-devices type-rate-plans" aria-hidden="true">
                                <h3 className="text-left plans-and-devices-title plans-and-devices-spacing">Rate Plans</h3>
                                <p className="text-left plans-and-devices-p plans-and-devices-spacing">Lorem ipsum dolor sit amet consectetuer adipiscing elit</p>
                                <Link to="rate-plans" className="plans-and-devices-button btn btn-lg btn-default">Shop Plans</Link>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-4 text-left">
                            <div className="imagebox-plans-and-devices type-shop-devices" aria-hidden="true">
                                <h3 className="text-left plans-and-devices-title plans-and-devices-spacing">Devices & Accessories</h3>
                                <p className="text-left plans-and-devices-p plans-and-devices-spacing">Lorem ipsum dolor sit amet consectetuer adipiscing elit</p>
                                <Link to="shop-devices" className="plans-and-devices-button btn btn-lg btn-default">Shop Devices</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}