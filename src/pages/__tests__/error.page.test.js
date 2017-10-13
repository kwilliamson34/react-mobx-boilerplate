
jest.unmock('../../core/stores/master.store');
jest.unmock('../error.page');
jest.unmock('../../core/services/history.service');
jest.unmock('history/createBrowserHistory');
jest.unmock('../../core/services/history.service');

import {history} from '../../core/services/history.service';
import {observer, inject} from 'mobx-react';
import {userStore} from '../../core/stores/user.store';
import ErrorPage from '../error.page';
import {MemoryRouter} from 'react-router-dom';

describe('<ErrorPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        userStore
      }
    }
    let component, tree;

    test('matches previous snapshot', () => {
      component = renderer.create(<ErrorPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('shows Service Error for authentication problem', () => {
      props.store.userStore.auth_error = true;
      component = renderer.create(<ErrorPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('shows Access Denied for authorization problem', () => {
      props.store.userStore.auth_error = false;
      component = renderer.create(<ErrorPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.userStore.user.roles = '';
      props.cause === 'unauthorized'
      component = renderer.create(<ErrorPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('shows Sorry for Page Not Found (404)', () => {
      props.cause = '404';
      component = renderer.create(<ErrorPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('shows App Unavailable on 410', () => {
      props.cause = '410';
      component = renderer.create(<MemoryRouter>
          <ErrorPage {...props} />
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('shows Permission Pending', () => {
      props.cause = 'pending';
      component = renderer.create(<ErrorPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('shows Generic message otherwise', () => {
      props.cause = '';
      component = renderer.create(<ErrorPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('User interaction', () => {
    let props = {
      store: {
        userStore
      }
    }

    test('3 links take you to other portals, one link logs you out', () => {
      props.cause = 'unauthorized';
      let component = TestUtils.renderIntoDocument(<ErrorPage {...props} />);
      let links = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
      expect(links.length).toBe(4);
    });

    test('Back link takes you back', () => {
      history.go = jest.fn();

      props.cause = 'pending';
      let component = TestUtils.renderIntoDocument(<ErrorPage {...props} />);
      let links = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
      expect(links.length).toBe(1);
      TestUtils.Simulate.click(links[0]);

      expect(history.go).toBeCalled();
    });
  });
});
