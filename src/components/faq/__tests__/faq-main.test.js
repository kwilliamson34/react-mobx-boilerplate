jest.unmock('../faq-main');

import React from 'react';
import { FaqMain } from '../faq-main.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('<FaqMain />', () => {

    let faqs = {
        categories: ["Lorem Ipsum 1"],
        entries: [{question: 'question', answer: 'answer', id:100, maxStringLength: 5, category: 'Lorem Ipsum 1'}]
    }
    let faqCategoryFilter = 'ALL';
    let filteredFaqEntries = faqs.entries;

    let props = {
        store: {
            faqs: faqs,
            faqCategoryFilter: faqCategoryFilter,
            filteredFaqEntries: filteredFaqEntries,
            updateFilter: jest.fn(),
            toggleFaqPageHeaderButton: jest.fn()
        }
    };

    describe('Render testing', () => {
        test('Matches snapshot', () => {
            const component = renderer.create(
                <MemoryRouter>
                    <FaqMain {...props} />
                </MemoryRouter>
                );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('Functions work correctly', () => {
        test('Does category dropdown click work?', () => {
            let componentSelect = TestUtils.renderIntoDocument(<FaqMain {...props} />);
            let select = TestUtils.findRenderedDOMComponentWithTag(componentSelect, 'select');

            let options = select.options.length
            let initialValue = select.value === 'ALL';
            expect(options).toBe(2);
            expect(initialValue).toBe(true);

            TestUtils.Simulate.change(select, {target: {value: 'Lorem Ipsum 1'}});
        });
    });

    describe('Functions work correctly', () => {
        test('Does category tab click work?', () => {
            var componentClick = TestUtils.renderIntoDocument(<FaqMain {...props} />)
            var categoryButton = TestUtils.findRenderedDOMComponentWithClass(componentClick, 'category-tab-button');
            TestUtils.Simulate.click(categoryButton);            
        });
    });

    describe('Mounting', () => {
        test('Does mount work?', () => {
            var component = TestUtils.renderIntoDocument(<FaqMain {...props} />)
            component.componentWillMount();            
            expect(props.store.toggleFaqPageHeaderButton).toBeCalled();
        });

        test('Does unmount work?', () => {
            var component = TestUtils.renderIntoDocument(<FaqMain {...props} />)
            component.componentWillUnmount();            
            expect(props.store.toggleFaqPageHeaderButton).toBeCalled();
        });
    });
});

