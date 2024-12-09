import { Feather, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { IS_IOS } from '@/src/utils';
import { sharedStyles, COLORS } from '@/src/utils/sharedStyles';

type Props = {
	taskCount: number;
	completedCount: number;
};

const Header = ({ taskCount, completedCount }: Props) => {
	const areAllTasksCompleted = taskCount > 0 && taskCount === completedCount;
	const { top } = useSafeAreaInsets();

	return (
		<View
			style={{
				...styles.header,
				...styles.headerShadow,
				paddingTop: !IS_IOS ? top : 0,
				borderBottomColor: areAllTasksCompleted
					? COLORS.primaryGreen
					: COLORS.primaryBlue,
			}}
		>
			<View style={[styles.content, sharedStyles.maxWidthContainer]}>
				<View>
					<Text style={styles.title}>ToDo List</Text>
					{!!taskCount &&
						(areAllTasksCompleted ? (
							<View style={styles.tasksCompletedContainer}>
								<Text style={styles.tasksCompleted}>All tasks completed!</Text>
								<Feather
									name={'check-square'}
									size={14}
									color={COLORS.primaryGreen}
									style={{ width: 32 }}
								/>
							</View>
						) : (
							<Text style={styles.taskCount}>
								completed {completedCount} of {taskCount} tasks
							</Text>
						))}
				</View>
				<View style={styles.userContainer}>
					<FontAwesome5
						name="user-circle"
						size={24}
						color={COLORS.lightGray5}
					/>
					<Text style={styles.anonymousUser}>{'Anonymous \n User'}</Text>
				</View>
			</View>
		</View>
	);
};

export default Header;
