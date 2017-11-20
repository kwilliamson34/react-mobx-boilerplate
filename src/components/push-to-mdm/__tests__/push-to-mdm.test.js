jest.unmock('../push-to-mdm');


import {PushToMDM} from '../push-to-mdm';

describe('<PushToMDM /> ', () => {

  const props = {
    name: 'The Greatest App in the West',
    psk: '12345',
    pushToMDM: jest.fn().mockReturnValue(Promise.resolve()),
    appCatalogMDMStatuses: {}
  }

  describe('render tests ', () => {
    test('should match snapshot if configuredMDMType is null', () => {
      let component = renderer.create(
        <PushToMDM {...props} />
      )

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('should match snapshot if configuredMDMType is configured', () => {
      props.configuredMDMType = 'airwatch';
      props.appCatalogMDMStatuses[12345] = 'INSTALLED';
      let component = renderer.create(
        <PushToMDM {...props} />
      )

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('test all appCatalogMDMStatuses conditions', () => {
    let possibleMDMStatuses = [
      'NOT_INSTALLED',
      'IN_PROGRESS',
      'PENDING',
      'FAILED',
      'INSTALLED',
      'INSTALLED_UPDATABLE'
    ];

    for (let i = 0; i < possibleMDMStatuses.length; ++i) {
      test(`should match snapshot if appCatalogMDMStatuses is ${possibleMDMStatuses[i]}`, () => {
        props.configuredMDMType = 'airwatch';
        props.appCatalogMDMStatuses[12345] = possibleMDMStatuses[i];
        let component = renderer.create(
          <PushToMDM {...props} />
        )

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    }
  });

  describe('interaction tests', () => {
    test('function should fire on button click', () => {
      props.configuredMDMType = 'airwatch';
      props.appCatalogMDMStatuses[12345] = 'INSTALLED';
      let component = TestUtils.renderIntoDocument(<PushToMDM {...props} />);
      let button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      expect(props.pushToMDM).not.toHaveBeenCalled();

      TestUtils.Simulate.click(button);
      expect(props.pushToMDM).toHaveBeenCalled();

    });
  });
});
