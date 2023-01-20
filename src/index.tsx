import * as React from 'react';
import ReactDOM from 'react-dom';

import keycloak, { KeycloakProvider } from 'keycloak';

import App from './App';

import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<KeycloakProvider
			client={keycloak}
			onEvent={(event, error) => {
				console.log('onKeycloakEvent', event, error);
			}}
			onTokens={(tokens) => {
				console.log('onKeycloakTokens', tokens);
			}}
		>
			<App />
		</KeycloakProvider>
	</React.StrictMode>,
	document.getElementById('root')
);