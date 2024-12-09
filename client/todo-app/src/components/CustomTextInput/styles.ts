import { StyleSheet } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
	COLORS,
	INPUT_HEIGHT,
	SHADOW_COLOR,
	SHADOW_OPACITY,
	SHADOW_RADIUS,
	SHADOW_WIDTH,
} from '@/src/utils/sharedStyles';

export default StyleSheet.create({
	inputContainer: {
		paddingTop: hp(1),
		backgroundColor: COLORS.white,
		paddingHorizontal: wp(4),
	},
	inputShadow: {
		shadowColor: SHADOW_COLOR,
		shadowOffset: { width: SHADOW_WIDTH, height: -2 },
		shadowOpacity: SHADOW_OPACITY,
		shadowRadius: SHADOW_RADIUS,
		elevation: 12,
	},
	inputContent: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	input: {
		flex: 1,
		width: '100%',
		borderWidth: 1,
		borderRadius: 10,
		borderColor: COLORS.lightGray3,
		marginRight: 8,
		paddingHorizontal: 20,
		textAlignVertical: 'center',
		alignContent: 'center',
		backgroundColor: COLORS.white,
	},
	addTodo: {
		borderRadius: 10,
		height: INPUT_HEIGHT,
		width: INPUT_HEIGHT,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primaryBlue,
	},
});
