import React from 'react';
import { useKeycloak } from 'keycloak';

const LoginPage = () => {

	const { keycloak } = useKeycloak();

	const login = () => {
		keycloak.login();
	};

	return (
		<button
			type="button"
			onClick={login}
		>
			Login
		</button>
	);
};

export default LoginPage;
