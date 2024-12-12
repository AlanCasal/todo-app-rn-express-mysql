import React from 'react';
import { render } from '@testing-library/react-native';
import MainLayout from '../../app/_layout';

jest.mock('@/src/components/RootLayout', () => {
	return function MockedRootLayout() {
		return null;
	};
});

describe('MainLayout', () => {
	it('renders correctly', () => {
		const result = render(<MainLayout />);

		expect(result).toBeTruthy();
	});
});
