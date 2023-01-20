import { createContext } from 'react';
import Keycloak from 'keycloak-js';

/** Auth Context props */
export type KeycloakContextProps = {

	/** The single AuthClient of your application. */
	client?: Keycloak;

	/** Boolean indicating whenever the AuthClient has been initialized by AuthProvider */
	isInitialized: boolean;

};

export const KeycloakContext = createContext<KeycloakContextProps>({
	isInitialized: false,
});

export default KeycloakContext;