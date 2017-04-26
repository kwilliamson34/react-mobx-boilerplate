import React from 'react';
import {Button} from 'react-bootstrap';
import TitlePane from '../components/title-pane';

export default class ShopPlansView extends React.Component {
    render() {
        return (
          <main id="content-main">
            <TitlePane pageTitle="Plans"/>
            <div className="container">
                <section className="content-wrapper">
                    <h2 className="section-heading text-center">Find the right plan - at the right price</h2>
                    <div className="section-copy">
                        <p>FirstNet was created to deliver a world-class broadband network at an affordable price. While FirstNet rate
                        plans will be available soon, rest assured that pricing will be aggressive, in line with existing government contract rates.</p>
                        <p>FirstNet will support feature phones, smartphones and data-only devices ranging from tablets and connected laptops to
                        trunk-mount modems, connected wearable devices and Internet of Things  devices. All FirstNet rate plans will feature unlimited
                        voice calls and SMS messaging for applicable devices and offer flexibility in adding new devices to the public safety mobility
                        ecosystem.</p>
                        <p>Data is shared with your group, increasing the total data available to all, and data plans can be adjusted up or down as needed,
                         up to 1000 gigabytes per user per month. Plus, all rate plans include Dynamic Traffic Management at no additional charge.</p>
                        <p>The combination of affordable, flexible pricing, prioritization and preemption capabilities, dedicaed spectrum, 24x7 support and
                         a dedicated app store makes FirstNet both a performance and value leader for public safety.</p>
                        <Button href="#link" className='fn-primary'>Contact Us to Learn More</Button>
                    </div>
                </section>
            </div>
          </main>
        )
    }
}