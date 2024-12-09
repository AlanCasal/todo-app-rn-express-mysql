import { Platform } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const IS_WEB = Platform.OS === 'web';

export const API_URL = IS_ANDROID
	? 'http://10.0.2.2:8080'
	: 'http://localhost:8080';

export const ERROR_MESSAGES = {
	UNEXPECTED_ERROR: 'An unexpected error occurred.\nPlease try again later.',
	INVALID_SESSION: 'Session initialization failed.\nPlease try again later.',
};

export const MAX_TODO_LENGTH = 200;

export const sanitizeInput = (input: string): string => {
	let sanitized = input.trim();

	sanitized = sanitized
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');

	if (sanitized.length > MAX_TODO_LENGTH)
		sanitized = sanitized.substring(0, MAX_TODO_LENGTH);

	return sanitized;
};
