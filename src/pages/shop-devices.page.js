import React from 'react';
import {Button} from 'react-bootstrap';
import TitlePane from '../components/title-pane';

export default class ShopPlansView extends React.Component {
    render() {
        return (
          <main id="content-main">
            <TitlePane pageTitle="Plans"/>
            <div className="content-wrapper shop-devices  text-center">
                <section className="product-row">
                    <div className="container">
                        <h2 className="as-h3">FirstNet offers an extensive selection of devices and accessories</h2>
                        <p>To learn more about our full portfolio, contact a FirstNet Specialist.</p>
                    </div>
                </section>
                <section className="product-row">
                    <div className="container">
                        <h1>Phones</h1>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <Button href="#link" className='fn-primary'>Explore all smartphones</Button>
                    </div>
                </section>
                <section className="product-row">
                    <div className="container">
                        <h1>Tablets</h1>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <Button href="#link" className='fn-primary'>Explore all tablets</Button>
                    </div>
                </section>
                <section className="product-row">
                    <div className="container">
                        <h1>In-Vehicle</h1>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <Button href="#link" className='fn-primary'>Explore all In-Vehicle</Button>
                    </div>
                </section>
                <section className="product-row">
                    <div className="container">
                        <h1>Accessories</h1>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="card-container has-shadow">
                            <span></span>
                            <img src="" alt=""></img>
                        </div>
                        <Button href="#link" className='fn-primary'>Explore all Accessories</Button>
                    </div>
                </section>
            </div>
          </main>
        )
    }
}