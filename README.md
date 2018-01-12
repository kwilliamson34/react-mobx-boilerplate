![FirstNet Local Control](images/logo-FirstNet-local-control.svg)
=======

## How to use this app

You need to have Node 8.6 or newer to run this app. [Download Node 8.6+](https://nodejs.org/)


### For Development

Install Node packages using `npm install`.

Start webpack-dev-server using `npm start`.

After dev server starts, a browser window will open on your default browser and attempt to navigate to the portal.

You must have valid user credentials to access the portals. If you have a valid bearer token, you may bypass login by supplying the token to an authentication service. Query string parameters may be used: `/oauth/validate?id_token=`


### For Deployment

To start a build for deployment, run `npm run build`.

By default, this will build for the `prod` environment. There are four environments predefined in the Webpack configuration files.

`prod`, intended for production.

`stage`, intended for production testing.

`qa`, intended for internal testing.

`dev`, intended for development.
