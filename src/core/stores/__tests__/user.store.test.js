
jest.unmock('../user.store');

import {observable, useStrict} from 'mobx';
import {userStore} from '../user.store';
import {apiService} from '../../services/api.service';

const store = userStore;
const logoutUserMock = jest.fn();

store.user = {};

describe("UserStore", () => {

  // over ride the API calls with an instantly resolved promise
  apiService.validateUserData = jest.fn()
    .mockReturnValue(new Promise(resolve => resolve({
    data: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGVtYWlsLmNvbSIsImlzcyI6Imh0dHBzOi8vYXBpLmZpcnN0bmV0LmF0dC5jb20iLCJhdWQiOiJmaXJzdG5ldF91c2VyIiwianRpIjoidXNlckBlbWFpbC5jb20xNTAwMzIyMTExMjM1IiwiaWF0IjoxNTAwMzIyMTExLCJleHAiOjE1MDAzMjI3MTEsImlkIjoiMjE3MyIsInVzZXJuYW1lIjoidXNlckBlbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJmaXJzdCIsImxhc3ROYW1lIjoibGFzdCIsImVtYWlsIjoidXNlckBlbWFpbC5jb20iLCJwaG9uZSI6IjcwMzU1NTU1NTUiLCJyb2xlcyI6WyJHX0ZOIiwiR19GTl9QU0UiLCJHX0ZOX1NVQiIsIkdfRk5fSU0iLCJHX0ZOX0FETSJdLCJhdXRob3JpemF0aW9ucyI6W3sicHNlSWQiOiIxNDUiLCJwc2VVc2VyUm9sZXMiOlsiR19GTl9JTSIsIkdfRk5fU1VCIiwiR19GTl9BRE0iXSwicHNlTmFtZSI6IkZpcnN0TmV0IFRFU1QgUFNFIn1dfQ.jsdmyDSkPgHFbNZaVTRy587rrJN1ely5NsFZbGtE3y4'
  })));

	describe("receives a valid token with an admin user", () => {

		beforeEach(() => {
			//turn off strict mode when testing with mock store
			useStrict(false);
			return store.revalidateUser();
		});



		it("populates the user object", () => {
			expect(store.user.email).toBe('user@email.com');
		});

    describe("checks if FAN mapping has been completed", () => {

      it("uses pseUserRoles if mapping has been completed", () => {
        expect(store.user.roles.length).toBe(3)
      });

      it("uses top level roles array if it hasn't", () => {
        //remove authorizations array from user object
        let tk_array = store.api_token.split('.');
        let userObj = JSON.parse(window.atob(tk_array[1]));
        userObj.authorizations = [];
        store.conditionUserObj(userObj);
        expect(store.user.roles.length).toBe(5);
      });


    });

		describe("determines if user is an admin based on user roles array", () => {
			it("where user has role 'G_FN_ADM'", () => {
				expect(store.isAdmin).toBe(true);
			});

			it("where user does not have role 'G_FN_ADM'", () => {
				store.user.roles.pop();
				store.checkPermissions();
				expect(store.isAdmin).toBe(false);
			});

		});

	});

	describe("logs users out", () => {

    apiService.logoutUser = jest.fn()
      .mockReturnValue(new Promise(resolve => resolve(logoutUserMock())))

		it("successfully", () => {
			store.logoutUser();
			//expect the intercepted logout function to be called
			expect(logoutUserMock.mock.calls.length).toBe(1);
		});

  });
});
