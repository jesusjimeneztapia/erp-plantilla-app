import EyeIcon from '@icons/EyeIcon'
import EyeOffIcon from '@icons/EyeOffIcon'
import { useState } from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'

export default function Input({
	icon: Icon,
	placeholder,
	onChange,
	onBlur: onBlurClient,
	value,
	secureTextEntry,
	hint,
	error,
	success
}) {
	const [isFocused, setIsFocused] = useState(false)

	const [hideText, setHideText] = useState(!!secureTextEntry)

	const onFocus = () => setIsFocused(true)
	const onBlur = () => {
		setIsFocused(false)
		onBlurClient?.()
	}
	const toggleHideText = () => setHideText((prev) => !prev)

	return (
		<>
			<View style={styles.container}>
				<TextInput
					style={[
						styles.input,
						isFocused ? styles.inputFocused : styles.inputBlurred,
						Icon ? styles.paddingLeft : {},
						secureTextEntry ? styles.paddingRight : {},
						error ? styles.inputError : {}
					]}
					placeholder={placeholder}
					onFocus={onFocus}
					onBlur={onBlur}
					onChangeText={onChange}
					value={value}
					secureTextEntry={hideText}
				/>
				{Icon && (
					<Icon
						style={[styles.icon, styles.left]}
						size={20}
						color={isFocused ? '#465fff' : '#465fff33'}
					/>
				)}
				{secureTextEntry && (
					<>
						{hideText ? (
							<EyeOffIcon
								style={{ ...styles.icon, ...styles.right }}
								size={20}
								color={isFocused ? '#1d2939' : '#d0d5dd'}
								onPress={toggleHideText}
							/>
						) : (
							<EyeIcon
								style={{ ...styles.icon, ...styles.right }}
								size={20}
								color={isFocused ? '#1d2939' : '#d0d5dd'}
								onPress={toggleHideText}
							/>
						)}
					</>
				)}
			</View>
			{hint && <Text style={[styles.hint, error ? styles.hintError : {}]}>{hint}</Text>}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'relative'
	},
	input: {
		height: 44,
		width: '100%',
		borderRadius: 8,
		paddingLeft: 16,
		paddingRight: 16,
		paddingVertical: 10,
		fontSize: 14,
		backgroundColor: 'transparent',
		color: '#1d2939',
		borderWidth: 1,
		outlineWidth: 3,
		marginBottom: 4
	},
	inputBlurred: {
		borderColor: '#d0d5dd',
		outlineColor: 'transparent'
	},
	inputFocused: {
		borderColor: '#9cb9ff',
		outlineColor: '#465fff33'
	},
	inputError: {
		borderColor: '#f04438',
		outlineColor: 'rgba(240, 68, 56, .2)'
	},
	icon: {
		position: 'absolute',
		top: '50%',
		transform: [{ translateY: '-50%' }]
	},
	paddingLeft: {
		paddingLeft: 44
	},
	left: {
		left: 16
	},
	paddingRight: {
		paddingRight: 44
	},
	right: {
		right: 16
	},
	hint: {
		marginBottom: 4,
		fontSize: 12,
		color: '#667085'
	},
	hintError: {
		color: '#f04438'
	}
})
