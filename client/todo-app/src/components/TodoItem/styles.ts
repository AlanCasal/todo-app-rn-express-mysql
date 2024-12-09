import { StyleSheet } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { COLORS, NORMAL_FONT_SIZE } from '@/src/utils/sharedStyles';

export default StyleSheet.create({
	todoContainer: {
		paddingVertical: hp(1.6),
		flexDirection: 'row',
		alignItems: 'flex-start',
		borderBottomWidth: 1,
		borderBottomColor: COLORS.lightGray2,
		justifyContent: 'space-between',
		gap: wp(2),
	},
	todoContent: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		flex: 1,
		gap: wp(2),
	},
	todo: {
		fontSize: NORMAL_FONT_SIZE,
		color: COLORS.black,
		textDecorationLine: 'none',
		fontStyle: 'normal',
		flexShrink: 1,
		overflow: 'hidden',
		width: '100%',
		flex: 1,
		paddingTop: 0,
		paddingBottom: 0,
	},
	todoAndroidFix: {
		bottom: 1,
	},
	todoCompleted: {
		textDecorationLine: 'line-through',
		color: COLORS.lightGray4,
		fontStyle: 'italic',
		fontWeight: 400,
	},
});
