import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import TodoItem from '../TodoItem';
import styles from './styles';
import {
	sharedStyles,
	COLORS,
	LARGE_FONT_SIZE,
} from '@/src/utils/sharedStyles';
import { DeleteTodoHandler, Todo, UpdateTodoHandler } from '@/src/utils/types';

type Props = {
	todos: Todo[];
	handleDeleteTodo: DeleteTodoHandler;
	handleUpdateTodo: UpdateTodoHandler;
};

const TodoList = ({ todos, handleUpdateTodo, handleDeleteTodo }: Props) => {
	const renderTodoItem = ({ item, index }: { item: Todo; index: number }) => {
		const isLastItem = index === todos.length - 1;
		return (
			<TodoItem
				todo={item}
				handleUpdateTodo={handleUpdateTodo}
				handleDeleteTodo={handleDeleteTodo}
				isLastItem={isLastItem}
			/>
		);
	};

	return (
		<View style={[styles.listContainer, sharedStyles.maxWidthContainer]}>
			{!todos.length ? (
				<View style={styles.noTodosContainer}>
					<Text style={styles.noTodosText}>Start creating todos </Text>
					<FontAwesome5
						name="pen"
						size={LARGE_FONT_SIZE}
						color={COLORS.lightGray4}
					/>
				</View>
			) : (
				<FlatList
					data={todos}
					renderItem={renderTodoItem}
					keyExtractor={item => `${item.id}-${item.title}`}
					contentContainerStyle={styles.listContentContainer}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
};

export default TodoList;
