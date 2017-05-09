jest.unmock('../app-management-block');

// unmocking because we want to test all the way down the chain.
jest.unmock('../../toggle/toggle');

import AppManagementBlock from '../app-management-block';
import { MemoryRouter } from 'react-router-dom';

describe('<AppManagementBlock />', () => {
  let props = {
    app: {
      id: 123,
      isAvailable: false,
      isRecommended: false,
    },
    store: {}
  };

  describe('renders', () => {
    test('matches snapshots with all group combinations', () => {
      props.app.isAvailable = false;
      props.app.isRecommended = false;
      let component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.app.isAvailable = true;
      props.app.isRecommended = false;
      component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.app.isAvailable = true;
      props.app.isRecommended = true;
      component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      //this case is not allowed by the service, but testing anyway
      props.app.isAvailable = false;
      props.app.isRecommended = true;
      component = renderer.create(
        <MemoryRouter>
          <AppManagementBlock { ...props }/>
        </MemoryRouter>
      );
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
