jest.unmock('../faq-entry');

import { FaqEntry } from '../faq-entry.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('<FaqEntry />', () => {

    let num = 100;
    let faq = {
        question: 'Sample Question', 
        answer: 'Sample Answer', 
        id:100, 
        maxStringLength: 5, 
        category: 'Lorem Ipsum 1'
    };

    let props = {
        faq: faq,
        num: num
    };

    describe('render testing', () => {
        test('matches snapshot', () => {
            const component = renderer.create(
                <MemoryRouter>
                    <FaqEntry {...props} />
                </MemoryRouter>
                );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('functions work correctly', () => {
        test("Does more or less value work as expected, default to more", () => {
            const component = TestUtils.renderIntoDocument(<FaqEntry {...props} />)
            expect(component.state.status).toBe('more');
            component.createAnswer('less');
            expect(component.state.status).toBe('more');
        });

        test('Does more or less value work as expected when clicked', () => {
            var componentClick = TestUtils.renderIntoDocument(<FaqEntry {...props} />)
            var showMoreButton = TestUtils.findRenderedDOMComponentWithClass(componentClick, 'toggle-button');
            expect(componentClick.state.status).toBe('more');
            TestUtils.Simulate.click(showMoreButton);
            expect(componentClick.state.status).toBe('less');
            TestUtils.Simulate.click(showMoreButton);
            expect(componentClick.state.status).toBe('more');
        });

        test('Does ellipsis add work?', () => {
            var componentClick = TestUtils.renderIntoDocument(<FaqEntry {...props} />)
            var showMoreButton = TestUtils.findRenderedDOMComponentWithClass(componentClick, 'toggle-button');
            var displayedText = TestUtils.findRenderedDOMComponentWithClass(componentClick, 'displayed-content').innerHTML;
            var ellipsis = displayedText.substr(displayedText.length-3, displayedText.length-1)==='...';
            expect(ellipsis).toBe(true);

            TestUtils.Simulate.click(showMoreButton);
            var displayedTextAfter = TestUtils.findRenderedDOMComponentWithClass(componentClick, 'faq-entry-content').innerHTML;
            ellipsis = displayedTextAfter.substr(displayedText.length-3, displayedText.length-1)==='...';
            expect(ellipsis).toBe(false);
        });

    });

});

describe('<FaqEntry />', () => {
    let num = 100;
    let faq = {
        question: 'Sample Question', 
        answer: 'Sample Answer', 
        id:100, 
        maxStringLength: 500, 
        category: 'Lorem Ipsum 1'
    };

    let props = {
        faq: faq,
        num: num
    };

    describe('functions work correctly', () => {
        test('Does ellipsis add work when max string is larger than the faq?', () => {
            var componentClick = TestUtils.renderIntoDocument(<FaqEntry {...props} />)
            var showMoreButton = TestUtils.findRenderedDOMComponentWithClass(componentClick, 'toggle-button');
            var displayedText = TestUtils.findRenderedDOMComponentWithClass(componentClick, 'faq-entry-content').innerHTML;
            var ellipsis = displayedText.substr(displayedText.length-3, displayedText.length-1)==='...';
            expect(ellipsis).toBe(false);

            TestUtils.Simulate.click(showMoreButton);
            var displayedTextAfter = TestUtils.findRenderedDOMComponentWithClass(componentClick, 'faq-entry-content').innerHTML;
            ellipsis = displayedTextAfter.substr(displayedText.length-3, displayedText.length-1)==='...';
            expect(ellipsis).toBe(false);
        });
    });
});