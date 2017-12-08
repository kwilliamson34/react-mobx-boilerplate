jest.unmock('../faq');

import React from 'react';
import {Faq} from '../faq.jsx';
// import {MemoryRouter} from 'react-router-dom';

describe('<Faq />', () => {

  let faqs = {
    categories: [
      {
        title: 'TEST CATEGORY',
        permissions: ['LOREM']
      }
    ],
    entries: [
      {
        question: 'question',
        answer: 'answer',
        maxStringLength: 5,
        category: 'LOREM'
      }
    ]
  }

  let props = {
    faqData: faqs,
    userPermissions: ['LOREM']
  }

  describe('Render testing', () => {
    test('Matches snapshot', () => {
      const component = renderer.create(
        <Faq {...props}/>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
