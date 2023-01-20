import Keycloak from 'keycloak-js';

const {
	REACT_APP_KEYCLOAK_URL: url,
	REACT_APP_KEYCLOAK_REALM: realm,
	REACT_APP_KEYCLOAK_CLIENT_ID: clientId,
} = process.env;

const config: Keycloak.KeycloakConfig = {
	url,
	realm,
	clientId,
};

console.log(config);
const keycloak = new Keycloak(config);

export default keycloak;
