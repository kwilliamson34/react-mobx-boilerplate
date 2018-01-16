
jest.unmock('../../core/stores/master.store');
jest.unmock('../faq.page');
jest.unmock('fn-common-ui');
jest.unmock('../../content/faq-data.json');

import {observer, inject} from 'mobx-react';
import FAQPage from '../faq.page';
import {FAQ} from 'fn-common-ui';
import {faqs} from '../../content/faq-data.json';

describe('<FAQPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        userStore: {
          user: {
            roles: ['G_FN_ADM']
          }
        }
      }
    }

    test('matches previous snapshot', () => {
      let component = renderer.create(<FAQPage {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
