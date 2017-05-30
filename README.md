npm install -g json-server

npm install

json-server src/fixtures/server-data.json

npm start -- --env=[dev|stage|prod]
OR
npm run dev

Note: The default environment is prod, if no environment is specified. This is to minimize the security risk of a missing environment variable on a production server as the PSE solution scales.

## Build For Stage/Production

npm run build -- --env=[stage|prod]


## Local Login Process

1. Go to https://localhost:8443. You will be redirected to the Halo login.

2. Enter in the user credentials (I’ve attached a list of our test users along with their assigned groups). Make sure you have the ‘Network’ tab of the Dev Tools open and the ‘Preserve Log’ option is enabled.

3. You will be forwarded to the QA site. In the Network log, find the request to ‘/oauth/validate’. In the form data, copy the value of the ‘id_token’ parameter.

4. Open the sso-crack.html file (it can just be opened as a file – no server needed). Paste the value of the id_token field from the previous step into the text area and click the button.

5. You will be redirected back to the QA site, but your localhost site will now have a valid session. Go back to https://localhost:8443 and you should be good to go.
