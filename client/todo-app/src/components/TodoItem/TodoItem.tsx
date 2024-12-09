import { Ionicons, Feather } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	TouchableOpacity,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import styles from './styles';
import { IS_ANDROID, sanitizeInput } from '@/src/utils/index';
import { COLORS } from '@/src/utils/sharedStyles';
import { DeleteTodoHandler, Todo, UpdateTodoHandler } from '@/src/utils/types';

const DISMISS_KEYBOARD = true;

type Props = {
	handleDeleteTodo: DeleteTodoHandler;
	handleUpdateTodo: UpdateTodoHandler;
	todo: Todo;
	isLastItem: boolean;
};

const TodoItem = ({
	handleDeleteTodo,
	handleUpdateTodo,
	todo,
	isLastItem,
}: Props) => {
	const [inputValue, setInputValue] = useState(todo.title);

	const handleSubmit = useCallback(
		(dismissKeyboard: boolean = false) => {
			const sanitizedInputValue = sanitizeInput(inputValue);
			if (sanitizedInputValue === todo.title) return;

			if (dismissKeyboard) Keyboard.dismiss();

			handleUpdateTodo(todo.id, { title: sanitizedInputValue });
		},
		[inputValue, todo.id, todo.title, handleUpdateTodo]
	);

	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				handleSubmit();
			}
		);

		return () => {
			keyboardDidHideListener.remove();
		};
	}, [inputValue, handleSubmit]);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				handleSubmit(DISMISS_KEYBOARD);
			}}
		>
			<View
				style={{
					...styles.todoContainer,
					borderBottomWidth: isLastItem ? 0 : 1,
				}}
			>
				<View style={styles.todoContent}>
					<TouchableOpacity
						onPress={() =>
							handleUpdateTodo(todo.id, { completed: !todo.completed })
						}
					>
						<Feather
							name={todo.completed ? 'check-square' : 'square'}
							size={18}
							color={todo.completed ? COLORS.primaryBlue : COLORS.lightGray3}
						/>
					</TouchableOpacity>
					<TextInput
						value={inputValue}
						onChangeText={setInputValue}
						onBlur={() => handleSubmit()}
						onSubmitEditing={() => handleSubmit()}
						autoCorrect={false}
						autoCapitalize={'none'}
						multiline
						submitBehavior="blurAndSubmit"
						returnKeyType="done"
						style={{
							...styles.todo,
							...(IS_ANDROID && styles.todoAndroidFix),
							...(todo.completed && styles.todoCompleted),
						}}
					/>
				</View>
				<TouchableOpacity onPress={() => handleDeleteTodo(todo.id)}>
					<Ionicons name="trash-bin" size={18} color={COLORS.red} />
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default TodoItem;
