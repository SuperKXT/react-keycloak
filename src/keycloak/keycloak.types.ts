import Keycloak from 'keycloak-js';

export interface AuthClientError {
	error: string,
	error_description: string,
}

/** Set of tokens provided by AuthClient */
export type AuthClientTokens = Pick<
	Keycloak,
	'idToken' | 'refreshToken' | 'token'
>;

/** ReactAuth event types */
export type AuthClientEvent = (
	| 'onReady'
	| 'onInitError'
	| 'onAuthSuccess'
	| 'onAuthError'
	| 'onAuthRefreshSuccess'
	| 'onAuthRefreshError'
	| 'onAuthLogout'
	| 'onTokenExpired'
);