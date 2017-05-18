npm install -g json-server

npm install

json-server src/fixtures/server-data.json

npm start



Login Local Stuff

1. Update host file

sudo vi /etc/hosts

127.0.0.1 test.sapient.first.net


2. Map 80 -> 3030 and 443 -> 8443 on localhost (Mac only)

echo "rdr pass inet proto tcp from any to any port 80 -> 127.0.0.1 port 8080
rdr pass inet proto tcp from any to any port 443 -> 127.0.0.1 port 8443
" | sudo pfctl -ef -

3. go to https://test.sapientfirst.net/