import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	TouchableOpacity,
	KeyboardAvoidingView,
	TextInput,
	KeyboardAvoidingViewProps,
	View,
	NativeSyntheticEvent,
	TextInputContentSizeChangeEventData,
} from 'react-native';
import styles from './styles';
import { IS_IOS, MAX_TODO_LENGTH, sanitizeInput } from '@/src/utils';
import { sharedStyles, COLORS, INPUT_HEIGHT } from '@/src/utils/sharedStyles';
import { AddTodoHandler } from '@/src/utils/types';

type Props = {
	handleAddTodo: AddTodoHandler;
};

const KEYBOARD_VERTICAL_OFFSET = 10;
const MULTILINE_IOS_PADDING_VERTICAL = 15;

const CustomTextInput = ({ handleAddTodo }: Props) => {
	const [inputValue, setInputValue] = useState('');
	const [inputHeight, setInputHeight] = useState(INPUT_HEIGHT);

	let behavior: KeyboardAvoidingViewProps['behavior'] = 'height';
	let keyboardVerticalOffset = 0;

	if (IS_IOS) {
		behavior = 'padding';
		keyboardVerticalOffset = KEYBOARD_VERTICAL_OFFSET;
	}

	const handleContentSizeChange = (
		event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
	) => {
		const { height } = event.nativeEvent.contentSize;
		const newHeight = Math.max(INPUT_HEIGHT, height); // -> height < INPUT_HEIGHT ? INPUT_HEIGHT : height

		setInputHeight(newHeight);
	};

	const handleSubmit = async () => {
		const sanitizedInputValue = sanitizeInput(inputValue);
		if (!inputValue) return;

		const success = await handleAddTodo(sanitizedInputValue);
		if (success) setInputValue('');
	};

	return (
		<KeyboardAvoidingView
			style={{
				...styles.inputContainer,
				...styles.inputShadow,
				...(IS_IOS
					? { marginBottom: KEYBOARD_VERTICAL_OFFSET }
					: { paddingBottom: KEYBOARD_VERTICAL_OFFSET }),
			}}
			behavior={behavior}
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<View style={[styles.inputContent, sharedStyles.maxWidthContainer]}>
				<TextInput
					style={{
						...styles.input,
						...(!IS_IOS
							? { minHeight: inputHeight }
							: { paddingVertical: MULTILINE_IOS_PADDING_VERTICAL }),
					}}
					// eslint-disable-next-line prettier/prettier
					placeholder="Write something..."
					placeholderTextColor={COLORS.lightGray4}
					onChangeText={setInputValue}
					value={inputValue}
					autoCapitalize="none"
					autoCorrect={false}
					returnKeyType="done"
					submitBehavior="submit"
					onSubmitEditing={handleSubmit}
					multiline
					onContentSizeChange={handleContentSizeChange}
					maxLength={MAX_TODO_LENGTH}
				/>
				<TouchableOpacity
					style={{
						...styles.addTodo,
						...(!inputValue.trim().length && {
							backgroundColor: COLORS.lightGray3,
						}),
					}}
					onPress={handleSubmit}
					disabled={!inputValue.trim().length}
				>
					{/* eslint-disable-next-line prettier/prettier */}
					<Feather name="plus" size={18} color={COLORS.white} />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default CustomTextInput;
