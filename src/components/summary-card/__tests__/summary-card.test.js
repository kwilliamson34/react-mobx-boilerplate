jest.unmock('../summary-card');
jest.unmock('../../rating/rating');

import {SummaryCard} from '../summary-card';
import {MemoryRouter} from 'react-router-dom';

describe('<SummaryCard />', () => {
  let props = {
    display:{
      name: 'app name',
      publisher: 'publisher name',
      imageUrl: '../../images/app-icon.png',
      rating: 3.5,
      badge: true,
      operatingSystem: 'ANDROID',
    }
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
      props.display.operatingSystem = 'IOS';
      component = renderer.create(
        <MemoryRouter>
          <SummaryCard {...props} />
        </MemoryRouter>
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
