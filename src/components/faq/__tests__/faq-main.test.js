jest.unmock('../faq-main');
jest.unmock('jquery');

import React from 'react';
import {FaqMain} from '../faq-main.jsx';
import {MemoryRouter} from 'react-router-dom';

describe('<FaqMain />', () => {

  let faqs = {
    categories: ['LOREM'],
    entries: [
      {
        question: 'question',
        answer: 'answer',
        id: 100,
        maxStringLength: 5,
        category: 'LOREM'
      }
    ]
  }

  let props = {
    store: {
      faqs: faqs,
      faqCategoryFilter: 'ALL',
      filteredFaqEntries: faqs.entries,
      updateFilter: jest.fn(),
      toggleFaqPageHeaderButton: jest.fn()
    }
  };

  describe('Render testing', () => {
    test('Matches snapshot', () => {
      const component = renderer.create(
        <MemoryRouter>
          <FaqMain {...props}/>
        </MemoryRouter>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Functions work correctly', () => {
    test('Does category dropdown click work?', () => {
      props.store.faqCategoryFilter = 'ALL';
      let component = TestUtils.renderIntoDocument(<FaqMain {...props}/>);
      let select = TestUtils.findRenderedDOMComponentWithTag(component, 'select');

      expect(select.options.length).toBe(2);
      expect(select.value).toBe('ALL');

      TestUtils.Simulate.change(select, {
        target: {
          value: 'LOREM'
        }
      });

      expect(props.store.updateFilter).toHaveBeenCalled();
    });
  });

  describe('Functions work correctly', () => {
    test('Does category tab click work?', () => {
      props.store.faqCategoryFilter = 'ALL';
      let component = TestUtils.renderIntoDocument(<FaqMain {...props}/>);

      let categoryButton = TestUtils.scryRenderedDOMComponentsWithClass(component, 'category-tab-button')[1];

      TestUtils.Simulate.click(categoryButton);
      expect(props.store.updateFilter).toHaveBeenCalled();
    });
  });

  describe('Mounting', () => {
    test('Does mount work?', () => {
      var component = TestUtils.renderIntoDocument(<FaqMain {...props}/>)
      component.componentWillMount();
      expect(props.store.toggleFaqPageHeaderButton).toBeCalled();
    });

    test('Does unmount work?', () => {
      var component = TestUtils.renderIntoDocument(<FaqMain {...props}/>)
      component.componentWillUnmount();
      expect(props.store.toggleFaqPageHeaderButton).toBeCalled();
    });
  });
});
