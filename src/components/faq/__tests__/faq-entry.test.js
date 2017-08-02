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
          let component, tree;

            component = renderer.create(
                <MemoryRouter>
                    <FaqEntry {...props} />
                </MemoryRouter>
                );
            tree = component.toJSON();
            expect(tree).toMatchSnapshot();


            props.faq.answer = 'this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long this is very long';
            component = renderer.create(
                <MemoryRouter>
                    <FaqEntry {...props} />
                </MemoryRouter>
                );
            tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
