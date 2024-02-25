const common = require('common-module');;

require("dotenv").config({ path: './../.env' });
const ClientId = process.env.CLIENTID;
const IP = process.env.IP;
const SECRET = process.env.SECRET;
const serverUrl = process.env.SERVERURL;
const realm = process.env.REALM;
let _keycloak;

var keycloakConfig = {
    clientId: ClientId,
    bearerOnly: true,
    serverUrl: `http://${IP}:${serverUrl}`,
    realm: realm,
    credentials: {
        secret: SECRET,
    }
};
function initKeycloak(memoryStore) { if (_keycloak) { console.warn("Trying to init Keycloak again!"); return _keycloak; } else { console.log("Initializing Keycloak..."); _keycloak = new common.keycloakConnect({ store: memoryStore }, keycloakConfig); return _keycloak; } }

function getKeycloak() {
    if (!_keycloak) {
        console.error('Keycloak has not been initialized. Please called init first.');
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};