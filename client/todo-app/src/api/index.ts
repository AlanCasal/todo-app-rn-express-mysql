import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL, SESSION_TOKEN_KEY } from '../utils';
import { ApiResponse, SessionToken, Todo, TodoUpdate } from '../utils/types';

const getAuthHeaders = async () => {
	const sessionToken = await AsyncStorage.getItem(SESSION_TOKEN_KEY);
	return { Authorization: sessionToken };
};

const api = {
	get: async (url: string) => {
		const headers = await getAuthHeaders();
		return axios.get(url, { headers });
	},
	post: async (url: string, data?: object) => {
		const headers = await getAuthHeaders();
		return axios.post(url, data, { headers });
	},
	put: async (url: string, data?: object) => {
		const headers = await getAuthHeaders();
		return axios.put(url, data, { headers });
	},
	delete: async (url: string) => {
		const headers = await getAuthHeaders();
		return axios.delete(url, { headers });
	},
};

export const validateSession = async () => {
	const response = await api.get(`${API_URL}/validate-session`);
	return response;
};

export const startSession = async (): Promise<ApiResponse<SessionToken>> => {
	const response = await api.post(`${API_URL}/start-session`);
	return response;
};

export const fetchTodos = async (): Promise<ApiResponse<Todo[]>> => {
	const response = await api.get(`${API_URL}/todos`);
	return response;
};

export const updateTodo = async (id: Todo['id'], updates: TodoUpdate) => {
	const response = await api.put(`${API_URL}/todos/${id}`, updates);
	return response.data;
};

export const addTodo = async (title: Todo['title']) => {
	const response = await api.post(`${API_URL}/todos`, { title });
	return response.data;
};

export const deleteTodo = async (id: Todo['id']) => {
	const response = await api.delete(`${API_URL}/todos/${id}`);
	return response.data;
};
