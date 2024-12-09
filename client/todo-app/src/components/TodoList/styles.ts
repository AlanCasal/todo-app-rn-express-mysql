import { StyleSheet } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LARGE_FONT_SIZE, COLORS } from '@/src/utils/sharedStyles';

export default StyleSheet.create({
	listContainer: {
		flex: 1,
		paddingHorizontal: wp(4),
	},
	noTodosContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 'auto',
		flexDirection: 'row',
	},
	noTodosText: {
		fontSize: LARGE_FONT_SIZE,
		color: COLORS.lightGray4,
	},
	listContentContainer: {
		paddingVertical: hp(1.5),
	},
});
