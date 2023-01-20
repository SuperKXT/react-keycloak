import { useState, useEffect, ReactNode, useCallback } from 'react';
import Keycloak, { KeycloakInitOptions } from 'keycloak-js';

import useCompare from 'hooks/compare';

import KeycloakContext from './keycloak.context';
import {
	AuthClientError,
	AuthClientEvent,
	AuthClientTokens,
} from './keycloak.types';

/** Props that can be passed to AuthProvider */
export type AuthProviderProps = {

	/** The single AuthClient instance to be used by your application. */
	client: Keycloak;

	/** A flag to disable automatic token refresh. (not recommended) */
	disableAutoRefreshToken?: boolean;

	/** The config to be used when initializing AuthClient instance. */
	initOptions?: KeycloakInitOptions;

	/**
	 * An optional loading check function to customize LoadingComponent display condition.
	 * Return `true` to display LoadingComponent, `false` to hide it.
	 *
	 * @param client the current AuthClient instance.
	 *
	 * @returns {boolean} Set to true to display LoadingComponent, false to hide it.
	 */
	isLoadingCheck?: (client: Keycloak) => boolean;

	/** An optional component to display while AuthClient instance is being initialized. */
	LoadingComponent?: JSX.Element;

	/** An optional function to receive AuthClient events as they happen. */
	onEvent?: (eventType: AuthClientEvent, error?: AuthClientError) => void;

	/**
	 * An optional function to receive AuthClient tokens when changed.
	 *
	 * @param {AuthClientTokens} tokens The current AuthClient tokens set.
	 */
	onTokens?: (tokens: AuthClientTokens) => void;

	children: ReactNode,
};

const defaultInitOptions: KeycloakInitOptions = {
	onLoad: 'check-sso',
};

const isUserAuthenticated = (client: Keycloak) => (
	!!client.idToken && !!client.token
);

/**
 * Create an AuthProvider component to wrap a React app with, it will take care of common AuthClient
 * lifecycle handling (such as initialization and token refresh).
 *
 * @param AuthContext the Auth context to be used by the created AuthProvider
 *
 * @returns the AuthProvider component
 */
export const KeycloakProvider = ({
	initOptions,
	client,
	disableAutoRefreshToken,
	isLoadingCheck,
	onEvent,
	onTokens,
	LoadingComponent,
	children,
}: AuthProviderProps
) => {

	const [isInitialized, setIsInitialized] = useState<boolean>(false);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const resetState = () => {
		setIsInitialized(false);
		setIsAuthenticated(false);
		setIsLoading(false);
	};

	const onError = useCallback(
		(event: AuthClientEvent) => (
			(error?: AuthClientError) => {
				onEvent?.(event, error);
			}
		)
		, [onEvent]
	);

	const updateState = useCallback(
		(event: AuthClientEvent) => (
			() => {

				onEvent?.(event);

				const newIsLoading = isLoadingCheck?.(client) ?? false;

				const newIsAuthenticated = isUserAuthenticated(client);

				if (
					!isInitialized
					|| newIsAuthenticated !== isAuthenticated
					|| newIsLoading !== isLoading
				) {
					setIsInitialized(true);
					setIsAuthenticated(newIsAuthenticated);
					setIsLoading(newIsLoading);
				}

				// Notify token listener, if any
				const { idToken, refreshToken, token } = client;
				onTokens?.({ idToken, refreshToken, token });
			}
		)
		, [client, isAuthenticated, isInitialized, isLoading, isLoadingCheck, onEvent, onTokens]
	);

	const refreshToken = useCallback(
		(event: AuthClientEvent) => (
			() => {
				onEvent?.(event);
				if (!disableAutoRefreshToken) {
					client.updateToken(5);
				}
			}
		)
		, [client, disableAutoRefreshToken, onEvent]
	);

	const hasAuthClientChanged = useCompare(client);
	const haveInitOptionsChanged = useCompare(initOptions);

	useEffect(() => {

		if (!hasAuthClientChanged && !haveInitOptionsChanged) return;

		resetState();

		client.onReady = updateState('onReady');
		client.onAuthSuccess = updateState('onAuthSuccess');
		client.onAuthError = onError('onAuthError');
		client.onAuthRefreshSuccess = updateState('onAuthRefreshSuccess');
		client.onAuthRefreshError = onError('onAuthRefreshError');
		client.onAuthLogout = updateState('onAuthLogout');
		client.onTokenExpired = refreshToken('onTokenExpired');

		client
			.init({ ...defaultInitOptions, ...initOptions })
			.catch(error => {
				onError('onInitError')(error);
				if (client.authenticated) client.logout();
			});


	}, [
		hasAuthClientChanged,
		haveInitOptionsChanged,
		client,
		initOptions,
		onError,
		refreshToken,
		updateState
	]);

	if (
		LoadingComponent
		&& (!isInitialized || isLoading)
	) {
		return LoadingComponent;
	}

	return (
		<KeycloakContext.Provider
			value={{ isInitialized, client }}
		>
			{children}
		</KeycloakContext.Provider>
	);

};

export default KeycloakProvider;