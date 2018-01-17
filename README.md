![FirstNet Local Control](images/logo-FirstNet-local-control.svg)
=======

### Prerequisites

* Node v8.6 or higher from [https://nodejs.org/](https://nodejs.org/).
* Git version control system from [https://git-scm.com/](https://git-scm.com/).

### Development

`npm install` will download the Node dependencies. `npm start` will start webpack-dev-server.

After dev server starts, a browser window will open on your default browser and attempt to navigate to the portal.

You must have valid user credentials to access the portals. If you have a valid bearer token, you may bypass login by supplying the token to an authentication service. Query string parameters may be used: `/oauth/validate?id_token=`

### Deployment

`npm run build`

By default, this will build for the `prod` environment. There are four predefined environments in the Webpack configuration files. The environment may be set using the custom argument `--env=[environment]`. For example, to run a dev build, use `npm run build -- --env=dev`.

* `prod`, intended for production.
* `stage`, intended for User Acceptance Testing (UAT).
* `qa`, intended for internal testing.
* `dev`, intended for development.
