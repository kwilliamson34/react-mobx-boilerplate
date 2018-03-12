
jest.unmock('../app-management-block');
jest.unmock('../../forms/checkbox');
jest.unmock('jquery');

import AppManagementBlock from '../app-management-block';

describe('<AppManagementBlock />', () => {
  let props = {
    psk: 123,
    changeAppAvailability: jest.fn(),
    changeAppRecommended: jest.fn(),
    getMatchingApp: () => {
      return {
        isAvailable: false,
        isRecommended: false
      }
    }
  };

  describe('render', () => {
    test('matches snapshots with all group combinations', () => {
      let component, tree;

      props.getMatchingApp = () => {
        return {
          isAvailable: false,
          isRecommended: false
        }
      }
      component = renderer.create(<AppManagementBlock { ...props }/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.getMatchingApp = () => {
        return {
          isAvailable: true,
          isRecommended: false
        }
      }
      component = renderer.create(<AppManagementBlock { ...props }/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.getMatchingApp = () => {
        return {
          isAvailable: true,
          isRecommended: true
        }
      }
      component = renderer.create(<AppManagementBlock { ...props }/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      //this case is not allowed by the service, but testing anyway
      props.getMatchingApp = () => {
        return {
          isAvailable: false,
          isRecommended: true
        }
      }
      component = renderer.create(<AppManagementBlock { ...props }/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
