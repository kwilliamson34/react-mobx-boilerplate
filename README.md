![FirstNet Local Control](/images/firstnetlogo-144x144.png)
=======

## How to use this app
=======

You need to have Node 8.6 or newer to run this app. [Download Node 8.6+](https://nodejs.org/)


### For Development

Install Node packages and start webpack-dev-server

```
npm install

npm start
```

A browser window will open on your default browser and attempt to navigate to the portal. You may be asked for login credentials.


### For Deployment

To start a build for deployment, run

`npm run build`

By default, this will build for the `prod` environment. There are three environments predefined in the Webpack configuration files.

`prod`, for production.
`stage`, for testing.
`dev`, for development.
