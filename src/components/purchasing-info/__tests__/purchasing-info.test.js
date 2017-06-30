jest.unmock('../purchasing-info');

import PurchasingInfo from '../purchasing-info';

describe('<PurchasingInfo />', () => {
  const fullProps = {
    contactInfo: {
      contact_name: "Don Johnson",
      contact_company: "Fast 'n Hot Speedboats'",
      contact_phone: "1-555-IAM-VICE",
      contact_email: "don_the_heat@hotmail.com",
      contact_website: "http://www.fastnhotspeedboats.com"
    }
  };

  const emptyProps = {
    contactInfo: {
      contact_name: "",
      contact_company: "",
      contact_phone: "",
      contact_email: "",
      contact_website: ""
    }
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
        const component = renderer.create(
          <PurchasingInfo {...fullProps} />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
  });

  describe('renders', () => {
    test('should render with no purchasing info shown', () => {
        const component = renderer.create(
          <PurchasingInfo {...emptyProps} />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
  });
});
