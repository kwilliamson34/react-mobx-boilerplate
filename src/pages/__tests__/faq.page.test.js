
jest.unmock('../../core/stores/master.store');
jest.unmock('../faq.page');
jest.unmock('../../components/faq/faq-main');

import {observer, inject} from 'mobx-react';
import {contentStore} from '../../core/stores/content.store';
import FAQPage from '../faq.page';
import {FaqMain} from '../../components/faq/faq-main';

describe('<FAQPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        contentStore
      }
    }

    test('matches previous snapshot', () => {
      let component = renderer.create(<FAQPage {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
