import React from 'react';
import { useKeycloak } from 'keycloak';

import LoginPage from './pages/Login';
import Home from './pages/Home';

const App = () => {

	const { isInitialized, keycloak } = useKeycloak();

	if (!isInitialized) {
		return <div>Loading...</div>;
	}

	if (!keycloak.authenticated) {
		return <LoginPage />;
	}

	return <Home />;

};

export default App;
