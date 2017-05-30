npm install -g json-server

npm install

json-server src/fixtures/server-data.json

npm start



Login Local Stuff


1. Go to https://localhost:8443. You will be redirected to the Halo login.

2. Enter in the user credentials (I’ve attached a list of our test users along with their assigned groups). Make sure you have the ‘Network’ tab of the Dev Tools open and the ‘Preserve Log’ option is enabled.

3. After the redirect to the test server, go to back to the Network tab of DevTools.  Find the filter search field and search for 'validate'. On the search result, navigate to headers, and find the id_token field and copy its value.

4. Open the sso-crack.html file in the /dev folder at root (it can just be opened as a file – no server needed). Paste the value of the id_token field from the previous step into the text area and click the button.

5. You will be redirected back to the QA site, but your localhost site will now have a valid session. Go back to https://localhost:8443 and you should be good to go.
