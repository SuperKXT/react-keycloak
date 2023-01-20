declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV?: 'test' | 'development' | 'production',
			REACT_APP_KEYCLOAK_URL: string,
			REACT_APP_KEYCLOAK_REALM: string,
			REACT_APP_KEYCLOAK_CLIENT_ID: string,
		}
	}
}

export { };