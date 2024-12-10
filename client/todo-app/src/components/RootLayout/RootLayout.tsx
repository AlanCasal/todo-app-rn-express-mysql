/* eslint-disable indent */
/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { startSession, validateSession } from '@/src/api';
import { ERROR_MESSAGES, SESSION_TOKEN_KEY } from '@/src/utils';
import { ErrorResponseData } from '@/src/utils/types';

const RootLayout = () => {
	const [isSessionInitialized, setIsSessionInitialized] = useState(false);
	const router = useRouter();

	const handleStartSession = useCallback(async () => {
		const response = await startSession();

		await AsyncStorage.setItem(SESSION_TOKEN_KEY, response.data.token);

		setIsSessionInitialized(true);
	}, []);

	const handleValidateSession = useCallback(async () => {
		const token = await AsyncStorage.getItem(SESSION_TOKEN_KEY);

		if (!token) await handleStartSession();
		else await validateSession();

		setIsSessionInitialized(true);
	}, [handleStartSession]);

	const handleError = useCallback(
		async (err: AxiosError<ErrorResponseData>) => {
			const defaultErrorMessage = ERROR_MESSAGES.INVALID_SESSION;

			if (err.response?.status === 401) {
				const token = await AsyncStorage.getItem(SESSION_TOKEN_KEY);
				if (token) await AsyncStorage.removeItem(SESSION_TOKEN_KEY);

				handleStartSession();
				return;
			}

			const errorDetails = {
				title: `Error ${err.response?.status || ''}`.trim(),
				message: err.response?.data?.message || defaultErrorMessage,
			};

			Alert.alert(errorDetails.title, errorDetails.message);
		},
		[handleStartSession]
	);

	const initializeSession = useCallback(async () => {
		try {
			await handleValidateSession();
		} catch (err) {
			handleError(err as AxiosError<ErrorResponseData>);
		}
	}, [handleError, handleValidateSession]);

	useEffect(() => {
		initializeSession();
	}, [initializeSession]);

	useEffect(() => {
		if (isSessionInitialized) router.replace('/todos');
	}, [isSessionInitialized, router]);

	return (
		<>
			<StatusBar style="dark" translucent />
			<Slot />
		</>
	);
};

export default RootLayout;
