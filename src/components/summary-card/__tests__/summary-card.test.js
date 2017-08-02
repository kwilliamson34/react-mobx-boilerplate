jest.unmock('../summary-card');
jest.unmock('../../rating/rating');
jest.unmock('axios');

import {SummaryCard} from '../summary-card';
import {MemoryRouter} from 'react-router-dom';

describe('<SummaryCard />', () => {
  let props = {
    shouldFocus: false,
    display: {
      name: 'app name',
      publisher: 'publisher name',
      imageUrl: '../../images/app-icon.png',
      rating: 3.5,
      badge: true,
      app_psk: '12345',
      platform: 'ANDROID',
    },
    mdm_status: 'INSTALLED'
  };

  describe('render testing', () => {
    test('matches snapshot', () => {
      let component = renderer.create(
        <MemoryRouter>
          <SummaryCard {...props} />
        </MemoryRouter>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.display.rating = 1.5;
      props.display.badge = false;
      props.display.platform = 'IOS';
      component = renderer.create(
        <MemoryRouter>
          <SummaryCard {...props} />
        </MemoryRouter>
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('testing that card takes focus', () => {
    test('cardTakesFocus function should fire if shouldFocus is true', () => {
      props.shouldFocus = true;
      let component = TestUtils.renderIntoDocument(
        <MemoryRouter>
          <SummaryCard {...props} />
        </MemoryRouter>
      )

      let targetElement = TestUtils.findRenderedDOMComponentWithClass(component, 'card-container');
      let focusedElement = document.activeElement;
      expect(focusedElement === targetElement).toBe(true);
    });
  });
});
