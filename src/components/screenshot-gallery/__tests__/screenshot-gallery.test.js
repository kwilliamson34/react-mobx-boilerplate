jest.unmock('../screenshot-gallery');

import ScreenshotGallery from '../screenshot-gallery';

describe('<ScreenshotGallery /> standard snapshot tests:', () => {

  const props = {
    detailObj: {
      mobileScreenshots: [
        {
          description: 'This is a mobile screenshot',
          path: 'imgpath.jpg'
        }
      ],
      tabletScreenshots: [
        {
          description: 'This is a tablet screenshot',
          path: 'imgpath.jpg'
        }
      ]
    }
  };

  describe('Render tests;', () => {
    test('should render with props', () => {
      const component = renderer.create(
        <ScreenshotGallery {...props} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('should render without props but just be a div with no children', () => {
      const component = renderer.create(
        <ScreenshotGallery {...{
          detailObj: {
            mobileScreenshots: [],
            tabletScreenshots: []
          }
        }} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
