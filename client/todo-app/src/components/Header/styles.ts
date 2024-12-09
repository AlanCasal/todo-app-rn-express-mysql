import { StyleSheet } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IS_WEB } from '@/src/utils';
import {
	COLORS,
	NORMAL_FONT_SIZE,
	SMALL_FONT_SIZE,
	LARGE_FONT_SIZE,
	SHADOW_COLOR,
	SHADOW_OPACITY,
	SHADOW_RADIUS,
	SHADOW_WIDTH,
} from '@/src/utils/sharedStyles';

export default StyleSheet.create({
	header: {
		paddingBottom: hp(2),
		marginTop: IS_WEB ? hp(2) : 0,
		borderBottomWidth: 3,
		borderBottomColor: COLORS.primaryBlue,
	},
	headerShadow: {
		backgroundColor: COLORS.white,
		shadowColor: SHADOW_COLOR,
		shadowOffset: { width: SHADOW_WIDTH, height: 4 },
		shadowOpacity: SHADOW_OPACITY,
		shadowRadius: SHADOW_RADIUS,
		elevation: 8,
	},
	content: {
		paddingHorizontal: wp(4),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: LARGE_FONT_SIZE,
		fontWeight: 700,
		color: COLORS.primaryBlueText,
	},
	tasksCompletedContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	tasksCompleted: {
		color: COLORS.primaryGreen,
		fontSize: NORMAL_FONT_SIZE,
		fontWeight: 700,
	},
	taskCount: {
		color: COLORS.lightGray5,
		fontSize: NORMAL_FONT_SIZE,
	},
	userContainer: {
		alignItems: 'center',
		gap: 2,
	},
	anonymousUser: {
		color: COLORS.lightGray5,
		fontSize: SMALL_FONT_SIZE,
		textAlign: 'center',
	},
});
