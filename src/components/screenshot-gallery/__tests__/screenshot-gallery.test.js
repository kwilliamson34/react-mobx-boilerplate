jest.unmock('../screenshot-gallery');

import ScreenshotGallery from '../screenshot-gallery';

describe('<ScreenshotGallery />', () => {

  let props = [
      {
        description: "Image1",
        path: "nji-SurfacePro4-mock.png"
      },
      {
        description: "Image2",
        path: "nji-iPhone6s-mock.png"
      },
      {
        description: "Image3",
        path: "nji-Android1080p-mock.png"
      },
      {
        description: "Image4",
        path: "nji-SurfacePro4-mock.png"
      },
      {
        description: "Image5",
        path: "nji-iPhone6s-mock.png"
      },
      {
        description: "Image6",
        path: "nji-iPhone6s-mock.png"
      },
      {
        description: "Image7",
        path: "nji-SurfacePro4-mock.png"
      },
      {
        description: "Image8",
        path: "nji-SurfacePro4-mock.png"
      },
      {
        description: "Image9",
        path: "nji-Android1080p-mock.png"
      },
      {
        description: "Image10",
        path: "nji-SurfacePro4-mock.png"
      }
    ];


  describe('it should render', () => {
    test('matches previous snapshots', () => {

      const component = renderer.create(
        <ScreenshotGallery screenshots={props.screenshots}/>
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

    });
  });
});
