## SECTION 1. GETTING STARTED

### Step 1.1. How to reach the QA sites

For QA purposes, the FirstNet portals are currently deployed on servers which can be accessed without any setup. Go to [Halo Authorized Links](https://tools.publicis.sapient.com/confluence/pages/viewpage.action?spaceKey=FPSE&title=Halo+authorized+links) for links that will log you in directly to these sites. No further steps are necessary.

If you are doing development, continue to the next steps.

### Step 1.2. How to install Node

Node 8.6 or newer is required to run this app. [Download Node 8.6+](https://nodejs.org/)

NOTE: To check your Node version, enter `node -v` in your terminal. If this doesn't show you a version number, you probably don't have Node installed.

### Step 1.3. Configure your computer to use SSH

FirstNet requires a number of private Node packages to run. To enable installation of these packages, follow the steps in Section 1 ('Steps to set up your SSH key') of [this Readme](https://us.tools.publicis.sapient.com/bitbucket/projects/FNAPI/repos/common-ui/browse/README.md) to configure your computer for SSH (Secure Shell) transfers.

### Step 1.4. How to this clone repository onto your computer

From your terminal, run `git clone ssh://git@us.tools.publicis.sapient.com/fpse/pse-homepage-ui.git`. The repo will download into a new directory called `pse-homepage-ui`. Go to this directory. You should be on a git branch named `dev`. This is the main development branch for IOC1. See Section 2 ('Branch names') below for more information on Sapient FirstNet's git branch naming conventions.

### Step 1.5. How to install required Node packages and start Node server

From your development branch, run `npm install`. Your computer will install the Node packages required to run this app. This may take several minutes.

After installation is complete, run `npm start`.

After the server starts, a window will open in your preferred browser and direct you to the FirstNet portal. You may dismiss any security/privacy warnings. If you have not already logged in to this FirstNet portal, you may be directed to an error page. Continue to Step 1.6

### Step 1.6. How to login to access localhost

Go to [Halo Authorized Links](https://tools.publicis.sapient.com/confluence/pages/viewpage.action?spaceKey=FPSE&title=Halo+authorized+links) and find the "Localhost (for Developers)" section. Use these links to login directly to your localhost.

## TESTING

Testing is done with [Jest](https://facebook.github.io/jest/). Please provide a snapshot test for each page or component, or update existing snapshots if a page or component has changed.

Tests should be placed in a directory called `__tests__`, within the directory containing the page/component being tested. The test file should contain 'test' within its filename, for example, `my-component.test.js`. These steps allow Jest to find the test files.

Run all tests using `npm test`. To run an individual test, add the specific file name, for example, `npm test my-component.test.js`. To update a snapshot, use `npm test my-component.test.js -- -u`.

NOTE: `npm test -- -u` will update all available snapshots. Be careful that you don't fill your branch up with unwanted changes!
