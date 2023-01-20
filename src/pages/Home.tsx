import { useKeycloak } from 'keycloak';

const HomePage = () => {
	const { keycloak } = useKeycloak();

	return (
		<>
			<h1>
				User is {!keycloak.authenticated ? 'NOT ' : ''} Authenticated
			</h1>

			<button
				type="button"
				onClick={() => keycloak.logout()}
			>
				Logout
			</button>

			<code>{JSON.stringify(keycloak.idTokenParsed)}</code>

		</>
	);
};

export default HomePage;
