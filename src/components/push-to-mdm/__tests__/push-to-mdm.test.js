jest.unmock('../push-to-mdm');
jest.unmock('axios');

import {PushToMDM} from '../push-to-mdm';

describe('<PushToMDM /> ', () => {

  const props = {
    name: 'The Greatest App in the West',
    psk: '12345',
    pushToMDM: jest.fn(),
    appMDMStatus: {}
  }

  describe('render tests ', () => {
    test('should match snapshot if mdmIsConfigured is null', () => {
      let component = renderer.create(
        <PushToMDM {...props} />
      )

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('should match snapshot if mdmIsConfigured is configured', () => {
      props.mdmIsConfigured = 'configured';
      props.appMDMStatus[12345] = 'INSTALLED';
      let component = renderer.create(
        <PushToMDM {...props} />
      )

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('test all appMDMStatus conditions', () => {
    let possibleMDMStatuses = [
      'NOT_INSTALLED',
      'IN_PROGRESS',
      'PENDING',
      'FAILED',
      'INSTALLED',
      'REPUSHED',
      'NEEDS_UPDATE'
    ];

    for (let i = 0; i < possibleMDMStatuses.length; ++i) {
      test(`should match snapshot if appMDMStatus is ${possibleMDMStatuses[i]}`, () => {
        props.mdmIsConfigured = 'configured';
        props.appMDMStatus[12345] = possibleMDMStatuses[i];
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
      props.mdmIsConfigured = 'configured';
      props.appMDMStatus[12345] = 'INSTALLED';
      let pushToMDMComponent = TestUtils.renderIntoDocument(
        <PushToMDM {...props} />
      )

      let pushToMDMButton = TestUtils.findRenderedDOMComponentWithTag(
        pushToMDMComponent, 'button'
      )

      const functionToWatch = props.pushToMDM;
      expect(functionToWatch).not.toHaveBeenCalled();

      TestUtils.Simulate.click(pushToMDMButton);
      expect(functionToWatch).toHaveBeenCalled();

    });
  });
});
