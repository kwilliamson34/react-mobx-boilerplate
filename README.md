## Getting started

### How to reach the QA sites

For QA purposes, the FirstNet portals are currently deployed on servers which can be accessed without any setup. Go to [Halo Authorized Links](https://tools.publicis.sapient.com/confluence/pages/viewpage.action?spaceKey=FPSE&title=Halo+authorized+links) for links that will log you in directly to these sites. No further steps are necessary.

If you are doing development, continue to the next steps.

### Install/Update Node

Node 8.6 or newer is required to run this app. [Download Node 8.6+](https://nodejs.org/)

NOTE: To check your Node version, enter `node -v` in your terminal. If this doesn't show you a version number, you probably don't have Node installed.

### Configure your computer

FirstNet requires a number of private Node packages to run. To enable installation of these packages, follow the steps in Section 1 ('Steps to set up your SSH key') of [this Readme](https://us.tools.publicis.sapient.com/bitbucket/projects/FNAPI/repos/common-ui/browse/README.md) to configure your computer for SSH (Secure Shell) transfers.

### Clone this repository onto your computer

From your terminal, run `git clone ssh://git@us.tools.publicis.sapient.com/fpse/pse-homepage-ui.git`. The repo will download into a new directory called `pse-homepage-ui`. Go to this directory. You should be on a git branch named `dev`.

`dev` branch is for IOC1. `dev-2x` branch is for IOC2. These branch names are used on all the portals.

Your cloned repo should already have the latest version of `dev` and `dev-2x`.

### Install Node packages and run Node server

From your development branch, run `npm install`. Your computer will install the Node packages required to run this app. This may take several minutes.

After installation is complete, run `npm start`.

As the server starts, a window will open in your preferred browser and direct you to the FirstNet portal. You may dismiss any security/privacy warnings. You should now be prompted to login.

### Login to use Localhost

Go to [Halo Authorized Links](https://tools.publicis.sapient.com/confluence/pages/viewpage.action?spaceKey=FPSE&title=Halo+authorized+links) and find the "Localhost (for Developers)" section. Use these links to login directly to your localhost.

Alternatively, find the HTML file at `/dev/sso-crack.html` in your repo directory. Open this file in your browser and you will find a form to login using any id_token. A different id_token is needed for each HALO role. After submitting a token, you will be directed to the portal's QA site. You may now go to localhost using your browser's address bar.
