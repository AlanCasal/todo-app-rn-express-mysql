import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import styles from './styles';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from '@/src/api';
import CustomTextInput from '@/src/components/CustomTextInput';
import Header from '@/src/components/Header';
import TodoList from '@/src/components/TodoList';
import { ERROR_MESSAGES } from '@/src/utils';
import {
	AddTodoHandler,
	DeleteTodoHandler,
	Todo,
	UpdateTodoHandler,
} from '@/src/utils/types';

const TodosList = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleFetchTodos = useCallback(async () => {
		try {
			const todosList = await fetchTodos();

			setTodos(todosList.data);
		} catch (err) {
			let errorMessage = 'An unexpected error occurred';
			if (err instanceof AxiosError && err.response?.data.message)
				errorMessage = err.response?.data.message;

			Alert.alert('Error', errorMessage);
		}
	}, []);

	const handleUpdateTodo: UpdateTodoHandler = async (id, updates) => {
		try {
			await updateTodo(id, updates);

			const updatedTodos = todos.map(todo =>
				todo.id === id ? { ...todo, ...updates } : todo
			);

			setTodos(updatedTodos);
		} catch (err) {
			let errorMessage = ERROR_MESSAGES.UNEXPECTED_ERROR;
			if (err instanceof AxiosError && err.response?.data.message)
				errorMessage = err.response?.data.message;
			Alert.alert('Error', errorMessage);
		}
	};

	const handleAddTodo: AddTodoHandler = async inputValue => {
		try {
			const response = await addTodo(inputValue);

			const { id } = response;

			setTodos([...todos, { title: inputValue, completed: false, id }]);

			return true;
		} catch (err) {
			let errorMessage = ERROR_MESSAGES.UNEXPECTED_ERROR;
			if (err instanceof AxiosError && err.response?.data.message)
				errorMessage = err.response?.data.message;

			Alert.alert('Error', errorMessage);

			return false;
		}
	};

	const handleDeleteTodo: DeleteTodoHandler = async id => {
		try {
			await deleteTodo(id);
			const updatedTodos = todos.filter(todo => todo.id !== id);
			setTodos(updatedTodos);
		} catch (err) {
			let errorMessage = ERROR_MESSAGES.UNEXPECTED_ERROR;
			if (err instanceof AxiosError && err.response?.data.message)
				errorMessage = err.response?.data.message;
			Alert.alert('Error', errorMessage);
		}
	};

	useEffect(() => {
		handleFetchTodos();
	}, [handleFetchTodos]);

	const taskCount = todos.length;
	const completedCount = todos.filter(todo => todo.completed).length;

	return (
		<SafeAreaView style={styles.container}>
			<Header taskCount={taskCount} completedCount={completedCount} />

			<TodoList
				todos={todos}
				handleUpdateTodo={handleUpdateTodo}
				handleDeleteTodo={handleDeleteTodo}
			/>

			<CustomTextInput handleAddTodo={handleAddTodo} />
		</SafeAreaView>
	);
};

export default TodosList;
