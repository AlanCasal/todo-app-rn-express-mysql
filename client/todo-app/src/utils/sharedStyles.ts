import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
	maxWidthContainer: {
		maxWidth: 1000,
		width: '100%',
		alignSelf: 'center',
	},
});

export const COLORS = {
	white: '#FFFFFF',
	white2: '#F9FAFC',
	black: '#000000',
	red: '#FF0000',
	primaryBlue: '#035AC5',
	primaryGreen: '#66B53F',
	primaryBlueText: '#002859',
	lightGray: '#EFF2F7',
	lightGray2: '#EAF3FF',
	lightGray3: '#D3DCE6',
	lightGray4: '#C0CCDA',
	lightGray5: '#647184',
};

export const SHADOW_WIDTH = 0;
export const SHADOW_OPACITY = 0.06;
export const SHADOW_RADIUS = 2;
export const SHADOW_COLOR = COLORS.black;

export const INPUT_HEIGHT = 48;

export const NORMAL_FONT_SIZE = 14;
export const SMALL_FONT_SIZE = 10;
export const LARGE_FONT_SIZE = 22;
