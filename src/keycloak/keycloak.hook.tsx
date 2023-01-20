import { useContext } from 'react';

import KeycloakContext from './keycloak.context';

export function useKeycloak() {
	const context = useContext(KeycloakContext);

	if (!context) {
		throw new Error(
			'useKeycloak hook must be used inside ReactKeycloakProvider context'
		);
	}

	if (!context.client) {
		throw new Error(
			'authClient has not been assigned to ReactKeycloakProvider'
		);
	}

	const { client: authClient, isInitialized } = context;
	return {
		isInitialized,
		keycloak: authClient,
	};

}