jest.unmock('../screenshot-gallery');

import ScreenshotGallery from '../screenshot-gallery';
import { MemoryRouter } from 'react-router-dom';


describe('<ScreenshotGallery />', () => {

  let props = {
    screenshots: [
      {
        description: "Image1",
        path: "nji-SurfacePro4-mock.png"
      }
    ]
  };


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
