![FirstNet Local Control](images/logo-FirstNet-local-control.svg)
=======

## How to use this app

You need to have Node 8.6 or newer to run this app. [Download Node 8.6+](https://nodejs.org/)


### For Development

Install Node packages using `npm install`.

Start webpack-dev-server using `npm start`.

After dev server begins, a browser window will open on your default browser and attempt to navigate to the portal. You may be asked for login credentials.


### For Deployment

To start a build for deployment, run `npm run build`.

By default, this will build for the `prod` environment. There are three environments predefined in the Webpack configuration files.

`prod`, for production.

`stage`, for testing.

`dev`, for development.
